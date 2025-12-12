import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  xp: number;
  streak: number;
  level: number;
  badge_count: number;
}

export function useLeaderboard() {
  const { data: profiles, isLoading: profilesLoading } = useQuery({
    queryKey: ["leaderboard-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, full_name, avatar_url, xp, streak, level")
        .order("xp", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
  });

  const { data: badgeCounts, isLoading: badgesLoading } = useQuery({
    queryKey: ["leaderboard-badge-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_badges")
        .select("user_id");

      if (error) throw error;

      // Count badges per user
      const counts: Record<string, number> = {};
      data.forEach((badge) => {
        counts[badge.user_id] = (counts[badge.user_id] || 0) + 1;
      });
      return counts;
    },
  });

  const isLoading = profilesLoading || badgesLoading;

  // Combine profiles with badge counts
  const combinedData: LeaderboardEntry[] | undefined = profiles?.map((profile) => ({
    ...profile,
    xp: profile.xp || 0,
    streak: profile.streak || 0,
    level: profile.level || 1,
    badge_count: badgeCounts?.[profile.user_id] || 0,
  }));

  // Sort by different metrics
  const xpLeaderboard = combinedData
    ?.slice()
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 20);

  const streakLeaderboard = combinedData
    ?.slice()
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 20);

  const badgeLeaderboard = combinedData
    ?.slice()
    .sort((a, b) => b.badge_count - a.badge_count)
    .slice(0, 20);

  return {
    xpLeaderboard,
    streakLeaderboard,
    badgeLeaderboard,
    isLoading,
  };
}
