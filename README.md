# Creordic App

A minimalist application to evaluate the meaningfulness of ideas and actions using philosophical factors.

## Features

- **Creordic Compass**: Compare and evaluate ideas based on five philosophical factors
- **Chatbot**: Discuss philosophical concepts and ideas with AI
- **News**: Stay informed about meaningful thinking (Coming Soon)
- **Community**: Connect with like-minded thinkers (Coming Soon)

## Technology Stack

- **React Native**: Mobile app framework
- **TypeScript**: Type safety and better development experience
- **Supabase**: Backend as a Service (BaaS) for authentication, database, and real-time features
- **OpenAI**: AI-powered chat and analysis features

## Setup

### Prerequisites

1. Node.js and npm installed
2. Supabase account (https://app.supabase.com)
3. OpenAI API key (https://platform.openai.com)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/creordic.git
cd creordic
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new project at https://app.supabase.com

2. Set up the database tables:

```sql
-- Users table (created automatically by Supabase Auth)
create table public.users (
  id uuid references auth.users on delete cascade,
  name text not null,
  email text not null,
  picture text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Evaluations table
create table public.evaluations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  actions integer not null,
  truth_alignment integer not null,
  meaningful_impact integer not null,
  transmissibility integer not null,
  replicability integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  content text not null,
  type text not null check (type in ('user', 'bot')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Rate limits table
create table public.rate_limits (
  user_id uuid references public.users on delete cascade primary key,
  count integer default 0,
  last_request timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.evaluations enable row level security;
alter table public.messages enable row level security;
alter table public.rate_limits enable row level security;

-- Create policies
create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

create policy "Users can view their own evaluations" on public.evaluations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own evaluations" on public.evaluations
  for insert with check (auth.uid() = user_id);

create policy "Users can view their own messages" on public.messages
  for select using (auth.uid() = user_id);

create policy "Users can insert their own messages" on public.messages
  for insert with check (auth.uid() = user_id);

create policy "Users can view their own rate limits" on public.rate_limits
  for select using (auth.uid() = user_id);

create policy "Service role can update rate limits" on public.rate_limits
  for all using (auth.role() = 'service_role');
```

3. Set up Edge Functions:

Install the Supabase CLI:

```bash
npm install -g supabase
```

Login to Supabase:

```bash
supabase login
```

Link your project:

```bash
supabase link --project-ref your-project-ref
```

Set up environment variables:

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key
```

Deploy the functions:

```bash
supabase functions deploy chat-completion
supabase functions deploy philosophical-analysis
```

### Running the App

1. Start the development server:

```bash
npm start
```

2. Run on iOS:

```bash
npm run ios
```

3. Run on Android:

```bash
npm run android
```

## Project Structure

- `/components` - React Native components
  - `/auth` - Authentication components
  - `/compass` - Creordic Compass feature
  - `/chat` - Chatbot feature
  - `/news` - News feature
  - `/community` - Community feature
- `/services` - Backend services
  - `/api` - API configuration
  - `/auth` - Authentication service
  - `/chat` - Chat service
  - `/compass` - Compass service
- `/supabase` - Supabase Edge Functions
  - `/functions` - Serverless functions
- `/navigation` - Navigation configuration

## Features

### Authentication

- Email/password authentication
- User profiles with avatars
- Secure session management

### Creordic Compass

- Evaluate ideas using five philosophical factors
- Save and compare evaluations
- Real-time updates

### Chatbot

- AI-powered philosophical discussions
- Message history
- Rate limiting for API usage

### Coming Soon

- News feed for meaningful thinking
- Community features for idea sharing
- Advanced analytics and insights
