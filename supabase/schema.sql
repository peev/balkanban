-- Create a table for tickets
create table tickets (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  position integer not null,
  column_id text not null
);

-- Enable Row Level Security
alter table tickets enable row level security;

-- Create policies
create policy "Users can view their own tickets"
  on tickets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tickets"
  on tickets for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tickets"
  on tickets for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tickets"
  on tickets for delete
  using (auth.uid() = user_id);

-- Create a function to update the updated_at column
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update the updated_at column
create trigger update_tickets_updated_at
  before update on tickets
  for each row
  execute function update_updated_at_column(); 