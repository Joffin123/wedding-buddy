-- ============================================================================
--  Wedding Buddy — Supabase schema
--  Run once in the Supabase SQL Editor (Project → SQL → New query → Run).
--  Re-runnable: drops and recreates public tables (seed data is preserved
--  only if you re-run `seed.sql` afterwards).
-- ============================================================================

-- ---------- 1. extensions ----------
create extension if not exists "pgcrypto";   -- for gen_random_uuid()

-- ---------- 2. venues ----------
drop table if exists public.venues cascade;
create table public.venues (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  location      text not null,
  region        text not null,            -- Kochi, Kumarakom, Munnar, ...
  type          text not null,            -- Palace, Resort, Beachfront, ...
  capacity_min  int  not null,
  capacity_max  int  not null,
  price_from    int  not null,            -- INR rupees (integer, no paise)
  tagline       text not null,
  highlights    text[] not null default '{}',
  gradient      text not null,            -- tailwind gradient classes for fallback art
  featured      boolean not null default false,
  image_path    text,                     -- "venues/bolgatty.jpg" inside the `images` bucket
  created_at    timestamptz not null default now()
);
create index venues_region_idx on public.venues (region);
create index venues_type_idx   on public.venues (type);
create index venues_price_idx  on public.venues (price_from);

-- ---------- 2b. venue_halls ----------
-- Each venue can offer multiple halls/tiers (e.g. Platinum/Gold/Silver) with
-- their own capacity and pricing. A venue with no rows here falls back to
-- its own price_from/capacity_min/capacity_max as a single implied hall.
drop table if exists public.venue_halls cascade;
create table public.venue_halls (
  id          uuid primary key default gen_random_uuid(),
  venue_id    uuid not null references public.venues(id) on delete cascade,
  name        text not null,               -- "Platinum Hall", "Sea View Ballroom", ...
  capacity    int  not null,               -- max guests for this hall
  price_type  text not null check (price_type in ('flat','per_pax')) default 'flat',
  price       int  not null,               -- flat rate, or per-person rate if price_type = 'per_pax'
  min_pax     int,                         -- minimum guest count for per_pax pricing
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);
create index venue_halls_venue_id_idx on public.venue_halls (venue_id);

-- ---------- 3. vendors ----------
drop table if exists public.vendors cascade;
create table public.vendors (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  category     text not null check (category in ('Photographers','Caterers','Decorators','Makeup Artists')),
  name         text not null,
  tagline      text not null,
  location     text not null,
  price_from   int  not null,
  price_unit   text not null,             -- "per wedding", "per plate", ...
  rating       numeric(2,1) not null default 0,
  reviews      int  not null default 0,
  specialties  text[] not null default '{}',
  gradient     text not null,
  initials     text not null,
  verified     boolean not null default false,
  featured     boolean not null default false,
  image_path   text,
  created_at   timestamptz not null default now()
);
create index vendors_category_idx on public.vendors (category);
create index vendors_price_idx    on public.vendors (price_from);

-- ---------- 4. gallery (for the chatbot "inspiration" tool) ----------
drop table if exists public.gallery cascade;
create table public.gallery (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  caption     text,
  tags        text[] not null default '{}', -- ["mandap","backwater","candid"]
  image_path  text not null,                -- required
  created_at  timestamptz not null default now()
);
create index gallery_tags_idx on public.gallery using gin (tags);

-- ============================================================================
--  Row-Level Security
--  The anon key should be able to READ everything, but never WRITE.
--  Admin writes happen through Supabase Studio with the service_role.
-- ============================================================================

alter table public.venues      enable row level security;
alter table public.venue_halls enable row level security;
alter table public.vendors     enable row level security;
alter table public.gallery     enable row level security;

drop policy if exists "public read venues"      on public.venues;
drop policy if exists "public read venue_halls" on public.venue_halls;
drop policy if exists "public read vendors"     on public.vendors;
drop policy if exists "public read gallery"     on public.gallery;

create policy "public read venues"      on public.venues      for select using (true);
create policy "public read venue_halls" on public.venue_halls for select using (true);
create policy "public read vendors"     on public.vendors     for select using (true);
create policy "public read gallery"     on public.gallery     for select using (true);

-- ============================================================================
--  Storage bucket
--  Create a single public bucket called `images` with sub-folders:
--    images/venues/...    (1600x1200 JPEG recommended)
--    images/vendors/...
--    images/gallery/...
--  Buckets can't be created via SQL on managed Supabase in every project,
--  so the easiest path is Studio → Storage → New bucket → name: images,
--  public: yes. This block is a fallback for CLI-managed projects.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public read images" on storage.objects;
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'images');
