-- Drop the view (views can't have RLS)
DROP VIEW IF EXISTS public.leaderboard_view;

-- Create a security definer function to safely return leaderboard data
-- Only returns limited fields needed for leaderboard
CREATE OR REPLACE FUNCTION public.get_leaderboard_profiles()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  full_name text,
  avatar_url text,
  xp integer,
  streak integer,
  level integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    user_id,
    full_name,
    avatar_url,
    COALESCE(xp, 0) as xp,
    COALESCE(streak, 0) as streak,
    COALESCE(level, 1) as level
  FROM public.profiles
  ORDER BY xp DESC NULLS LAST
  LIMIT 50;
$$;