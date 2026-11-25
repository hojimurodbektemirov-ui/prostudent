-- =====================================================================
-- Kod Maktab: backend (Supabase / PostgreSQL)
-- Supabase → SQL Editor → shu faylni to'liq joylashtiring → Run.
-- Qayta ishga tushirish xavfsiz: mavjud ma'lumotlar o'chmaydi.
--
-- Tuzilma:
--   km.*        jadvallar. Tashqaridan ko'rinmaydi (API faqat funksiyalarni ko'radi).
--   public.km_* sayt chaqiradigan funksiyalar. Har biri token va rolni tekshiradi.
-- Parollar bcrypt bilan shifrlanadi. Ochiq holda hech qayerda saqlanmaydi.
-- =====================================================================

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
create schema if not exists km;
revoke all on schema km from public;

create table if not exists km.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) between 1 and 40),
  grade int not null check (grade between 1 and 11),
  created_at timestamptz not null default now()
);

create table if not exists km.users (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('admin', 'student')),
  login text not null unique check (login ~ '^[a-z0-9._-]{3,40}$'),
  pass_hash text not null,
  full_name text not null check (length(trim(full_name)) between 1 and 80),
  class_id uuid references km.classes(id) on delete set null,
  photo text check (photo is null or length(photo) < 400000),
  stickers jsonb not null default '[]',
  progress jsonb not null default '{}',
  xp int not null default 0,
  lessons_done int not null default 0,
  created_at timestamptz not null default now(),
  last_seen timestamptz
);
create index if not exists users_class_idx on km.users(class_id);

create table if not exists km.sessions (
  token text primary key,
  user_id uuid not null references km.users(id) on delete cascade,
  expires_at timestamptz not null
);
create index if not exists sessions_user_idx on km.sessions(user_id);

create table if not exists km.attempts (
  login text not null,
  at timestamptz not null default now()
);
create index if not exists attempts_idx on km.attempts(login, at);

-- v3: to'garaklar, kurslar, materiallar, emoji-avatar (eski bazaga ham xavfsiz qo'shiladi)
alter table km.classes add column if not exists kind text not null default 'sinf';
alter table km.classes add column if not exists courses text[] not null default '{informatika}';
alter table km.classes add column if not exists about text;
do $$ begin
  alter table km.classes add constraint classes_kind_chk check (kind in ('sinf', 'togarak'));
exception when duplicate_object then null; end $$;
alter table km.users add column if not exists photo_kind text;

create table if not exists km.members (
  group_id uuid not null references km.classes(id) on delete cascade,
  user_id uuid not null references km.users(id) on delete cascade,
  primary key (group_id, user_id)
);
create index if not exists members_user_idx on km.members(user_id);

create table if not exists km.files (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mime text not null,
  data text not null check (length(data) < 6000000),
  created_at timestamptz not null default now()
);

create table if not exists km.materials (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 120),
  kind text not null check (kind in ('link', 'video', 'text', 'file')),
  url text,
  body text check (body is null or length(body) < 20000),
  file_id uuid references km.files(id) on delete set null,
  group_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Ichki yordamchilar (tashqaridan chaqirib bo'lmaydi)
-- ---------------------------------------------------------------------
create or replace function km.fail(msg text) returns void
language plpgsql as $$
begin
  raise exception using message = msg, errcode = 'P0001';
end $$;

create or replace function km.auth(p_token text, p_role text default null) returns km.users
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users;
begin
  select u.* into v from km.sessions s join km.users u on u.id = s.user_id
   where s.token = p_token and s.expires_at > now();
  if not found then perform km.fail('SESSION'); end if;
  if p_role is not null and v.role <> p_role then perform km.fail('Bu amal uchun ruxsat yo''q'); end if;
  return v;
end $$;

create or replace function km.user_json(v km.users) returns jsonb
language sql stable set search_path = km, public as $$
  select jsonb_build_object(
    'id', v.id, 'role', v.role, 'login', v.login, 'full_name', v.full_name,
    'class_id', v.class_id,
    'class_name', (select c.name from km.classes c where c.id = v.class_id),
    'grade', (select c.grade from km.classes c where c.id = v.class_id),
    'photo', v.photo, 'photo_kind', v.photo_kind, 'stickers', v.stickers, 'xp', v.xp, 'lessons_done', v.lessons_done,
    'last_seen', v.last_seen, 'created_at', v.created_at,
    'groups', coalesce((select jsonb_agg(jsonb_build_object('id', g.id, 'name', g.name, 'grade', g.grade, 'kind', g.kind, 'courses', g.courses) order by g.kind, g.name)
                        from km.classes g where g.id = v.class_id or g.id in (select m.group_id from km.members m where m.user_id = v.id)), '[]'))
$$;

-- Bolalar oson eslab qoladigan parol: "kitob-4821"
create or replace function km.gen_password() returns text
language plpgsql volatile set search_path = km, extensions, public as $$
declare
  w text[] := array['olma','anor','nok','gilos','uzum','behi','kitob','qalam','daftar','robot',
                    'yulduz','quyosh','bulut','daryo','lola','burgut','lochin','sher','kema','raketa',
                    'sayyora','kompas','globus','piksel','ekran','kod','tulpor','chinor','bodom','yong''oq'];
  b bytea := gen_random_bytes(4);
begin
  return replace(w[1 + get_byte(b, 0) % array_length(w, 1)], '''', '') || '-' ||
         lpad(((get_byte(b, 1) * 65536 + get_byte(b, 2) * 256 + get_byte(b, 3)) % 10000)::text, 4, '0');
end $$;

create or replace function km.unique_login(base text) returns text
language plpgsql set search_path = km, public as $$
declare b text := left(regexp_replace(lower(coalesce(base, '')), '[^a-z0-9._-]', '', 'g'), 34); c text; n int := 1;
begin
  if length(b) < 3 then b := 'oquvchi'; end if;
  c := b;
  while exists (select 1 from km.users where login = c) loop n := n + 1; c := b || n; end loop;
  return c;
end $$;

create or replace function km.new_session(p_user uuid) returns text
language plpgsql set search_path = km, extensions, public as $$
declare t text := encode(gen_random_bytes(24), 'hex');
begin
  delete from km.sessions where expires_at < now();
  insert into km.sessions(token, user_id, expires_at) values (t, p_user, now() + interval '30 days');
  update km.users set last_seen = now() where id = p_user;
  return t;
end $$;

-- ---------------------------------------------------------------------
-- Ochiq funksiyalar: kirish
-- ---------------------------------------------------------------------
create or replace function public.km_setup_status() returns jsonb
language sql security definer set search_path = km, public as $$
  select jsonb_build_object('has_admin', exists (select 1 from km.users where role = 'admin'));
$$;

create or replace function public.km_setup_admin(p_login text, p_password text, p_name text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users;
begin
  if exists (select 1 from km.users where role = 'admin') then perform km.fail('Admin allaqachon yaratilgan'); end if;
  if length(coalesce(p_password, '')) < 8 then perform km.fail('Admin paroli kamida 8 belgi bo''lsin'); end if;
  if lower(trim(p_login)) !~ '^[a-z0-9._-]{3,40}$' then perform km.fail('Login: kamida 3 ta lotin harf yoki raqam'); end if;
  insert into km.users(role, login, pass_hash, full_name)
  values ('admin', lower(trim(p_login)), crypt(p_password, gen_salt('bf', 8)), coalesce(nullif(trim(p_name), ''), 'Admin'))
  returning * into v;
  return jsonb_build_object('token', km.new_session(v.id), 'user', km.user_json(v));
end $$;

-- Xato bo'lsa exception emas, {error} qaytaradi: shunda urinishlar soni saqlanib qoladi
create or replace function public.km_login(p_login text, p_password text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users; l text := lower(trim(coalesce(p_login, '')));
begin
  if (select count(*) from km.attempts where login = l and at > now() - interval '10 minutes') >= 10 then
    return jsonb_build_object('error', 'Juda ko''p noto''g''ri urinish. 10 daqiqadan keyin qayta urinib ko''ring.');
  end if;
  select * into v from km.users where login = l;
  if not found or v.pass_hash <> crypt(coalesce(p_password, ''), v.pass_hash) then
    insert into km.attempts(login) values (l);
    delete from km.attempts where at < now() - interval '1 day';
    return jsonb_build_object('error', 'Login yoki parol noto''g''ri');
  end if;
  delete from km.attempts where login = l;
  return jsonb_build_object('token', km.new_session(v.id), 'user', km.user_json(v), 'progress', v.progress);
end $$;

create or replace function public.km_logout(p_token text) returns void
language sql security definer set search_path = km, public as $$
  delete from km.sessions where token = p_token;
$$;

create or replace function public.km_me(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  update km.users set last_seen = now() where id = v.id;
  return jsonb_build_object('user', km.user_json(v), 'progress', v.progress);
end $$;

create or replace function public.km_save_progress(p_token text, p_progress jsonb, p_xp int, p_done int) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  if jsonb_typeof(p_progress) <> 'object' or octet_length(p_progress::text) > 2000000 then perform km.fail('Progress hajmi juda katta'); end if;
  update km.users set progress = p_progress, xp = greatest(0, coalesce(p_xp, 0)), lessons_done = greatest(0, coalesce(p_done, 0)), last_seen = now()
   where id = v.id;
end $$;

create or replace function public.km_set_my_stickers(p_token text, p_stickers jsonb) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  if jsonb_typeof(p_stickers) <> 'array' or jsonb_array_length(p_stickers) > 30 then perform km.fail('Stikerlar ko''pi bilan 30 ta'); end if;
  update km.users set stickers = p_stickers where id = v.id;
end $$;

create or replace function public.km_change_password(p_token text, p_old text, p_new text) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  if v.pass_hash <> crypt(coalesce(p_old, ''), v.pass_hash) then perform km.fail('Eski parol noto''g''ri'); end if;
  if length(coalesce(p_new, '')) < 6 then perform km.fail('Yangi parol kamida 6 belgi bo''lsin'); end if;
  update km.users set pass_hash = crypt(p_new, gen_salt('bf', 8)) where id = v.id;
  delete from km.sessions where user_id = v.id and token <> p_token;
end $$;

-- ---------------------------------------------------------------------
-- Admin funksiyalari
-- ---------------------------------------------------------------------
create or replace function public.km_admin_overview(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  return jsonb_build_object(
    'classes', coalesce((select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'grade', c.grade,
                 'kind', c.kind, 'courses', c.courses, 'about', c.about,
                 'count', case when c.kind = 'sinf' then (select count(*) from km.users u where u.class_id = c.id and u.role = 'student')
                               else (select count(*) from km.members m where m.group_id = c.id) end,
                 'member_ids', case when c.kind = 'togarak' then coalesce((select jsonb_agg(m.user_id) from km.members m where m.group_id = c.id), '[]') else '[]' end)
                 order by c.kind, c.grade, c.name) from km.classes c), '[]'),
    'students', coalesce((select jsonb_agg(km.user_json(u) order by u.full_name) from km.users u where u.role = 'student'), '[]'));
end $$;

create or replace function public.km_admin_save_class(p_token text, p_id uuid, p_name text, p_grade int) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); c km.classes;
begin
  begin
    if p_id is null then
      insert into km.classes(name, grade) values (trim(p_name), p_grade) returning * into c;
    else
      update km.classes set name = trim(p_name), grade = p_grade where id = p_id returning * into c;
      if not found then perform km.fail('Sinf topilmadi'); end if;
    end if;
  exception
    when unique_violation then perform km.fail('"' || trim(p_name) || '" nomli sinf allaqachon bor');
    when check_violation then perform km.fail('Sinf nomi 1–40 belgi, daraja 1–11 bo''lsin');
  end;
  return to_jsonb(c);
end $$;

create or replace function public.km_admin_delete_class(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.classes where id = p_id;
end $$;

-- p_items: [{full_name, login_base, class_id, photo, stickers}, ...]  →  [{user, password}, ...]
create or replace function public.km_admin_create_students(p_token text, p_items jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); it jsonb; s km.users; pw text; res jsonb := '[]';
begin
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then perform km.fail('O''quvchilar ro''yxati bo''sh'); end if;
  if jsonb_array_length(p_items) > 60 then perform km.fail('Bir martada ko''pi bilan 60 ta o''quvchi'); end if;
  for it in select * from jsonb_array_elements(p_items) loop
    if length(trim(coalesce(it->>'full_name', ''))) = 0 then continue; end if;
    pw := km.gen_password();
    insert into km.users(role, login, pass_hash, full_name, class_id, photo, photo_kind, stickers)
    values ('student', km.unique_login(coalesce(it->>'login_base', it->>'full_name')), crypt(pw, gen_salt('bf', 8)),
            left(trim(it->>'full_name'), 80), nullif(it->>'class_id', '')::uuid, nullif(it->>'photo', ''),
            case when nullif(it->>'photo', '') is null then null else coalesce(it->>'photo_kind', 'photo') end,
            coalesce(it->'stickers', '[]'))
    returning * into s;
    res := res || jsonb_build_array(jsonb_build_object('user', km.user_json(s), 'password', pw));
  end loop;
  return res;
end $$;

-- p_data faqat o'zgaradigan maydonlar: {full_name?, class_id?, photo?, stickers?, login?}
create or replace function public.km_admin_update_student(p_token text, p_id uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); s km.users; l text;
begin
  select * into s from km.users where id = p_id and role = 'student';
  if not found then perform km.fail('O''quvchi topilmadi'); end if;
  if p_data ? 'login' then
    l := lower(trim(p_data->>'login'));
    if l !~ '^[a-z0-9._-]{3,40}$' then perform km.fail('Login: 3–40 ta lotin harf, raqam, nuqta yoki chiziqcha'); end if;
    if exists (select 1 from km.users where login = l and id <> p_id) then perform km.fail('Bu login band'); end if;
    s.login := l;
  end if;
  if p_data ? 'full_name' then s.full_name := left(trim(p_data->>'full_name'), 80); end if;
  if p_data ? 'class_id' then s.class_id := nullif(p_data->>'class_id', '')::uuid; end if;
  if p_data ? 'photo' then s.photo := nullif(p_data->>'photo', ''); s.photo_kind := case when s.photo is null then null else coalesce(p_data->>'photo_kind', 'photo') end; end if;
  if p_data ? 'stickers' then
    if jsonb_typeof(p_data->'stickers') <> 'array' or jsonb_array_length(p_data->'stickers') > 30 then perform km.fail('Stikerlar ko''pi bilan 30 ta'); end if;
    s.stickers := p_data->'stickers';
  end if;
  update km.users set login = s.login, full_name = s.full_name, class_id = s.class_id, photo = s.photo, photo_kind = s.photo_kind, stickers = s.stickers
   where id = p_id returning * into s;
  return km.user_json(s);
end $$;

-- Parollarni yangilaydi va yangi parollarni bir marta qaytaradi
create or replace function public.km_admin_reset_passwords(p_token text, p_ids uuid[]) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); s km.users; pw text; res jsonb := '[]';
begin
  for s in select * from km.users where id = any(p_ids) and role = 'student' order by full_name loop
    pw := km.gen_password();
    update km.users set pass_hash = crypt(pw, gen_salt('bf', 8)) where id = s.id;
    delete from km.sessions where user_id = s.id;
    res := res || jsonb_build_array(jsonb_build_object('user', km.user_json(s), 'password', pw));
  end loop;
  return res;
end $$;

create or replace function public.km_admin_delete_student(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.users where id = p_id and role = 'student';
end $$;

create or replace function public.km_admin_student(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); s km.users;
begin
  select * into s from km.users where id = p_id and role = 'student';
  if not found then perform km.fail('O''quvchi topilmadi'); end if;
  return jsonb_build_object('user', km.user_json(s), 'progress', s.progress);
end $$;

-- ---------------------------------------------------------------------
-- v3: guruhlar (sinf / to'garak), a'zolik, materiallar, fayllar, emoji-avatar
-- ---------------------------------------------------------------------
-- p_data: {name, grade, kind: 'sinf'|'togarak', courses: ['informatika','dasturlash'], about}
create or replace function public.km_admin_save_group(p_token text, p_id uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); c km.classes; cr text[];
begin
  select coalesce(array_agg(x), '{}') into cr from jsonb_array_elements_text(coalesce(p_data->'courses', '[]')) x where x in ('informatika', 'dasturlash');
  begin
    if p_id is null then
      insert into km.classes(name, grade, kind, courses, about)
      values (trim(p_data->>'name'), (p_data->>'grade')::int, coalesce(p_data->>'kind', 'sinf'), cr, nullif(trim(coalesce(p_data->>'about', '')), ''))
      returning * into c;
    else
      update km.classes set name = trim(p_data->>'name'), grade = (p_data->>'grade')::int, courses = cr,
             about = nullif(trim(coalesce(p_data->>'about', '')), '')
       where id = p_id returning * into c;
      if not found then perform km.fail('Guruh topilmadi'); end if;
    end if;
  exception
    when unique_violation then perform km.fail('"' || trim(p_data->>'name') || '" nomi band');
    when check_violation or not_null_violation or invalid_text_representation then perform km.fail('Nomi 1–40 belgi, daraja 1–11 bo''lsin');
  end;
  return to_jsonb(c);
end $$;

create or replace function public.km_admin_set_members(p_token text, p_group uuid, p_add uuid[], p_remove uuid[]) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  if not exists (select 1 from km.classes where id = p_group and kind = 'togarak') then perform km.fail('To''garak topilmadi'); end if;
  insert into km.members(group_id, user_id)
  select p_group, u.id from km.users u where u.id = any(coalesce(p_add, '{}')) and u.role = 'student'
  on conflict do nothing;
  delete from km.members where group_id = p_group and user_id = any(coalesce(p_remove, '{}'));
end $$;

create or replace function public.km_admin_move_students(p_token text, p_ids uuid[], p_class uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  if p_class is not null and not exists (select 1 from km.classes where id = p_class and kind = 'sinf') then perform km.fail('Sinf topilmadi'); end if;
  update km.users set class_id = p_class where id = any(p_ids) and role = 'student';
end $$;

create or replace function km.material_json(m km.materials) returns jsonb
language sql stable set search_path = km, public as $$
  select jsonb_build_object('id', m.id, 'title', m.title, 'kind', m.kind, 'url', m.url, 'body', m.body,
    'group_ids', to_jsonb(m.group_ids), 'created_at', m.created_at,
    'file', (select jsonb_build_object('id', f.id, 'name', f.name, 'mime', f.mime, 'size', length(f.data) * 3 / 4) from km.files f where f.id = m.file_id))
$$;

-- O'quvchi: o'z sinfi va to'garaklari materiallari. Admin: hammasi.
create or replace function public.km_materials(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g uuid[];
begin
  if v.role = 'admin' then
    return coalesce((select jsonb_agg(km.material_json(m) order by m.created_at desc) from km.materials m), '[]');
  end if;
  g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
  return coalesce((select jsonb_agg(km.material_json(m) order by m.created_at desc) from km.materials m where m.group_ids && g), '[]');
end $$;

-- p_data: {title, kind, url, body, group_ids: [...], file?: {name, mime, data}}
create or replace function public.km_admin_save_material(p_token text, p_id uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); m km.materials; k text := p_data->>'kind'; fid uuid; gids uuid[];
begin
  if k not in ('link', 'video', 'text', 'file') then perform km.fail('Material turi noto''g''ri'); end if;
  if k in ('link', 'video') and coalesce(p_data->>'url', '') !~* '^https?://' then perform km.fail('Havola http:// yoki https:// bilan boshlansin'); end if;
  select coalesce(array_agg(x::uuid), '{}') into gids from jsonb_array_elements_text(coalesce(p_data->'group_ids', '[]')) x;
  if p_data ? 'file' and jsonb_typeof(p_data->'file') = 'object' then
    insert into km.files(name, mime, data) values (left(p_data->'file'->>'name', 200), left(p_data->'file'->>'mime', 100), p_data->'file'->>'data') returning id into fid;
  end if;
  begin
    if p_id is null then
      if k = 'file' and fid is null then perform km.fail('Fayl tanlanmagan'); end if;
      insert into km.materials(title, kind, url, body, file_id, group_ids)
      values (trim(p_data->>'title'), k, nullif(trim(coalesce(p_data->>'url', '')), ''), nullif(p_data->>'body', ''), fid, gids) returning * into m;
    else
      update km.materials set title = trim(p_data->>'title'), kind = k, url = nullif(trim(coalesce(p_data->>'url', '')), ''),
             body = nullif(p_data->>'body', ''), file_id = coalesce(fid, file_id), group_ids = gids
       where id = p_id returning * into m;
      if not found then perform km.fail('Material topilmadi'); end if;
    end if;
  exception when check_violation then perform km.fail('Sarlavha 1–120 belgi, matn 20 000 belgidan oshmasin, fayl 4 MB dan kichik bo''lsin');
  end;
  delete from km.files f where not exists (select 1 from km.materials x where x.file_id = f.id);
  return km.material_json(m);
end $$;

create or replace function public.km_admin_delete_material(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.materials where id = p_id;
  delete from km.files f where not exists (select 1 from km.materials x where x.file_id = f.id);
end $$;

create or replace function public.km_get_file(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); f km.files; g uuid[];
begin
  if v.role <> 'admin' then
    g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
    if not exists (select 1 from km.materials m where m.file_id = p_id and m.group_ids && g) then perform km.fail('Fayl topilmadi'); end if;
  end if;
  select * into f from km.files where id = p_id;
  if not found then perform km.fail('Fayl topilmadi'); end if;
  return jsonb_build_object('name', f.name, 'mime', f.mime, 'data', f.data);
end $$;

-- O'quvchi emoji-avatar tanlaydi (admin haqiqiy rasm qo'ygan bo'lsa, o'zgartira olmaydi)
create or replace function public.km_set_my_avatar(p_token text, p_photo text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  if v.photo_kind = 'photo' then perform km.fail('Rasmingizni faqat o''qituvchi o''zgartira oladi'); end if;
  if p_photo is not null and (p_photo !~ '^data:image/(jpeg|png);base64,' or length(p_photo) > 200000) then perform km.fail('Avatar noto''g''ri'); end if;
  update km.users set photo = p_photo, photo_kind = case when p_photo is null then null else 'emoji' end where id = v.id returning * into v;
  return km.user_json(v);
end $$;

-- Faqat km_* funksiyalari tashqaridan chaqiriladi; ichki km.* funksiyalar yopiq
revoke all on all functions in schema km from public;
