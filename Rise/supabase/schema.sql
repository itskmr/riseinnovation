-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

create table if not exists insta_codes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  link text not null,
  description text default '',
  image text default '',
  created_at timestamptz default now()
);

alter table insta_codes enable row level security;

create policy "Public read access"
  on insta_codes for select
  using (true);

-- Create a public storage bucket for images:
-- Dashboard → Storage → New bucket → Name: "insta-images" → Public bucket: ON
