create table if not exists public.waitlist_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  email_normalized text generated always as (lower(email)) stored,
  business_type text not null,
  current_system text not null,
  setup_interest text not null,
  source text not null default 'landing_page',
  status text not null default 'requested',
  user_agent text,
  referrer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint waitlist_submissions_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint waitlist_submissions_status_check check (status in ('requested', 'reviewing', 'invited', 'closed'))
);

create unique index if not exists waitlist_submissions_email_normalized_key
  on public.waitlist_submissions (email_normalized);

create index if not exists waitlist_submissions_created_at_idx
  on public.waitlist_submissions (created_at desc);

create index if not exists waitlist_submissions_setup_interest_idx
  on public.waitlist_submissions (setup_interest);

alter table public.waitlist_submissions enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_waitlist_submissions_updated_at on public.waitlist_submissions;

create trigger set_waitlist_submissions_updated_at
before update on public.waitlist_submissions
for each row
execute function public.set_updated_at();
