-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create owner-only SELECT policy for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Create a secure view for leaderboard with only necessary fields
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT 
  id,
  user_id,
  full_name,
  avatar_url,
  xp,
  streak,
  level
FROM public.profiles;

-- Grant access to the view for authenticated users
GRANT SELECT ON public.leaderboard_view TO authenticated;
GRANT SELECT ON public.leaderboard_view TO anon;