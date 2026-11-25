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

-- v4: jonli viktorina, topshiriqlar, rag'bat, darslarni ochish
alter table km.classes add column if not exists inf_open int;
alter table km.users add column if not exists bonus_xp int not null default 0;

create table if not exists km.quizzes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references km.users(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 80),
  questions jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists quizzes_owner_idx on km.quizzes(owner_id);

create table if not exists km.games (
  id uuid primary key default gen_random_uuid(),
  pin text not null,
  quiz_id uuid references km.quizzes(id) on delete set null,
  host_id uuid not null references km.users(id) on delete cascade,
  title text not null,
  questions jsonb not null,
  state text not null default 'lobby' check (state in ('lobby', 'question', 'reveal', 'end')),
  q_index int not null default -1,
  q_started_at timestamptz,
  created_at timestamptz not null default now(),
  ended_at timestamptz
);
create unique index if not exists games_pin_active on km.games(pin) where ended_at is null;

create table if not exists km.game_players (
  game_id uuid not null references km.games(id) on delete cascade,
  user_id uuid not null references km.users(id) on delete cascade,
  score int not null default 0,
  joined_at timestamptz not null default now(),
  primary key (game_id, user_id)
);

create table if not exists km.game_answers (
  game_id uuid not null references km.games(id) on delete cascade,
  user_id uuid not null references km.users(id) on delete cascade,
  q_index int not null,
  choice int not null,
  ms int not null,
  correct boolean not null,
  points int not null,
  primary key (game_id, user_id, q_index)
);

create table if not exists km.assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 120),
  body text check (body is null or length(body) < 20000),
  group_ids uuid[] not null default '{}',
  due_at timestamptz,
  max_score int not null default 5 check (max_score between 1 and 100),
  lesson_ref text,
  created_at timestamptz not null default now()
);

create table if not exists km.submissions (
  assignment_id uuid not null references km.assignments(id) on delete cascade,
  user_id uuid not null references km.users(id) on delete cascade,
  body text check (body is null or length(body) < 20000),
  link text,
  file_id uuid references km.files(id) on delete set null,
  submitted_at timestamptz not null default now(),
  score int,
  comment text,
  graded_at timestamptz,
  primary key (assignment_id, user_id)
);

create table if not exists km.awards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references km.users(id) on delete cascade,
  sticker jsonb,
  xp int not null default 0,
  note text,
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
    'photo', v.photo, 'photo_kind', v.photo_kind, 'stickers', v.stickers, 'xp', v.xp, 'bonus_xp', v.bonus_xp, 'lessons_done', v.lessons_done,
    'last_seen', v.last_seen, 'created_at', v.created_at,
    'groups', coalesce((select jsonb_agg(jsonb_build_object('id', g.id, 'name', g.name, 'grade', g.grade, 'kind', g.kind, 'courses', g.courses, 'inf_open', g.inf_open) order by g.kind, g.name)
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
                 'kind', c.kind, 'courses', c.courses, 'about', c.about, 'inf_open', c.inf_open,
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
             inf_open = case when p_data ? 'inf_open' then nullif(p_data->>'inf_open', '')::int else inf_open end,
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
  delete from km.files f where not exists (select 1 from km.materials x where x.file_id = f.id) and not exists (select 1 from km.submissions x where x.file_id = f.id);
  return km.material_json(m);
end $$;

create or replace function public.km_admin_delete_material(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.materials where id = p_id;
  delete from km.files f where not exists (select 1 from km.materials x where x.file_id = f.id) and not exists (select 1 from km.submissions x where x.file_id = f.id);
end $$;

create or replace function public.km_get_file(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); f km.files; g uuid[];
begin
  if v.role <> 'admin' then
    g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
    if not exists (select 1 from km.materials m where m.file_id = p_id and m.group_ids && g)
       and not exists (select 1 from km.submissions x where x.file_id = p_id and x.user_id = v.id) then perform km.fail('Fayl topilmadi'); end if;
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

-- ---------------------------------------------------------------------
-- v4: jonli viktorina (Kahoot uslubida), topshiriqlar, jurnal, rag'bat
-- ---------------------------------------------------------------------
-- Savol formati: {"q": "Savol", "o": ["A", "B", "C", "D"], "a": 0, "t": 20}
create or replace function km.check_quiz(p_q jsonb) returns void
language plpgsql set search_path = km, public as $$
declare e jsonb; n int;
begin
  if jsonb_typeof(p_q) <> 'array' or jsonb_array_length(p_q) not between 1 and 40 then perform km.fail('Viktorinada 1 tadan 40 tagacha savol bo''lsin'); end if;
  for e in select * from jsonb_array_elements(p_q) loop
    if length(trim(coalesce(e->>'q', ''))) not between 1 and 300 then perform km.fail('Har bir savol matni 1–300 belgi bo''lsin'); end if;
    if jsonb_typeof(e->'o') <> 'array' or jsonb_array_length(e->'o') not between 2 and 4 then perform km.fail('Har savolda 2–4 ta javob bo''lsin'); end if;
    n := jsonb_array_length(e->'o');
    if exists (select 1 from jsonb_array_elements_text(e->'o') x where length(trim(x)) not between 1 and 120) then perform km.fail('Javob variantlari bo''sh bo''lmasin (120 belgigacha)'); end if;
    if coalesce((e->>'a')::int, -1) not between 0 and n - 1 then perform km.fail('Har savolda to''g''ri javobni belgilang'); end if;
    if coalesce((e->>'t')::int, 20) not in (5, 10, 20, 30, 60, 90) then perform km.fail('Vaqt 5, 10, 20, 30, 60 yoki 90 soniya bo''lsin'); end if;
  end loop;
end $$;

create or replace function public.km_quiz_save(p_token text, p_id uuid, p_title text, p_questions jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); z km.quizzes;
begin
  if length(trim(coalesce(p_title, ''))) not between 1 and 80 then perform km.fail('Viktorina nomi 1–80 belgi bo''lsin'); end if;
  perform km.check_quiz(p_questions);
  if p_id is null then
    if (select count(*) from km.quizzes where owner_id = v.id) >= 100 then perform km.fail('Ko''pi bilan 100 ta viktorina'); end if;
    insert into km.quizzes(owner_id, title, questions) values (v.id, trim(p_title), p_questions) returning * into z;
  else
    update km.quizzes set title = trim(p_title), questions = p_questions, updated_at = now()
     where id = p_id and (owner_id = v.id or v.role = 'admin') returning * into z;
    if not found then perform km.fail('Viktorina topilmadi'); end if;
  end if;
  return jsonb_build_object('id', z.id, 'title', z.title);
end $$;

create or replace function public.km_quiz_list(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  return coalesce((select jsonb_agg(jsonb_build_object('id', z.id, 'title', z.title, 'questions', z.questions, 'mine', z.owner_id = v.id,
            'owner', u.full_name, 'updated_at', z.updated_at) order by z.updated_at desc)
     from km.quizzes z join km.users u on u.id = z.owner_id
    where z.owner_id = v.id or v.role = 'admin'), '[]');
end $$;

create or replace function public.km_quiz_delete(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  delete from km.quizzes where id = p_id and (owner_id = v.id or v.role = 'admin');
end $$;

-- O'yin boshlash: 6 xonali PIN
create or replace function public.km_game_create(p_token text, p_quiz uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); z km.quizzes; g km.games; pn text; i int := 0;
begin
  select * into z from km.quizzes where id = p_quiz and (owner_id = v.id or v.role = 'admin');
  if not found then perform km.fail('Viktorina topilmadi'); end if;
  delete from km.games where created_at < now() - interval '2 days';
  update km.games set state = 'end', ended_at = now() where host_id = v.id and ended_at is null;
  update km.games set state = 'end', ended_at = now() where ended_at is null and created_at < now() - interval '6 hours';
  loop
    pn := lpad(((get_byte(gen_random_bytes(3), 0) * 65536 + get_byte(gen_random_bytes(3), 1) * 256 + get_byte(gen_random_bytes(3), 2)) % 900000 + 100000)::text, 6, '0');
    exit when not exists (select 1 from km.games where pin = pn and ended_at is null);
    i := i + 1; if i > 50 then perform km.fail('PIN yaratib bo''lmadi, qayta urinib ko''ring'); end if;
  end loop;
  insert into km.games(pin, quiz_id, host_id, title, questions) values (pn, z.id, v.id, z.title, z.questions) returning * into g;
  return jsonb_build_object('id', g.id, 'pin', g.pin);
end $$;

create or replace function public.km_game_join(p_token text, p_pin text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g km.games;
begin
  select * into g from km.games where pin = regexp_replace(coalesce(p_pin, ''), '\D', '', 'g') and ended_at is null;
  if not found then perform km.fail('Bunday PIN bilan o''yin topilmadi. Raqamlarni tekshiring.'); end if;
  if g.host_id <> v.id then
    if g.state = 'end' then perform km.fail('O''yin tugagan'); end if;
    insert into km.game_players(game_id, user_id) values (g.id, v.id) on conflict do nothing;
  end if;
  return jsonb_build_object('id', g.id, 'title', g.title, 'host', g.host_id = v.id);
end $$;

create or replace function public.km_game_state(p_token text, p_game uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g km.games; host boolean; cq jsonb; t int; rem int; res jsonb; me km.game_players; rk int; la km.game_answers; n int;
begin
  select * into g from km.games where id = p_game;
  if not found then perform km.fail('O''yin topilmadi'); end if;
  host := g.host_id = v.id;
  if not host then
    select * into me from km.game_players where game_id = g.id and user_id = v.id;
    if not found then perform km.fail('Siz bu o''yinga ulanmagansiz'); end if;
  end if;
  n := jsonb_array_length(g.questions);
  cq := case when g.q_index >= 0 then g.questions->g.q_index end;
  t := coalesce((cq->>'t')::int, 20);
  rem := case when g.state = 'question' then greatest(0, (t * 1000 - extract(epoch from now() - g.q_started_at) * 1000)::int) end;
  res := jsonb_build_object('state', g.state, 'q_index', g.q_index, 'total', n, 'title', g.title, 'host', host,
           'players', (select count(*) from km.game_players where game_id = g.id), 'remaining_ms', rem, 'time', t);
  if host then res := res || jsonb_build_object('pin', g.pin,
       'names', coalesce((select jsonb_agg(u.full_name order by p.joined_at) from km.game_players p join km.users u on u.id = p.user_id where p.game_id = g.id), '[]'),
       'answered', (select count(*) from km.game_answers a where a.game_id = g.id and a.q_index = g.q_index)); end if;
  if g.state in ('question', 'reveal') then res := res || jsonb_build_object('question', jsonb_build_object('q', cq->'q', 'o', cq->'o', 't', t)); end if;
  if g.state in ('reveal', 'end') then
    res := res || jsonb_build_object(
      'answer', case when g.state = 'reveal' then (cq->>'a')::int end,
      'counts', case when g.state = 'reveal' then (select jsonb_agg((select count(*) from km.game_answers a where a.game_id = g.id and a.q_index = g.q_index and a.choice = i) order by i) from generate_series(0, jsonb_array_length(cq->'o') - 1) i) end,
      'top', coalesce((select jsonb_agg(jsonb_build_object('name', x.full_name, 'score', x.score) order by x.score desc, x.joined_at)
                        from (select u.full_name, p.score, p.joined_at from km.game_players p join km.users u on u.id = p.user_id where p.game_id = g.id order by p.score desc, p.joined_at limit 10) x), '[]'));
  end if;
  if not host then
    select count(*) + 1 into rk from km.game_players where game_id = g.id and (score > me.score or (score = me.score and joined_at < me.joined_at));
    select * into la from km.game_answers where game_id = g.id and user_id = v.id and q_index = g.q_index;
    res := res || jsonb_build_object('me', jsonb_build_object('score', me.score, 'rank', rk, 'answered', la.choice is not null,
             'choice', case when g.state <> 'question' then la.choice end, 'correct', case when g.state <> 'question' then la.correct end,
             'points', case when g.state <> 'question' then la.points end));
  end if;
  return res;
end $$;

create or replace function public.km_game_answer(p_token text, p_game uuid, p_q int, p_choice int) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g km.games; cq jsonb; t int; ms int; ok boolean; pts int;
begin
  select * into g from km.games where id = p_game;
  if not found then perform km.fail('O''yin topilmadi'); end if;
  if not exists (select 1 from km.game_players where game_id = g.id and user_id = v.id) then perform km.fail('Siz bu o''yinga ulanmagansiz'); end if;
  if g.state <> 'question' or g.q_index <> p_q then perform km.fail('Bu savolga javob vaqti tugagan'); end if;
  cq := g.questions->g.q_index; t := coalesce((cq->>'t')::int, 20);
  ms := (extract(epoch from now() - g.q_started_at) * 1000)::int;
  if ms > t * 1000 + 1500 then perform km.fail('Vaqt tugadi'); end if;
  if p_choice not between 0 and jsonb_array_length(cq->'o') - 1 then perform km.fail('Noto''g''ri javob varianti'); end if;
  ok := p_choice = (cq->>'a')::int;
  pts := case when ok then greatest(500, round(1000 * (1 - least(ms, t * 1000)::numeric / (t * 1000) / 2)))::int else 0 end;
  insert into km.game_answers(game_id, user_id, q_index, choice, ms, correct, points) values (g.id, v.id, g.q_index, p_choice, ms, ok, pts)
  on conflict do nothing;
  if found then update km.game_players set score = score + pts where game_id = g.id and user_id = v.id; end if;
  return jsonb_build_object('accepted', true);
end $$;

-- Boshlovchi: keyingi bosqich (lobby → savol → natija → keyingi savol → ... → yakun)
create or replace function public.km_game_next(p_token text, p_game uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g km.games;
begin
  select * into g from km.games where id = p_game and host_id = v.id for update;
  if not found then perform km.fail('Faqat o''yinni boshlagan odam boshqara oladi'); end if;
  if g.state = 'lobby' or (g.state = 'reveal' and g.q_index + 1 < jsonb_array_length(g.questions)) then
    update km.games set state = 'question', q_index = q_index + 1, q_started_at = now() where id = g.id;
  elsif g.state = 'question' then
    update km.games set state = 'reveal' where id = g.id;
  elsif g.state = 'reveal' then
    update km.games set state = 'end', ended_at = now() where id = g.id;
  end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.km_game_end(p_token text, p_game uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token);
begin
  update km.games set state = 'end', ended_at = coalesce(ended_at, now()) where id = p_game and (host_id = v.id or v.role = 'admin');
end $$;

-- ---------- Topshiriqlar ----------
create or replace function km.group_students(p_groups uuid[]) returns setof km.users
language sql stable set search_path = km, public as $$
  select distinct u.* from km.users u
   where u.role = 'student' and (u.class_id = any(p_groups) or exists (select 1 from km.members m where m.user_id = u.id and m.group_id = any(p_groups)))
$$;

create or replace function km.sub_json(s km.submissions) returns jsonb
language sql stable set search_path = km, public as $$
  select case when s.assignment_id is null then null else jsonb_build_object('body', s.body, 'link', s.link, 'submitted_at', s.submitted_at, 'score', s.score, 'comment', s.comment, 'graded_at', s.graded_at,
    'file', (select jsonb_build_object('id', f.id, 'name', f.name, 'mime', f.mime, 'size', length(f.data) * 3 / 4) from km.files f where f.id = s.file_id)) end
$$;

create or replace function public.km_assignments(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g uuid[];
begin
  if v.role = 'admin' then
    return coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'body', a.body, 'group_ids', to_jsonb(a.group_ids), 'due_at', a.due_at, 'max_score', a.max_score, 'lesson_ref', a.lesson_ref, 'created_at', a.created_at,
             'total', (select count(*) from km.group_students(a.group_ids)),
             'submitted', (select count(*) from km.submissions s where s.assignment_id = a.id),
             'graded', (select count(*) from km.submissions s where s.assignment_id = a.id and s.score is not null)) order by a.created_at desc) from km.assignments a), '[]');
  end if;
  g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
  return coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'body', a.body, 'group_ids', to_jsonb(a.group_ids), 'due_at', a.due_at, 'max_score', a.max_score, 'lesson_ref', a.lesson_ref, 'created_at', a.created_at,
           'sub', (select km.sub_json(s) from km.submissions s where s.assignment_id = a.id and s.user_id = v.id)) order by a.created_at desc)
     from km.assignments a where a.group_ids && g), '[]');
end $$;

create or replace function public.km_admin_save_assignment(p_token text, p_id uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); a km.assignments; gids uuid[];
begin
  select coalesce(array_agg(x::uuid), '{}') into gids from jsonb_array_elements_text(coalesce(p_data->'group_ids', '[]')) x;
  begin
    if p_id is null then
      insert into km.assignments(title, body, group_ids, due_at, max_score, lesson_ref)
      values (trim(p_data->>'title'), nullif(p_data->>'body', ''), gids, nullif(p_data->>'due_at', '')::timestamptz, coalesce((p_data->>'max_score')::int, 5), nullif(p_data->>'lesson_ref', ''))
      returning * into a;
    else
      update km.assignments set title = trim(p_data->>'title'), body = nullif(p_data->>'body', ''), group_ids = gids, due_at = nullif(p_data->>'due_at', '')::timestamptz,
             max_score = coalesce((p_data->>'max_score')::int, 5), lesson_ref = nullif(p_data->>'lesson_ref', '')
       where id = p_id returning * into a;
      if not found then perform km.fail('Topshiriq topilmadi'); end if;
    end if;
  exception when check_violation or not_null_violation then perform km.fail('Sarlavha 1–120 belgi, maksimal ball 1–100 bo''lsin');
  end;
  return to_jsonb(a);
end $$;

create or replace function public.km_admin_delete_assignment(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.assignments where id = p_id;
  delete from km.files f where not exists (select 1 from km.materials x where x.file_id = f.id) and not exists (select 1 from km.submissions x where x.file_id = f.id);
end $$;

-- O'quvchi topshiradi: {body, link, file?: {name, mime, data}}
create or replace function public.km_submit(p_token text, p_assignment uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); a km.assignments; s km.submissions; fid uuid; g uuid[];
begin
  g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
  select * into a from km.assignments where id = p_assignment and group_ids && g;
  if not found then perform km.fail('Topshiriq topilmadi'); end if;
  select * into s from km.submissions where assignment_id = a.id and user_id = v.id;
  if found and s.score is not null then perform km.fail('Baholangan topshiriqni o''zgartirib bo''lmaydi'); end if;
  if coalesce(trim(p_data->>'body'), '') = '' and coalesce(trim(p_data->>'link'), '') = '' and jsonb_typeof(p_data->'file') is distinct from 'object' and (s.file_id is null) then
    perform km.fail('Javob yozing, havola qo''ying yoki fayl biriktiring');
  end if;
  if coalesce(p_data->>'link', '') <> '' and p_data->>'link' !~* '^https?://' then perform km.fail('Havola http:// yoki https:// bilan boshlansin'); end if;
  if jsonb_typeof(p_data->'file') = 'object' then
    insert into km.files(name, mime, data) values (left(p_data->'file'->>'name', 200), left(p_data->'file'->>'mime', 100), p_data->'file'->>'data') returning id into fid;
  end if;
  insert into km.submissions(assignment_id, user_id, body, link, file_id, submitted_at)
  values (a.id, v.id, nullif(p_data->>'body', ''), nullif(trim(coalesce(p_data->>'link', '')), ''), fid, now())
  on conflict (assignment_id, user_id) do update set body = excluded.body, link = excluded.link, file_id = coalesce(excluded.file_id, km.submissions.file_id), submitted_at = now()
  returning * into s;
  delete from km.files f where not exists (select 1 from km.materials x where x.file_id = f.id) and not exists (select 1 from km.submissions x where x.file_id = f.id);
  return km.sub_json(s);
exception when check_violation then perform km.fail('Javob juda uzun yoki fayl 4 MB dan katta'); return null;
end $$;

create or replace function public.km_admin_submissions(p_token text, p_assignment uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); a km.assignments;
begin
  select * into a from km.assignments where id = p_assignment;
  if not found then perform km.fail('Topshiriq topilmadi'); end if;
  return jsonb_build_object('assignment', to_jsonb(a), 'rows', coalesce((select jsonb_agg(jsonb_build_object('user', km.user_json(u), 'sub', (select km.sub_json(s) from km.submissions s where s.assignment_id = a.id and s.user_id = u.id)) order by u.full_name)
     from km.group_students(a.group_ids) u), '[]'));
end $$;

create or replace function public.km_admin_grade(p_token text, p_assignment uuid, p_user uuid, p_score int, p_comment text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); a km.assignments; s km.submissions;
begin
  select * into a from km.assignments where id = p_assignment;
  if not found then perform km.fail('Topshiriq topilmadi'); end if;
  if p_score is not null and p_score not between 0 and a.max_score then perform km.fail('Ball 0 dan ' || a.max_score || ' gacha bo''lsin'); end if;
  insert into km.submissions(assignment_id, user_id, score, comment, graded_at) values (a.id, p_user, p_score, nullif(p_comment, ''), case when p_score is null then null else now() end)
  on conflict (assignment_id, user_id) do update set score = excluded.score, comment = excluded.comment, graded_at = excluded.graded_at
  returning * into s;
  return km.sub_json(s);
end $$;

-- Jurnal: sinf/to'garak o'quvchilari × topshiriqlar
create or replace function public.km_admin_gradebook(p_token text, p_group uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  return jsonb_build_object(
    'students', coalesce((select jsonb_agg(jsonb_build_object('id', u.id, 'full_name', u.full_name, 'login', u.login, 'xp', u.xp + u.bonus_xp, 'lessons_done', u.lessons_done, 'last_seen', u.last_seen) order by u.full_name) from km.group_students(array[p_group]) u), '[]'),
    'assignments', coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'max_score', a.max_score, 'due_at', a.due_at) order by a.created_at) from km.assignments a where p_group = any(a.group_ids)), '[]'),
    'scores', coalesce((select jsonb_agg(jsonb_build_object('a', s.assignment_id, 'u', s.user_id, 'score', s.score, 'submitted_at', s.submitted_at)) from km.submissions s join km.assignments a on a.id = s.assignment_id where p_group = any(a.group_ids)), '[]'));
end $$;

-- Rag'bat: stiker va/yoki XP
create or replace function public.km_admin_award(p_token text, p_user uuid, p_sticker jsonb, p_xp int, p_note text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); u km.users;
begin
  if coalesce(p_xp, 0) not between 0 and 500 then perform km.fail('XP 0 dan 500 gacha bo''lsin'); end if;
  select * into u from km.users where id = p_user and role = 'student';
  if not found then perform km.fail('O''quvchi topilmadi'); end if;
  if jsonb_typeof(p_sticker) = 'object' then
    u.stickers := case when jsonb_array_length(u.stickers) >= 30 then u.stickers - 0 else u.stickers end || jsonb_build_array(p_sticker);
  end if;
  update km.users set stickers = u.stickers, bonus_xp = bonus_xp + coalesce(p_xp, 0) where id = u.id returning * into u;
  insert into km.awards(user_id, sticker, xp, note) values (u.id, case when jsonb_typeof(p_sticker) = 'object' then p_sticker end, coalesce(p_xp, 0), nullif(p_note, ''));
  return km.user_json(u);
end $$;

-- Faqat km_* funksiyalari tashqaridan chaqiriladi; ichki km.* funksiyalar yopiq
revoke all on all functions in schema km from public;

-- Sayt (anon/publishable kalit) faqat public.km_* funksiyalarini chaqira olsin.
-- Yangi Supabase loyihalarida bu ruxsat avtomatik berilmasligi mumkin, shuning uchun aniq beramiz.
do $$
declare f record; r text;
begin
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      execute format('grant usage on schema public to %I', r);
      for f in select p.oid::regprocedure as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace
               where n.nspname = 'public' and p.proname like 'km\_%' loop
        execute format('grant execute on function %s to %I', f.sig, r);
      end loop;
    end if;
  end loop;
end $$;

-- API (PostgREST) yangi funksiyalarni darhol ko'rsin
notify pgrst, 'reload schema';
