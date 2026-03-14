
-- Create instagram_accounts table
CREATE TABLE public.instagram_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  instagram_user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  access_token TEXT NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, instagram_user_id)
);

-- Enable RLS
ALTER TABLE public.instagram_accounts ENABLE ROW LEVEL SECURITY;

-- Users can only see/manage their own accounts
CREATE POLICY "Users can view their own instagram accounts"
  ON public.instagram_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own instagram accounts"
  ON public.instagram_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own instagram accounts"
  ON public.instagram_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own instagram accounts"
  ON public.instagram_accounts FOR DELETE
  USING (auth.uid() = user_id);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  instagram_post_id TEXT NOT NULL,
  caption TEXT,
  media_url TEXT,
  media_type TEXT,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, instagram_post_id)
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Users can only see/manage their own posts
CREATE POLICY "Users can view their own posts"
  ON public.posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = user_id);

-- Create post_analysis table
CREATE TABLE public.post_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  engagement_rate NUMERIC,
  hook_score INTEGER,
  caption_score INTEGER,
  ai_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.post_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own post analysis"
  ON public.post_analysis FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.posts WHERE posts.id = post_analysis.post_id AND posts.user_id = auth.uid()));

CREATE POLICY "Users can insert their own post analysis"
  ON public.post_analysis FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.posts WHERE posts.id = post_analysis.post_id AND posts.user_id = auth.uid()));

-- Create ai_suggestions table
CREATE TABLE public.ai_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hooks JSONB,
  captions JSONB,
  hashtags JSONB,
  reel_ideas JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own suggestions"
  ON public.ai_suggestions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own suggestions"
  ON public.ai_suggestions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
