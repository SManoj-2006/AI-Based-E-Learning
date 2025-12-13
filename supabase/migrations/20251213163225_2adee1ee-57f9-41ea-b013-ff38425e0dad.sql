-- Recreate the view with SECURITY INVOKER (default, but explicit for clarity)
DROP VIEW IF EXISTS public.leaderboard_view;

CREATE VIEW public.leaderboard_view 
WITH (security_invoker = true) AS
SELECT 
  id,
  user_id,
  full_name,
  avatar_url,
  xp,
  streak,
  level
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.leaderboard_view TO authenticated;
GRANT SELECT ON public.leaderboard_view TO anon;