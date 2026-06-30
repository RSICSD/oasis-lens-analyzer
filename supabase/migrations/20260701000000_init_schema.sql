-- RSIC initial backend schema
-- Run once in the Supabase SQL Editor (or `supabase db push`).
-- Covers: PoC dashboard (Al-Burgig), contact form, donation intents, blog content.

-- ============================================================
-- PoC dashboard
-- ============================================================

create table if not exists poc_units (
  id text primary key,
  name_ar text not null,
  type text not null check (type in ('mill', 'silo', 'packaging', 'admin', 'training', 'energy')),
  status text not null check (status in ('planned', 'in_progress', 'done', 'blocked')),
  x numeric not null default 0,
  y numeric not null default 0,
  z numeric not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists poc_work_packages (
  id text primary key,
  unit_id text not null references poc_units(id) on delete cascade,
  name_ar text not null,
  category text not null check (category in ('agreement', 'due_diligence', 'mou', 'procurement', 'civil', 'training')),
  status text not null check (status in ('planned', 'in_progress', 'done', 'blocked')),
  progress_pct int not null default 0 check (progress_pct between 0 and 100),
  planned_start date,
  planned_end date,
  actual_start date,
  actual_end date,
  doc_url text default '#',
  updated_at timestamptz not null default now()
);

create table if not exists poc_funding (
  work_package_id text primary key references poc_work_packages(id) on delete cascade,
  allocated_usd numeric not null default 0,
  received_usd numeric not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists poc_documents (
  id text primary key,
  title_ar text not null,
  type text not null,
  url text default '#',
  work_package_id text references poc_work_packages(id) on delete set null
);

-- ============================================================
-- Contact form
-- ============================================================

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Donations (intent capture — no payment processor wired yet)
-- ============================================================

create table if not exists donation_intents (
  id uuid primary key default gen_random_uuid(),
  amount_usd numeric not null check (amount_usd > 0),
  recurring text not null check (recurring in ('once', 'monthly')),
  status text not null default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  email text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Blog content (news / articles / reports) — bilingual
-- ============================================================

create table if not exists news_posts (
  id text primary key,
  date date not null,
  title_ar text not null,
  title_en text not null,
  excerpt_ar text not null,
  excerpt_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id text primary key,
  date date not null,
  author_ar text not null,
  author_en text not null,
  title_ar text not null,
  title_en text not null,
  excerpt_ar text not null,
  excerpt_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id text primary key,
  date date not null,
  title_ar text not null,
  title_en text not null,
  description_ar text not null,
  description_en text not null,
  url text not null,
  pages int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table poc_units enable row level security;
alter table poc_work_packages enable row level security;
alter table poc_funding enable row level security;
alter table poc_documents enable row level security;
alter table contact_submissions enable row level security;
alter table donation_intents enable row level security;
alter table news_posts enable row level security;
alter table articles enable row level security;
alter table reports enable row level security;

-- Public read access for site content
create policy "public read poc_units" on poc_units for select using (true);
create policy "public read poc_work_packages" on poc_work_packages for select using (true);
create policy "public read poc_funding" on poc_funding for select using (true);
create policy "public read poc_documents" on poc_documents for select using (true);
create policy "public read news_posts" on news_posts for select using (true);
create policy "public read articles" on articles for select using (true);
create policy "public read reports" on reports for select using (true);

-- Public can submit, but not read/update/delete others' submissions (admin reads via dashboard / service role)
create policy "public insert contact_submissions" on contact_submissions for insert with check (true);
create policy "public insert donation_intents" on donation_intents for insert with check (true);

-- ============================================================
-- Seed data — mirrors src/lib/poc-fallback.json and src/lib/content.ts
-- ============================================================

insert into poc_units (id, name_ar, type, status, x, y, z) values
  ('mill', 'وحدة الطحن والمعالجة', 'mill', 'in_progress', -4, 0, -2),
  ('silo', 'صوامع التخزين', 'silo', 'done', 0, 0, -4),
  ('packaging', 'خط التعبئة والتغليف', 'packaging', 'in_progress', 4, 0, -2),
  ('admin', 'المبنى الإداري', 'admin', 'in_progress', -3, 0, 3),
  ('training', 'مركز التدريب', 'training', 'planned', 3, 0, 3),
  ('energy', 'محطة الطاقة الشمسية', 'energy', 'planned', 0, 0, 5)
on conflict (id) do nothing;

insert into poc_work_packages (id, unit_id, name_ar, category, status, progress_pct, planned_start, planned_end, actual_start, actual_end, doc_url) values
  ('wp1', 'admin', 'اتفاقية تخصيص الأرض', 'agreement', 'done', 100, '2026-01-01', '2026-02-15', '2026-01-05', '2026-02-10', '#'),
  ('wp2', 'admin', 'العناية الواجبة الفنية والمالية', 'due_diligence', 'done', 100, '2026-02-01', '2026-03-20', '2026-02-05', '2026-03-25', '#'),
  ('wp3', 'admin', 'مذكرة تفاهم مع السلطة المحلية', 'mou', 'done', 100, '2026-02-15', '2026-03-15', '2026-02-20', '2026-03-18', '#'),
  ('wp4', 'mill', 'توريد معدات الطحن', 'procurement', 'in_progress', 55, '2026-03-01', '2026-07-30', '2026-03-10', null, '#'),
  ('wp5', 'silo', 'إنشاء صوامع التخزين', 'civil', 'done', 100, '2026-03-01', '2026-05-30', '2026-03-05', '2026-05-28', '#'),
  ('wp6', 'packaging', 'تركيب خط التعبئة', 'procurement', 'in_progress', 35, '2026-04-01', '2026-08-30', '2026-04-20', null, '#'),
  ('wp7', 'training', 'برنامج تدريب الكوادر المحلية', 'training', 'planned', 0, '2026-07-01', '2026-09-30', null, null, '#'),
  ('wp8', 'energy', 'أعمال الطاقة الشمسية', 'civil', 'planned', 0, '2026-08-01', '2026-10-15', null, null, '#')
on conflict (id) do nothing;

insert into poc_funding (work_package_id, allocated_usd, received_usd) values
  ('wp1', 15000, 15000),
  ('wp2', 25000, 25000),
  ('wp3', 10000, 10000),
  ('wp4', 420000, 230000),
  ('wp5', 180000, 180000),
  ('wp6', 310000, 110000),
  ('wp7', 45000, 8000),
  ('wp8', 220000, 0)
on conflict (work_package_id) do nothing;

insert into poc_documents (id, title_ar, type, url, work_package_id) values
  ('d1', 'اتفاقية تخصيص الأرض', 'agreement', '#', 'wp1'),
  ('d2', 'تقرير العناية الواجبة الفنية', 'report', '#', 'wp2'),
  ('d3', 'مذكرة تفاهم السلطة المحلية', 'mou', '#', 'wp3'),
  ('d4', 'عقد توريد معدات الطحن', 'procurement', '#', 'wp4'),
  ('d5', 'محضر تسليم الصوامع', 'handover', '#', 'wp5')
on conflict (id) do nothing;

insert into news_posts (id, date, title_ar, title_en, excerpt_ar, excerpt_en) values
  ('n1', '2026-06-10', 'إطلاق المرحلة التجريبية في محلية البرقيق – الشمالية', 'Pilot phase launched in Al-Burgig — Northern State', 'بدء أعمال التأسيس للمجمع الرائد ومصنع منتجات النخيل كأول مصنع تشغيلي.', 'Groundbreaking for the flagship complex and the dates products factory as the first operational unit.'),
  ('n2', '2026-05-22', 'توقيع مذكرة تفاهم مع جامعة وادي النيل', 'MoU signed with Wadi El-Neel University', 'شراكة بحثية لتطوير مختبرات الجودة ومراكز التدريب الصناعي.', 'A research partnership to develop quality labs and industrial training centers.'),
  ('n3', '2026-05-01', 'ورشة عمل مع مجالس المجتمع المحلي', 'Workshop with local community councils', 'نقاش نموذج الشركات المجتمعية وآليات الحوكمة الشفافة.', 'Discussion of the community-enterprise model and transparent governance mechanisms.')
on conflict (id) do nothing;

insert into articles (id, date, author_ar, author_en, title_ar, title_en, excerpt_ar, excerpt_en) values
  ('a1', '2026-06-01', 'فريق المبادرة', 'Initiative team', 'لماذا الصناعة الريفية المجتمعية الآن؟', 'Why community-led rural industry, now?', 'قراءة في اللحظة التاريخية التي يمر بها السودان، والفرصة لإعادة بناء الاقتصاد من القاعدة الريفية.', 'A reading of Sudan''s historic moment and the chance to rebuild the economy from its rural base.'),
  ('a2', '2026-05-15', 'د. الأمين', 'Dr. Al-Amin', 'الاقتصاد الدائري في المجمعات الصناعية الريفية', 'The circular economy inside rural industrial complexes', 'كيف تتحول النفايات الصناعية إلى مدخلات إنتاج وقيمة مضافة في النموذج المقترح.', 'How industrial by-products become inputs and added value in the proposed model.'),
  ('a3', '2026-04-28', 'م. خالد', 'Eng. Khaled', 'نموذج الشركة المجتمعية: الملكية والحوكمة', 'The community-enterprise model: ownership and governance', 'تفصيل لهيكل الملكية المجتمعية وآليات اتخاذ القرار وتوزيع الأرباح.', 'A breakdown of community ownership structure, decision-making, and profit distribution.')
on conflict (id) do nothing;

insert into reports (id, date, title_ar, title_en, description_ar, description_en, url, pages) values
  ('r1', '2026-06-01', 'الملف التعريفي للمبادرة', 'Initiative Profile Document', 'نظرة شاملة على مبادرة المجمعات الصناعية الريفية المجتمعية وأركانها الستة.', 'A comprehensive overview of the RSIC initiative and its six pillars.', 'https://www.africau.edu/images/default/sample.pdf', 42),
  ('r2', '2026-04-15', 'دراسة الجدوى — محلية البرقيق', 'Feasibility Study — Al-Burgig Locality', 'تحليل اقتصادي واجتماعي للمجمع الرائد في الولاية الشمالية.', 'Economic and social analysis of the flagship complex in the Northern State.', 'https://www.africau.edu/images/default/sample.pdf', 88)
on conflict (id) do nothing;

-- ============================================================
-- Role permissions (required for anon/authenticated to access
-- tables created outside the Supabase dashboard)
-- ============================================================

grant select on poc_units, poc_work_packages, poc_funding, poc_documents,
               news_posts, articles, reports
  to anon, authenticated;

grant insert on contact_submissions, donation_intents
  to anon, authenticated;
