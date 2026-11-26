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

-- v5: o'qituvchilar, fayllar Storage'da, davomat, Telegram, ota-ona, sertifikatlar
alter table km.users drop constraint if exists users_role_check;
do $$ begin
  alter table km.users add constraint users_role_check check (role in ('admin', 'teacher', 'student'));
exception when duplicate_object then null; end $$;
alter table km.users add column if not exists parent_code text unique;
alter table km.classes add column if not exists teacher_ids uuid[] not null default '{}';
alter table km.classes add column if not exists tg_chat text;
alter table km.materials add column if not exists owner_id uuid references km.users(id) on delete set null;
alter table km.assignments add column if not exists owner_id uuid references km.users(id) on delete set null;
alter table km.files alter column data drop not null;
alter table km.files add column if not exists path text unique;
alter table km.files add column if not exists size int;
alter table km.files add column if not exists owner_id uuid;
alter table km.files add column if not exists state text not null default 'ready';

create table if not exists km.dl_tickets (
  path text not null,
  expires_at timestamptz not null
);
create index if not exists dl_tickets_idx on km.dl_tickets(path, expires_at);

create table if not exists km.attendance (
  group_id uuid not null references km.classes(id) on delete cascade,
  user_id uuid not null references km.users(id) on delete cascade,
  day date not null,
  status text not null check (status in ('bor', 'yoq', 'kech', 'sababli')),
  primary key (group_id, user_id, day)
);

create table if not exists km.settings (
  key text primary key,
  value text
);

create table if not exists km.certs (
  code text primary key,
  user_id uuid not null references km.users(id) on delete cascade,
  level text not null,
  title text not null,
  issued_at timestamptz not null default now(),
  unique (user_id, level)
);

create table if not exists km.tg_log (
  id bigserial primary key,
  chat text,
  body text,
  request_id bigint,
  error text,
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
  if p_role = 'owner' then
    if v.role <> 'admin' then perform km.fail('Bu amalni faqat bosh admin bajara oladi'); end if;
  elsif p_role = 'admin' then
    if v.role not in ('admin', 'teacher') then perform km.fail('Bu amal uchun ruxsat yo''q'); end if;
  elsif p_role is not null and v.role <> p_role then perform km.fail('Bu amal uchun ruxsat yo''q'); end if;
  return v;
end $$;

-- O'qituvchiga biriktirilgan guruhlar (bosh admin uchun hammasi)
create or replace function km.my_groups(v km.users) returns uuid[]
language sql stable set search_path = km, public as $$
  select case when v.role = 'admin' then coalesce(array(select id from km.classes), '{}')
              else coalesce(array(select id from km.classes where v.id = any(teacher_ids)), '{}') end
$$;

create or replace function km.chk_group(v km.users, g uuid) returns void
language plpgsql stable set search_path = km, public as $$
begin
  if v.role <> 'admin' and (g is null or not (g = any(km.my_groups(v)))) then perform km.fail('Bu guruh sizga biriktirilmagan'); end if;
end $$;

create or replace function km.chk_groups(v km.users, gs uuid[]) returns void
language plpgsql stable set search_path = km, public as $$
begin
  if v.role <> 'admin' and not (coalesce(gs, '{}') <@ km.my_groups(v)) then perform km.fail('Faqat o''zingizga biriktirilgan guruhlarni tanlang'); end if;
end $$;

create or replace function km.chk_student(v km.users, u uuid) returns void
language plpgsql stable set search_path = km, public as $$
begin
  if v.role = 'admin' then return; end if;
  if not exists (select 1 from km.users s where s.id = u and s.role = 'student'
                   and (s.class_id = any(km.my_groups(v)) or exists (select 1 from km.members m where m.user_id = s.id and m.group_id = any(km.my_groups(v))))) then
    perform km.fail('Bu o''quvchi sizning guruhlaringizda emas');
  end if;
end $$;

-- Fayllar: bazadagi (eski, base64) yoki Storage'dagi (yangi). Bog'lanmaganlari tozalanadi.
create or replace function km.gc_files() returns void
language plpgsql set search_path = km, public as $$
begin
  delete from km.files f where f.path is null and not exists (select 1 from km.materials x where x.file_id = f.id) and not exists (select 1 from km.submissions x where x.file_id = f.id);
  update km.files f set state = 'trash' where f.path is not null and f.state = 'ready'
     and not exists (select 1 from km.materials x where x.file_id = f.id) and not exists (select 1 from km.submissions x where x.file_id = f.id);
  update km.files set state = 'trash' where path is not null and state = 'pending' and created_at < now() - interval '1 day';
  delete from km.dl_tickets where expires_at < now();
end $$;

-- p_file: {name, mime, data} (bazaga) yoki {id} (Storage'ga oldin yuklangan)
create or replace function km.take_file(v km.users, p_file jsonb) returns uuid
language plpgsql set search_path = km, public as $$
declare fid uuid;
begin
  if jsonb_typeof(p_file) <> 'object' then return null; end if;
  if p_file ? 'id' and not (p_file ? 'data') then
    update km.files set state = 'ready' where id = (p_file->>'id')::uuid and owner_id = v.id and state = 'pending' returning id into fid;
    if fid is null then perform km.fail('Fayl yuklanmadi, qayta urinib ko''ring'); end if;
    return fid;
  end if;
  insert into km.files(name, mime, data, size, owner_id) values (left(p_file->>'name', 200), left(p_file->>'mime', 100), p_file->>'data', length(p_file->>'data') * 3 / 4, v.id) returning id into fid;
  return fid;
end $$;

create or replace function km.setting(k text) returns text
language sql stable set search_path = km, public as $$ select value from km.settings where key = k $$;

-- Telegram: pg_net orqali xabar (pg_net yoqilmagan bo'lsa jim o'tadi, xato tg_log'ga yoziladi)
create or replace function km.tg_send(p_chat text, p_text text) returns boolean
language plpgsql set search_path = km, public as $$
declare tok text := km.setting('tg_token'); rid bigint;
begin
  if coalesce(tok, '') = '' or coalesce(p_chat, '') = '' then return false; end if;
  begin
    execute 'select net.http_post(url := $1, body := $2, headers := $3)' into rid
      using 'https://api.telegram.org/bot' || tok || '/sendMessage',
            jsonb_build_object('chat_id', p_chat, 'text', p_text, 'disable_web_page_preview', true),
            '{"Content-Type": "application/json"}'::jsonb;
    insert into km.tg_log(chat, body, request_id) values (p_chat, left(p_text, 500), rid);
    return true;
  exception when others then
    insert into km.tg_log(chat, body, error) values (p_chat, left(p_text, 500), sqlerrm);
    return false;
  end;
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
declare v km.users := km.auth(p_token, 'admin'); mg uuid[] := km.my_groups(v);
begin
  return jsonb_build_object(
    'role', v.role,
    'teachers', case when v.role = 'admin' then coalesce((select jsonb_agg(jsonb_build_object('id', t.id, 'full_name', t.full_name, 'login', t.login, 'last_seen', t.last_seen,
                   'group_ids', coalesce((select jsonb_agg(c.id) from km.classes c where t.id = any(c.teacher_ids)), '[]')) order by t.full_name) from km.users t where t.role = 'teacher'), '[]') else '[]' end,
    'classes', coalesce((select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'grade', c.grade,
                 'kind', c.kind, 'courses', c.courses, 'about', c.about, 'inf_open', c.inf_open, 'tg_chat', c.tg_chat,
                 'teacher_ids', to_jsonb(c.teacher_ids),
                 'count', case when c.kind = 'sinf' then (select count(*) from km.users u where u.class_id = c.id and u.role = 'student')
                               else (select count(*) from km.members m where m.group_id = c.id) end,
                 'member_ids', case when c.kind = 'togarak' then coalesce((select jsonb_agg(m.user_id) from km.members m where m.group_id = c.id), '[]') else '[]' end)
                 order by c.kind, c.grade, c.name) from km.classes c where c.id = any(mg)), '[]'),
    'students', coalesce((select jsonb_agg(km.user_json(u) order by u.full_name) from km.users u where u.role = 'student'), '[]'));
end $$;

create or replace function public.km_admin_save_class(p_token text, p_id uuid, p_name text, p_grade int) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner'); c km.classes;
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
  perform km.chk_group(v, p_id);
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
    if v.role <> 'admin' then perform km.chk_group(v, nullif(it->>'class_id', '')::uuid); end if;
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
  perform km.chk_student(v, p_id);
  if p_data ? 'class_id' and v.role <> 'admin' then perform km.chk_group(v, nullif(p_data->>'class_id', '')::uuid); end if;
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
  for s in select * from km.users u where u.id = any(p_ids) and u.role = 'student'
             and (v.role = 'admin' or u.id in (select x.id from km.group_students(km.my_groups(v)) x)) order by u.full_name loop
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
  perform km.chk_student(v, p_id);
  delete from km.users where id = p_id and role = 'student';
end $$;

create or replace function public.km_admin_student(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); s km.users;
begin
  perform km.chk_student(v, p_id);
  select * into s from km.users where id = p_id and role = 'student';
  if not found then perform km.fail('O''quvchi topilmadi'); end if;
  return jsonb_build_object('user', km.user_json(s), 'progress', s.progress, 'parent_code', s.parent_code,
    'attendance', coalesce((select jsonb_object_agg(x.status, x.n) from (select status, count(*) n from km.attendance where user_id = s.id and day > current_date - 30 group by status) x), '{}'),
    'awards', coalesce((select jsonb_agg(jsonb_build_object('xp', a.xp, 'note', a.note, 'sticker', a.sticker, 'created_at', a.created_at) order by a.created_at desc) from (select * from km.awards where user_id = s.id order by created_at desc limit 20) a), '[]'));
end $$;

-- ---------------------------------------------------------------------
-- v3: guruhlar (sinf / to'garak), a'zolik, materiallar, fayllar, emoji-avatar
-- ---------------------------------------------------------------------
-- p_data: {name, grade, kind: 'sinf'|'togarak', courses: ['informatika','dasturlash'], about}
create or replace function public.km_admin_save_group(p_token text, p_id uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); c km.classes; cr text[]; tids uuid[];
begin
  if p_id is not null then perform km.chk_group(v, p_id); end if;
  if v.role = 'admin' and p_data ? 'teacher_ids' then
    select coalesce(array_agg(x::uuid), '{}') into tids from jsonb_array_elements_text(p_data->'teacher_ids') x;
    if exists (select 1 from unnest(tids) t where not exists (select 1 from km.users u where u.id = t and u.role = 'teacher')) then perform km.fail('O''qituvchi topilmadi'); end if;
  end if;
  select coalesce(array_agg(x), '{}') into cr from jsonb_array_elements_text(coalesce(p_data->'courses', '[]')) x where x in ('informatika', 'dasturlash');
  begin
    if p_id is null then
      insert into km.classes(name, grade, kind, courses, about, teacher_ids, tg_chat)
      values (trim(p_data->>'name'), (p_data->>'grade')::int, coalesce(p_data->>'kind', 'sinf'), cr, nullif(trim(coalesce(p_data->>'about', '')), ''),
              case when v.role = 'teacher' then array[v.id] else coalesce(tids, '{}') end, nullif(trim(coalesce(p_data->>'tg_chat', '')), ''))
      returning * into c;
    else
      update km.classes set name = trim(p_data->>'name'), grade = (p_data->>'grade')::int, courses = cr,
             inf_open = case when p_data ? 'inf_open' then nullif(p_data->>'inf_open', '')::int else inf_open end,
             about = nullif(trim(coalesce(p_data->>'about', '')), ''),
             tg_chat = case when p_data ? 'tg_chat' then nullif(trim(p_data->>'tg_chat'), '') else tg_chat end,
             teacher_ids = coalesce(tids, teacher_ids)
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
  perform km.chk_group(v, p_group);
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
  if v.role <> 'admin' then
    perform km.chk_group(v, p_class);
    if exists (select 1 from unnest(p_ids) i where i not in (select x.id from km.group_students(km.my_groups(v)) x)) then perform km.fail('Bu o''quvchi sizning guruhlaringizda emas'); end if;
  end if;
  update km.users set class_id = p_class where id = any(p_ids) and role = 'student';
end $$;

create or replace function km.material_json(m km.materials) returns jsonb
language sql stable set search_path = km, public as $$
  select jsonb_build_object('id', m.id, 'title', m.title, 'kind', m.kind, 'url', m.url, 'body', m.body,
    'group_ids', to_jsonb(m.group_ids), 'created_at', m.created_at,
    'file', (select jsonb_build_object('id', f.id, 'name', f.name, 'mime', f.mime, 'size', coalesce(f.size, length(f.data) * 3 / 4), 'stored', f.path is not null) from km.files f where f.id = m.file_id), 'owner_id', m.owner_id)
$$;

-- O'quvchi: o'z sinfi va to'garaklari materiallari. Admin: hammasi.
create or replace function public.km_materials(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g uuid[];
begin
  if v.role in ('admin', 'teacher') then
    return coalesce((select jsonb_agg(km.material_json(m) order by m.created_at desc) from km.materials m
                      where v.role = 'admin' or m.owner_id = v.id or m.group_ids && km.my_groups(v)), '[]');
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
  perform km.chk_groups(v, gids);
  if p_id is not null and v.role <> 'admin' and not exists (select 1 from km.materials where id = p_id and (owner_id = v.id or group_ids && km.my_groups(v))) then perform km.fail('Material topilmadi'); end if;
  fid := km.take_file(v, p_data->'file');
  begin
    if p_id is null then
      if k = 'file' and fid is null then perform km.fail('Fayl tanlanmagan'); end if;
      insert into km.materials(title, kind, url, body, file_id, group_ids, owner_id)
      values (trim(p_data->>'title'), k, nullif(trim(coalesce(p_data->>'url', '')), ''), nullif(p_data->>'body', ''), fid, gids, v.id) returning * into m;
    else
      update km.materials set title = trim(p_data->>'title'), kind = k, url = nullif(trim(coalesce(p_data->>'url', '')), ''),
             body = nullif(p_data->>'body', ''), file_id = coalesce(fid, file_id), group_ids = gids
       where id = p_id returning * into m;
      if not found then perform km.fail('Material topilmadi'); end if;
    end if;
  exception when check_violation then perform km.fail('Sarlavha 1–120 belgi, matn 20 000 belgidan oshmasin, fayl 4 MB dan kichik bo''lsin');
  end;
  perform km.gc_files();
  return km.material_json(m);
end $$;

create or replace function public.km_admin_delete_material(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.materials where id = p_id and (v.role = 'admin' or owner_id = v.id or group_ids && km.my_groups(v));
  perform km.gc_files();
end $$;

create or replace function public.km_get_file(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); f km.files; g uuid[];
begin
  if v.role = 'student' then
    g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
    if not exists (select 1 from km.materials m where m.file_id = p_id and m.group_ids && g)
       and not exists (select 1 from km.submissions x where x.file_id = p_id and x.user_id = v.id) then perform km.fail('Fayl topilmadi'); end if;
  end if;
  select * into f from km.files where id = p_id;
  if not found then perform km.fail('Fayl topilmadi'); end if;
  if f.path is not null then
    delete from km.dl_tickets where expires_at < now();
    insert into km.dl_tickets(path, expires_at) values (f.path, now() + interval '3 minutes');
    return jsonb_build_object('name', f.name, 'mime', f.mime, 'path', f.path, 'bucket', 'prostudent');
  end if;
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
    'file', (select jsonb_build_object('id', f.id, 'name', f.name, 'mime', f.mime, 'size', coalesce(f.size, length(f.data) * 3 / 4), 'stored', f.path is not null) from km.files f where f.id = s.file_id)) end
$$;

create or replace function public.km_assignments(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); g uuid[];
begin
  if v.role in ('admin', 'teacher') then
    return coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'owner_id', a.owner_id, 'title', a.title, 'body', a.body, 'group_ids', to_jsonb(a.group_ids), 'due_at', a.due_at, 'max_score', a.max_score, 'lesson_ref', a.lesson_ref, 'created_at', a.created_at,
             'total', (select count(*) from km.group_students(a.group_ids)),
             'submitted', (select count(*) from km.submissions s where s.assignment_id = a.id),
             'graded', (select count(*) from km.submissions s where s.assignment_id = a.id and s.score is not null)) order by a.created_at desc) from km.assignments a
              where v.role = 'admin' or a.owner_id = v.id or a.group_ids && km.my_groups(v)), '[]');
  end if;
  g := array(select v.class_id where v.class_id is not null union select group_id from km.members where user_id = v.id);
  return coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'body', a.body, 'group_ids', to_jsonb(a.group_ids), 'due_at', a.due_at, 'max_score', a.max_score, 'lesson_ref', a.lesson_ref, 'created_at', a.created_at,
           'sub', (select km.sub_json(s) from km.submissions s where s.assignment_id = a.id and s.user_id = v.id)) order by a.created_at desc)
     from km.assignments a where a.group_ids && g), '[]');
end $$;

create or replace function public.km_admin_save_assignment(p_token text, p_id uuid, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); a km.assignments; gids uuid[]; c km.classes; site text := coalesce(km.setting('site_url'), '');
begin
  select coalesce(array_agg(x::uuid), '{}') into gids from jsonb_array_elements_text(coalesce(p_data->'group_ids', '[]')) x;
  perform km.chk_groups(v, gids);
  if p_id is not null and v.role <> 'admin' and not exists (select 1 from km.assignments where id = p_id and (owner_id = v.id or group_ids && km.my_groups(v))) then perform km.fail('Topshiriq topilmadi'); end if;
  begin
    if p_id is null then
      insert into km.assignments(title, body, group_ids, due_at, max_score, lesson_ref, owner_id)
      values (trim(p_data->>'title'), nullif(p_data->>'body', ''), gids, nullif(p_data->>'due_at', '')::timestamptz, coalesce((p_data->>'max_score')::int, 5), nullif(p_data->>'lesson_ref', ''), v.id)
      returning * into a;
      for c in select * from km.classes where id = any(gids) and tg_chat is not null loop
        perform km.tg_send(c.tg_chat, '📌 Yangi topshiriq (' || c.name || '): ' || a.title ||
          case when a.due_at is not null then E'\nMuddat: ' || to_char(a.due_at at time zone 'Asia/Tashkent', 'DD.MM.YYYY HH24:MI') else '' end ||
          E'\nBall: ' || a.max_score || case when site <> '' then E'\n' || site || '#topshiriq-' || a.id else '' end);
      end loop;
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
  delete from km.assignments where id = p_id and (v.role = 'admin' or owner_id = v.id or group_ids && km.my_groups(v));
  perform km.gc_files();
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
  fid := km.take_file(v, p_data->'file');
  insert into km.submissions(assignment_id, user_id, body, link, file_id, submitted_at)
  values (a.id, v.id, nullif(p_data->>'body', ''), nullif(trim(coalesce(p_data->>'link', '')), ''), fid, now())
  on conflict (assignment_id, user_id) do update set body = excluded.body, link = excluded.link, file_id = coalesce(excluded.file_id, km.submissions.file_id), submitted_at = now()
  returning * into s;
  perform km.gc_files();
  return km.sub_json(s);
exception when check_violation then perform km.fail('Javob juda uzun yoki fayl 4 MB dan katta'); return null;
end $$;

create or replace function public.km_admin_submissions(p_token text, p_assignment uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); a km.assignments;
begin
  select * into a from km.assignments where id = p_assignment and (v.role = 'admin' or owner_id = v.id or group_ids && km.my_groups(v));
  if not found then perform km.fail('Topshiriq topilmadi'); end if;
  return jsonb_build_object('assignment', to_jsonb(a), 'rows', coalesce((select jsonb_agg(jsonb_build_object('user', km.user_json(u), 'sub', (select km.sub_json(s) from km.submissions s where s.assignment_id = a.id and s.user_id = u.id)) order by u.full_name)
     from km.group_students(a.group_ids) u), '[]'));
end $$;

create or replace function public.km_admin_grade(p_token text, p_assignment uuid, p_user uuid, p_score int, p_comment text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); a km.assignments; s km.submissions;
begin
  select * into a from km.assignments where id = p_assignment and (v.role = 'admin' or owner_id = v.id or group_ids && km.my_groups(v));
  if not found then perform km.fail('Topshiriq topilmadi'); end if;
  if not exists (select 1 from km.group_students(a.group_ids) u where u.id = p_user) then perform km.fail('Bu o''quvchiga topshiriq berilmagan'); end if;
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
  perform km.chk_group(v, p_group);
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
  perform km.chk_student(v, p_user);
  select * into u from km.users where id = p_user and role = 'student';
  if not found then perform km.fail('O''quvchi topilmadi'); end if;
  if jsonb_typeof(p_sticker) = 'object' then
    u.stickers := case when jsonb_array_length(u.stickers) >= 30 then u.stickers - 0 else u.stickers end || jsonb_build_array(p_sticker);
  end if;
  update km.users set stickers = u.stickers, bonus_xp = bonus_xp + coalesce(p_xp, 0) where id = u.id returning * into u;
  insert into km.awards(user_id, sticker, xp, note) values (u.id, case when jsonb_typeof(p_sticker) = 'object' then p_sticker end, coalesce(p_xp, 0), nullif(p_note, ''));
  return km.user_json(u);
end $$;

-- ---------------------------------------------------------------------
-- v5: o'qituvchilar, Storage, davomat, Telegram, ota-ona, sertifikat, hisobot, zaxira
-- ---------------------------------------------------------------------

-- ---------- O'qituvchilar (faqat bosh admin boshqaradi) ----------
create or replace function public.km_admin_create_teacher(p_token text, p_name text, p_login text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner'); t km.users; pw text := km.gen_password(); l text;
begin
  if length(trim(coalesce(p_name, ''))) = 0 then perform km.fail('O''qituvchi ismini yozing'); end if;
  l := lower(trim(coalesce(nullif(p_login, ''), p_name)));
  if exists (select 1 from km.users where login = l) then perform km.fail('Bu login band'); end if;
  insert into km.users(role, login, pass_hash, full_name)
  values ('teacher', km.unique_login(l), crypt(pw, gen_salt('bf', 8)), left(trim(p_name), 80)) returning * into t;
  return jsonb_build_object('user', km.user_json(t), 'password', pw);
end $$;

create or replace function public.km_admin_teacher_password(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner'); t km.users; pw text := km.gen_password();
begin
  update km.users set pass_hash = crypt(pw, gen_salt('bf', 8)) where id = p_id and role = 'teacher' returning * into t;
  if not found then perform km.fail('O''qituvchi topilmadi'); end if;
  delete from km.sessions where user_id = t.id;
  return jsonb_build_object('user', km.user_json(t), 'password', pw);
end $$;

create or replace function public.km_admin_delete_teacher(p_token text, p_id uuid) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner');
begin
  update km.classes set teacher_ids = array_remove(teacher_ids, p_id) where p_id = any(teacher_ids);
  delete from km.users where id = p_id and role = 'teacher';
end $$;

-- O'qituvchiga guruhlarni biriktirish (ro'yxat to'liq almashtiriladi)
create or replace function public.km_admin_set_teacher_groups(p_token text, p_id uuid, p_groups uuid[]) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner');
begin
  if not exists (select 1 from km.users where id = p_id and role = 'teacher') then perform km.fail('O''qituvchi topilmadi'); end if;
  update km.classes set teacher_ids = array_remove(teacher_ids, p_id) where p_id = any(teacher_ids) and not (id = any(coalesce(p_groups, '{}')));
  update km.classes set teacher_ids = teacher_ids || p_id where id = any(coalesce(p_groups, '{}')) and not (p_id = any(teacher_ids));
end $$;

-- ---------- Fayllar: Supabase Storage ----------
-- 1) sayt "chipta" oladi, 2) faylni Storage'ga to'g'ridan-to'g'ri yuklaydi, 3) material/topshiriqqa {id} bilan biriktiradi
create or replace function public.km_file_ticket(p_token text, p_name text, p_mime text, p_size int, p_purpose text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token); f km.files; nm text;
begin
  if p_purpose = 'material' and v.role not in ('admin', 'teacher') then perform km.fail('Bu amal uchun ruxsat yo''q'); end if;
  if coalesce(p_size, 0) <= 0 or p_size > 25 * 1024 * 1024 then perform km.fail('Fayl 25 MB dan katta bo''lmasin'); end if;
  if (select count(*) from km.files where owner_id = v.id and created_at > now() - interval '1 hour') >= 60 then perform km.fail('Juda ko''p fayl yuklandi, birozdan keyin urinib ko''ring'); end if;
  nm := coalesce(nullif(regexp_replace(lower(coalesce(p_name, 'fayl')), '[^a-z0-9._-]+', '-', 'g'), ''), 'fayl');
  insert into km.files(name, mime, size, owner_id, state) values (left(coalesce(nullif(p_name, ''), 'fayl'), 200), left(coalesce(nullif(p_mime, ''), 'application/octet-stream'), 100), p_size, v.id, 'pending')
  returning * into f;
  update km.files set path = 'f/' || f.id || '/' || right(nm, 80) where id = f.id returning * into f;
  return jsonb_build_object('id', f.id, 'path', f.path, 'bucket', 'prostudent');
end $$;

-- Storage qoidalari shu funksiyalardan foydalanadi (bucket "prostudent", yopiq)
create or replace function public.km_storage_can_upload(p_name text) returns boolean
language sql stable security definer set search_path = km, public as $$
  select exists (select 1 from km.files where path = p_name and state = 'pending' and created_at > now() - interval '30 minutes')
$$;
create or replace function public.km_storage_can_read(p_name text) returns boolean
language sql stable security definer set search_path = km, public as $$
  select exists (select 1 from km.dl_tickets where path = p_name and expires_at > now())
$$;
create or replace function public.km_storage_can_delete(p_name text) returns boolean
language sql stable security definer set search_path = km, public as $$
  select exists (select 1 from km.files where path = p_name and state = 'trash')
$$;

-- Keraksiz bo'lib qolgan Storage fayllari ro'yxati (admin paneli ularni o'chiradi)
create or replace function public.km_admin_storage_trash(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  perform km.gc_files();
  return coalesce((select jsonb_agg(path) from (select path from km.files where state = 'trash' and path is not null limit 100) x), '[]');
end $$;

create or replace function public.km_admin_storage_purged(p_token text, p_paths text[]) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  delete from km.files where state = 'trash' and path = any(coalesce(p_paths, '{}'));
end $$;

-- ---------- Davomat ----------
create or replace function public.km_admin_attendance(p_token text, p_group uuid, p_from date, p_to date) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  perform km.chk_group(v, p_group);
  return jsonb_build_object(
    'students', coalesce((select jsonb_agg(jsonb_build_object('id', u.id, 'full_name', u.full_name) order by u.full_name) from km.group_students(array[p_group]) u), '[]'),
    'marks', coalesce((select jsonb_agg(jsonb_build_object('u', a.user_id, 'day', a.day, 's', a.status)) from km.attendance a
                        where a.group_id = p_group and a.day between coalesce(p_from, current_date - 30) and coalesce(p_to, current_date)), '[]'));
end $$;

-- p_marks: {"<user_id>": "bor"|"yoq"|"kech"|"sababli"|null}
create or replace function public.km_admin_attendance_set(p_token text, p_group uuid, p_day date, p_marks jsonb) returns void
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); k text; st text;
begin
  perform km.chk_group(v, p_group);
  if p_day is null or p_day > current_date + 1 or p_day < current_date - 366 then perform km.fail('Sana noto''g''ri'); end if;
  for k, st in select key, value #>> '{}' from jsonb_each(coalesce(p_marks, '{}')) loop
    if not exists (select 1 from km.group_students(array[p_group]) u where u.id = k::uuid) then continue; end if;
    if st is null or st = '' then
      delete from km.attendance where group_id = p_group and user_id = k::uuid and day = p_day;
    elsif st in ('bor', 'yoq', 'kech', 'sababli') then
      insert into km.attendance(group_id, user_id, day, status) values (p_group, k::uuid, p_day, st)
      on conflict (group_id, user_id, day) do update set status = excluded.status;
    end if;
  end loop;
end $$;

-- ---------- Sozlamalar va Telegram ----------
create or replace function public.km_admin_settings(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  return jsonb_build_object('tg_token_set', coalesce(km.setting('tg_token'), '') <> '', 'site_url', coalesce(km.setting('site_url'), ''),
    'pg_net', exists (select 1 from pg_namespace where nspname = 'net'),
    'tg_errors', coalesce((select jsonb_agg(jsonb_build_object('at', created_at, 'error', error)) from (select * from km.tg_log where error is not null order by id desc limit 3) x), '[]'));
end $$;

-- p_data: {tg_token?, site_url?}
create or replace function public.km_admin_settings_save(p_token text, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner');
begin
  if p_data ? 'tg_token' then
    if coalesce(p_data->>'tg_token', '') <> '' and p_data->>'tg_token' !~ '^[0-9]{5,15}:[A-Za-z0-9_-]{20,60}$' then perform km.fail('Bot token formati noto''g''ri (BotFather bergan token: 123456:ABC...)'); end if;
    insert into km.settings(key, value) values ('tg_token', nullif(trim(p_data->>'tg_token'), '')) on conflict (key) do update set value = excluded.value;
  end if;
  if p_data ? 'site_url' then
    if coalesce(p_data->>'site_url', '') <> '' and p_data->>'site_url' !~* '^https://' then perform km.fail('Sayt manzili https:// bilan boshlansin'); end if;
    insert into km.settings(key, value) values ('site_url', nullif(regexp_replace(trim(p_data->>'site_url'), '#.*$', ''), '')) on conflict (key) do update set value = excluded.value;
  end if;
  begin execute 'create extension if not exists pg_net'; exception when others then null; end;
  return public.km_admin_settings(p_token);
end $$;

-- Guruhga Telegram orqali e'lon
create or replace function public.km_admin_announce(p_token text, p_group uuid, p_text text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); c km.classes;
begin
  perform km.chk_group(v, p_group);
  select * into c from km.classes where id = p_group;
  if c.tg_chat is null then perform km.fail('Bu guruhga Telegram chat ID kiritilmagan'); end if;
  if coalesce(km.setting('tg_token'), '') = '' then perform km.fail('Telegram bot ulanmagan (Sozlamalar bo''limi)'); end if;
  if length(trim(coalesce(p_text, ''))) not between 1 and 2000 then perform km.fail('Xabar 1–2000 belgi bo''lsin'); end if;
  return jsonb_build_object('sent', km.tg_send(c.tg_chat, '📢 ' || c.name || E'\n' || trim(p_text)));
end $$;

-- Bot qo'shilgan guruhlarni topish: 1) so'rov yuboriladi, 2) bir necha soniyadan keyin javob o'qiladi
create or replace function public.km_admin_tg_scan(p_token text) returns bigint
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); tok text := km.setting('tg_token'); rid bigint;
begin
  if coalesce(tok, '') = '' then perform km.fail('Avval bot tokenini saqlang'); end if;
  begin
    execute 'select net.http_get(url := $1)' into rid using 'https://api.telegram.org/bot' || tok || '/getUpdates?allowed_updates=%5B%22message%22%2C%22my_chat_member%22%5D';
  exception when others then perform km.fail('pg_net yoqilmagan: Supabase → Database → Extensions → pg_net'); end;
  return rid;
end $$;

create or replace function public.km_admin_tg_chats(p_token text, p_req bigint) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); body text; j jsonb;
begin
  begin
    execute 'select content from net._http_response where id = $1' into body using p_req;
  exception when others then perform km.fail('pg_net yoqilmagan'); end;
  if body is null then return jsonb_build_object('ready', false); end if;
  j := body::jsonb;
  if coalesce((j->>'ok')::boolean, false) = false then perform km.fail('Telegram javobi: ' || coalesce(j->>'description', 'xato')); end if;
  return jsonb_build_object('ready', true, 'chats', coalesce((select jsonb_agg(distinct jsonb_build_object('id', (c->>'id'), 'title', coalesce(c->>'title', c->>'first_name', ''), 'type', c->>'type'))
     from jsonb_array_elements(j->'result') r, lateral (select coalesce(r->'message'->'chat', r->'my_chat_member'->'chat') c) x where c is not null), '[]'));
end $$;

-- ---------- Ota-ona havolasi ----------
create or replace function public.km_admin_parent_code(p_token text, p_user uuid, p_new boolean) returns text
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin'); c text;
begin
  perform km.chk_student(v, p_user);
  select parent_code into c from km.users where id = p_user and role = 'student';
  if c is null or p_new then
    c := lower(encode(gen_random_bytes(8), 'hex'));
    update km.users set parent_code = c where id = p_user;
  end if;
  return c;
end $$;

-- Kirishsiz: ota-ona farzandining natijalarini ko'radi
create or replace function public.km_parent_view(p_code text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare s km.users; g uuid[];
begin
  if coalesce(p_code, '') !~ '^[0-9a-f]{16}$' then perform km.fail('Havola noto''g''ri'); end if;
  select * into s from km.users where parent_code = p_code and role = 'student';
  if not found then perform km.fail('Havola eskirgan yoki noto''g''ri. O''qituvchidan yangisini so''rang.'); end if;
  g := array(select s.class_id where s.class_id is not null union select group_id from km.members where user_id = s.id);
  return jsonb_build_object(
    'user', jsonb_build_object('full_name', s.full_name, 'class_name', (select name from km.classes where id = s.class_id), 'photo', s.photo, 'photo_kind', s.photo_kind,
             'stickers', s.stickers, 'xp', s.xp + s.bonus_xp, 'lessons_done', s.lessons_done, 'last_seen', s.last_seen),
    'groups', coalesce((select jsonb_agg(c.name order by c.kind, c.name) from km.classes c where c.id = any(g)), '[]'),
    'assignments', coalesce((select jsonb_agg(jsonb_build_object('title', a.title, 'due_at', a.due_at, 'max_score', a.max_score,
                     'submitted_at', x.submitted_at, 'score', x.score, 'comment', x.comment) order by a.created_at desc)
                   from (select * from km.assignments where group_ids && g order by created_at desc limit 30) a
                   left join km.submissions x on x.assignment_id = a.id and x.user_id = s.id), '[]'),
    'attendance', coalesce((select jsonb_object_agg(t.status, t.n) from (select status, count(*) n from km.attendance where user_id = s.id and day > current_date - 30 group by status) t), '{}'),
    'absences', coalesce((select jsonb_agg(jsonb_build_object('day', day, 's', status) order by day desc) from (select * from km.attendance where user_id = s.id and status <> 'bor' order by day desc limit 10) t), '[]'),
    'awards', coalesce((select jsonb_agg(jsonb_build_object('xp', a.xp, 'note', a.note, 'created_at', a.created_at) order by a.created_at desc) from (select * from km.awards where user_id = s.id order by created_at desc limit 10) a), '[]'),
    'certs', coalesce((select jsonb_agg(jsonb_build_object('code', c.code, 'title', c.title, 'issued_at', c.issued_at) order by c.issued_at) from km.certs c where c.user_id = s.id), '[]'));
end $$;

-- ---------- Sertifikatlar ----------
-- O'quvchi bosqichni tugatganda chaqiradi. p_level: masalan "kod-5", p_need: o'sha bosqichdagi darslar soni
create or replace function public.km_cert_issue(p_token text, p_level text, p_title text, p_need int) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'student'); c km.certs; pre text; n int;
begin
  if coalesce(p_level, '') !~ '^[a-z]{2,10}-[0-9]{1,2}$' then perform km.fail('Bosqich noto''g''ri'); end if;
  select * into c from km.certs where user_id = v.id and level = p_level;
  if found then return to_jsonb(c); end if;
  pre := split_part(p_level, '-', 2) || '-';
  select count(*) into n from jsonb_object_keys(coalesce(v.progress->'done', '{}')) k where k like pre || '%';
  if n < greatest(1, coalesce(p_need, 1)) then perform km.fail('Bosqichdagi barcha darslarni tugating'); end if;
  insert into km.certs(code, user_id, level, title) values (upper(encode(gen_random_bytes(5), 'hex')), v.id, p_level, left(coalesce(nullif(trim(p_title), ''), p_level), 120)) returning * into c;
  return to_jsonb(c);
end $$;

-- Kirishsiz: sertifikat haqiqiyligini tekshirish
create or replace function public.km_cert_verify(p_code text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare c km.certs; u km.users;
begin
  select * into c from km.certs where code = upper(trim(coalesce(p_code, '')));
  if not found then return jsonb_build_object('valid', false); end if;
  select * into u from km.users where id = c.user_id;
  return jsonb_build_object('valid', true, 'code', c.code, 'title', c.title, 'issued_at', c.issued_at, 'full_name', u.full_name,
    'class_name', (select name from km.classes where id = u.class_id));
end $$;

-- ---------- Hisobot ----------
create or replace function public.km_admin_report(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'admin');
begin
  return coalesce((select jsonb_agg(r order by r->>'kind', (r->>'grade')::int, r->>'name') from (
    select jsonb_build_object('id', c.id, 'name', c.name, 'kind', c.kind, 'grade', c.grade,
      'students', (select count(*) from km.group_students(array[c.id])),
      'avg_lessons', (select round(avg(u.lessons_done), 1) from km.group_students(array[c.id]) u),
      'avg_xp', (select round(avg(u.xp + u.bonus_xp)) from km.group_students(array[c.id]) u),
      'active7', (select count(*) from km.group_students(array[c.id]) u where u.last_seen > now() - interval '7 days'),
      'assignments', (select count(*) from km.assignments a where c.id = any(a.group_ids)),
      'submitted', (select count(*) from km.submissions s join km.assignments a on a.id = s.assignment_id
                     where c.id = any(a.group_ids) and s.submitted_at is not null and s.user_id in (select u.id from km.group_students(array[c.id]) u)),
      'avg_pct', (select round(avg(s.score * 100.0 / a.max_score)) from km.submissions s join km.assignments a on a.id = s.assignment_id
                   where c.id = any(a.group_ids) and s.score is not null and s.user_id in (select u.id from km.group_students(array[c.id]) u)),
      'att_total', (select count(*) from km.attendance t where t.group_id = c.id and t.day > current_date - 30),
      'att_present', (select count(*) from km.attendance t where t.group_id = c.id and t.day > current_date - 30 and t.status in ('bor', 'kech'))) r
    from km.classes c where c.id = any(km.my_groups(v))) q), '[]');
end $$;

-- ---------- Zaxira nusxa ----------
-- Fayllarning o'zi (bazadagi base64) zaxiraga kirmaydi; Storage'dagi fayllar joyida qoladi
create or replace function public.km_admin_backup(p_token text) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner');
begin
  return jsonb_build_object('format', 'zis-prostudent', 'version', 5, 'created_at', now(),
    'classes', coalesce((select jsonb_agg(to_jsonb(x)) from km.classes x), '[]'),
    'users', coalesce((select jsonb_agg(to_jsonb(x)) from km.users x), '[]'),
    'members', coalesce((select jsonb_agg(to_jsonb(x)) from km.members x), '[]'),
    'files', coalesce((select jsonb_agg(to_jsonb(x) - 'data') from km.files x where x.path is not null and x.state = 'ready'), '[]'),
    'materials', coalesce((select jsonb_agg(to_jsonb(x)) from km.materials x), '[]'),
    'quizzes', coalesce((select jsonb_agg(to_jsonb(x)) from km.quizzes x), '[]'),
    'assignments', coalesce((select jsonb_agg(to_jsonb(x)) from km.assignments x), '[]'),
    'submissions', coalesce((select jsonb_agg(to_jsonb(x)) from km.submissions x), '[]'),
    'awards', coalesce((select jsonb_agg(to_jsonb(x)) from km.awards x), '[]'),
    'attendance', coalesce((select jsonb_agg(to_jsonb(x)) from km.attendance x), '[]'),
    'certs', coalesce((select jsonb_agg(to_jsonb(x)) from km.certs x), '[]'),
    'settings', coalesce((select jsonb_agg(to_jsonb(x)) from km.settings x where x.key <> 'tg_token'), '[]'));
end $$;

-- Zaxiradan tiklash: hozirgi ma'lumotlar zaxiradagisi bilan almashtiriladi
create or replace function public.km_admin_restore(p_token text, p_data jsonb) returns jsonb
language plpgsql security definer set search_path = km, extensions, public as $$
declare v km.users := km.auth(p_token, 'owner');
begin
  if p_data->>'format' <> 'zis-prostudent' then perform km.fail('Bu ZIS ProStudent zaxira fayli emas'); end if;
  if not exists (select 1 from jsonb_array_elements(p_data->'users') u where u->>'role' = 'admin') then perform km.fail('Zaxirada admin yo''q'); end if;
  delete from km.game_answers; delete from km.game_players; delete from km.games;
  delete from km.attendance; delete from km.certs; delete from km.awards; delete from km.submissions; delete from km.assignments;
  delete from km.quizzes; delete from km.materials; delete from km.members;
  delete from km.sessions where token <> p_token;
  delete from km.users where id <> v.id;
  delete from km.files where path is null or id not in (select (x->>'id')::uuid from jsonb_array_elements(p_data->'files') x);
  delete from km.classes;
  insert into km.classes select * from jsonb_populate_recordset(null::km.classes, p_data->'classes');
  delete from km.users where id = v.id and not exists (select 1 from jsonb_array_elements(p_data->'users') u where (u->>'id')::uuid = v.id);
  insert into km.users select * from jsonb_populate_recordset(null::km.users, p_data->'users') on conflict (id) do update set
    role = excluded.role, login = excluded.login, pass_hash = excluded.pass_hash, full_name = excluded.full_name, class_id = excluded.class_id, photo = excluded.photo,
    photo_kind = excluded.photo_kind, stickers = excluded.stickers, progress = excluded.progress, xp = excluded.xp, bonus_xp = excluded.bonus_xp,
    lessons_done = excluded.lessons_done, parent_code = excluded.parent_code;
  insert into km.members select * from jsonb_populate_recordset(null::km.members, p_data->'members') on conflict do nothing;
  insert into km.files select * from jsonb_populate_recordset(null::km.files, p_data->'files') on conflict (id) do nothing;
  insert into km.materials select * from jsonb_populate_recordset(null::km.materials, p_data->'materials');
  update km.materials set file_id = null where file_id is not null and file_id not in (select id from km.files);
  insert into km.quizzes select * from jsonb_populate_recordset(null::km.quizzes, p_data->'quizzes');
  insert into km.assignments select * from jsonb_populate_recordset(null::km.assignments, p_data->'assignments');
  insert into km.submissions select * from jsonb_populate_recordset(null::km.submissions, p_data->'submissions');
  update km.submissions set file_id = null where file_id is not null and file_id not in (select id from km.files);
  insert into km.awards select * from jsonb_populate_recordset(null::km.awards, p_data->'awards');
  insert into km.attendance select * from jsonb_populate_recordset(null::km.attendance, coalesce(p_data->'attendance', '[]'));
  insert into km.certs select * from jsonb_populate_recordset(null::km.certs, coalesce(p_data->'certs', '[]'));
  insert into km.settings select * from jsonb_populate_recordset(null::km.settings, coalesce(p_data->'settings', '[]')) on conflict (key) do update set value = excluded.value;
  return jsonb_build_object('users', (select count(*) from km.users), 'classes', (select count(*) from km.classes));
end $$;

-- ---------- Supabase Storage: bucket va qoidalar (Supabase'da bo'lsa) ----------
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'storage' and table_name = 'buckets') then
    insert into storage.buckets(id, name, public, file_size_limit) values ('prostudent', 'prostudent', false, 26214400)
    on conflict (id) do update set public = false, file_size_limit = 26214400;
    drop policy if exists km_upload on storage.objects;
    create policy km_upload on storage.objects for insert to anon, authenticated with check (bucket_id = 'prostudent' and public.km_storage_can_upload(name));
    drop policy if exists km_read on storage.objects;
    create policy km_read on storage.objects for select to anon, authenticated using (bucket_id = 'prostudent' and public.km_storage_can_read(name));
    drop policy if exists km_delete on storage.objects;
    create policy km_delete on storage.objects for delete to anon, authenticated using (bucket_id = 'prostudent' and public.km_storage_can_delete(name));
  end if;
exception when others then raise notice 'Storage sozlanmadi: %', sqlerrm;
end $$;

-- Telegram uchun pg_net (Supabase'da bor; bo'lmasa jim o'tadi)
do $$ begin
  execute 'create extension if not exists pg_net';
exception when others then raise notice 'pg_net yoqilmadi: %', sqlerrm;
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
