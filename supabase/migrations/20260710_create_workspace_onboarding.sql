create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  occupation_template_id text not null,
  setup_mode text not null,
  status text not null default 'onboarding',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workspaces_name_length check (char_length(trim(name)) >= 2),
  constraint workspaces_status_check check (status in ('onboarding', 'active', 'archived'))
);

create index if not exists workspaces_owner_user_id_idx
  on public.workspaces (owner_user_id);

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id),
  constraint workspace_members_role_check check (role in ('owner', 'admin', 'member'))
);

create index if not exists workspace_members_user_id_idx
  on public.workspace_members (user_id);

create table if not exists public.setup_requests (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  requester_user_id uuid not null references auth.users(id) on delete cascade,
  occupation_template_id text not null,
  setup_mode text not null,
  current_tools text,
  import_needs text,
  notes text,
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint setup_requests_status_check check (status in ('requested', 'reviewing', 'in_setup', 'ready', 'closed'))
);

create index if not exists setup_requests_workspace_id_idx
  on public.setup_requests (workspace_id);

create index if not exists setup_requests_requester_user_id_idx
  on public.setup_requests (requester_user_id);

create index if not exists setup_requests_status_created_at_idx
  on public.setup_requests (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_workspaces_updated_at on public.workspaces;
create trigger set_workspaces_updated_at
before update on public.workspaces
for each row
execute function public.set_updated_at();

drop trigger if exists set_setup_requests_updated_at on public.setup_requests;
create trigger set_setup_requests_updated_at
before update on public.setup_requests
for each row
execute function public.set_updated_at();

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.setup_requests enable row level security;

drop policy if exists "workspace members can read workspaces" on public.workspaces;
create policy "workspace members can read workspaces"
on public.workspaces
for select
to authenticated
using (
  exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = workspaces.id
      and wm.user_id = auth.uid()
  )
);

drop policy if exists "workspace members can read memberships" on public.workspace_members;
create policy "workspace members can read memberships"
on public.workspace_members
for select
to authenticated
using (
  exists (
    select 1
    from public.workspace_members viewer
    where viewer.workspace_id = workspace_members.workspace_id
      and viewer.user_id = auth.uid()
  )
);

drop policy if exists "workspace members can read setup requests" on public.setup_requests;
create policy "workspace members can read setup requests"
on public.setup_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = setup_requests.workspace_id
      and wm.user_id = auth.uid()
  )
);
