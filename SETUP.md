# 🌸 Aleina Faye Franco — VA Portfolio
## Full Setup & Deployment Guide

---

## 1. SUPABASE — Run this SQL in the SQL Editor

```sql
-- PROFILE
create table profile (
  id              serial primary key,
  name            text,
  studio          text,
  title           text,
  bio             text,
  email           text,
  whatsapp_link   text,
  resume_url      text,
  location        text,
  school          text
);

-- NICHES
create table niches (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  slug        text unique not null,
  icon        text,
  tagline     text,
  description text,
  theme       jsonb,
  is_featured boolean default false,
  sort_order  int default 0
);

-- PROJECTS
create table projects (
  id          uuid default gen_random_uuid() primary key,
  niche_id    uuid references niches(id) on delete cascade,
  niche_slug  text,
  title       text not null,
  description text,
  tags        text[],
  fb_link     text,
  image_url   text,
  sort_order  int default 0
);

-- CERTIFICATES
create table certificates (
  id          uuid default gen_random_uuid() primary key,
  niche_id    uuid references niches(id) on delete cascade,
  niche       text,
  title       text not null,
  issuer      text,
  date        text,
  date_issued date,
  color       text,
  image_url   text
);

-- PUBLIC READ POLICIES (RLS)
alter table profile      enable row level security;
alter table niches       enable row level security;
alter table projects     enable row level security;
alter table certificates enable row level security;

create policy "Public read" on profile      for select using (true);
create policy "Public read" on niches       for select using (true);
create policy "Public read" on projects     for select using (true);
create policy "Public read" on certificates for select using (true);
```

---

## 2. SEED — Insert Your Profile

```sql
insert into profile (name, studio, title, bio, email, whatsapp_link, resume_url, location, school)
values (
  'Aleina Faye Franco',
  'YCC Studio',
  'Virtual Assistant · Social Media Manager · Content Creator',
  'Focused and versatile BS Information Technology student with a strong foundation in digital literacy, communication, and leadership. Co-founder of YCC Studio — your creative companion.',
  'aleinafayeg@gmail.com',
  'https://wa.me/639985801867',
  '/resume/Aleina_Faye_Franco_Resume.pdf',
  'Taytay, Rizal, Philippines',
  'Siena College of Taytay'
);
```

---

## 3. SEED — Insert Niches

```sql
insert into niches (name, slug, icon, tagline, description, is_featured, sort_order, theme) values
(
  'Creative & Social Media', 'creative', '✦',
  'Social Media Manager & Content Creator',
  'Crafting scroll-stopping visuals, branded pubmats, digital invitations, and social media content.',
  true, 1,
  '{"accent":"#D4607A","accentAlt":"#E8829A","accentLight":"#FDE8ED","accentDark":"#8B1A32","grad":"linear-gradient(135deg,#FFF0F3 0%,#FDE8ED 50%,#FFF8F9 100%)","tag":"#D4607A","tagBg":"#FDE8ED","border":"#F0B8C5"}'
),
(
  'Administrative & Data', 'admin', '◈',
  'Data Analysis · Record Management · Admin Support',
  'Turning raw information into structured clarity. Excel dashboards, Google Colab analysis, PSA work immersion experience.',
  false, 2,
  '{"accent":"#2563EB","accentAlt":"#4B83F0","accentLight":"#EFF6FF","accentDark":"#1E3A8A","grad":"linear-gradient(135deg,#EFF6FF 0%,#F8FAFC 100%)","tag":"#2563EB","tagBg":"#DBEAFE","border":"#BFDBFE"}'
),
(
  'E-Commerce & Support', 'ecommerce', '⬡',
  'Product Listings · Chat Support · Order Management',
  'Optimizing listings, handling customer inquiries, and managing orders with professionalism.',
  false, 3,
  '{"accent":"#059669","accentAlt":"#10B981","accentLight":"#ECFDF5","accentDark":"#065F46","grad":"linear-gradient(135deg,#ECFDF5 0%,#F0FDF4 100%)","tag":"#059669","tagBg":"#D1FAE5","border":"#6EE7B7"}'
);
```

---

## 4. STORAGE — Upload Certificate Images

1. In Supabase → **Storage** → create a public bucket: `portfolio-images`
2. Upload each certificate image
3. Copy the public URL
4. Paste into the `image_url` column of the `certificates` table

---

## 5. EMAILJS — Activate Contact Form

1. Sign up at **emailjs.com** (free: 200 emails/month)
2. Create a service and a template
3. In `src/components/ContactSection.jsx`, uncomment the EmailJS lines
4. Add your keys to `.env`

---

## 6. LOCAL DEVELOPMENT

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env

# Fill in your Supabase + EmailJS keys

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

---

## 7. VERCEL DEPLOYMENT

```bash
# Option A — Vercel CLI
npm install -g vercel
vercel --prod

# Option B — GitHub
# 1. Push project to GitHub
# 2. Import repo at vercel.com/new
# 3. Add env vars in Vercel dashboard → Settings → Environment Variables
```

**Env vars to add in Vercel:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_CONTACT_EMAIL`
- `VITE_WHATSAPP_LINK`
- `VITE_RESUME_URL`

---

## 8. ADDING CONTENT WITHOUT REDEPLOYING

Once live, update content directly in the Supabase dashboard:
- **New project** → insert row in `projects` table
- **New certificate** → insert row in `certificates` table  
- **Update bio** → edit row in `profile` table
- **Add niche** → insert row in `niches` table

All changes reflect instantly — no redeployment needed ✨
