import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Award, Medal, Crown } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Skeleton } from "@/components/ui/skeleton";

function LeaderboardSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/30">
        <Crown className="h-5 w-5 text-white" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-lg shadow-gray-400/30">
        <Medal className="h-5 w-5 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 shadow-lg shadow-amber-600/30">
        <Medal className="h-5 w-5 text-white" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground font-bold">
      {rank}
    </div>
  );
}

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

function LeaderboardList({ 
  data, 
  isLoading, 
  valueKey, 
  valueLabel,
  icon: Icon 
}: { 
  data: LeaderboardEntry[] | undefined;
  isLoading: boolean;
  valueKey: 'xp' | 'streak' | 'badge_count';
  valueLabel: string;
  icon: typeof Trophy;
}) {
  if (isLoading) return <LeaderboardSkeleton />;

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No learners yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((entry, index) => (
        <div
          key={entry.id}
          className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
            index === 0
              ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20"
              : index === 1
              ? "bg-gradient-to-r from-gray-300/10 to-gray-400/10 border border-gray-400/20"
              : index === 2
              ? "bg-gradient-to-r from-amber-600/10 to-amber-700/10 border border-amber-600/20"
              : "bg-muted/30 border border-transparent"
          }`}
        >
          <RankBadge rank={index + 1} />
          
          <Avatar className="h-12 w-12 border-2 border-background shadow-md">
            <AvatarImage src={entry.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {entry.full_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{entry.full_name || "Anonymous Learner"}</p>
            <p className="text-sm text-muted-foreground">Level {entry.level}</p>
          </div>
          
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
            <Icon className="h-4 w-4" />
            <span className="font-bold">{entry[valueKey].toLocaleString()}</span>
            <span className="text-muted-foreground text-xs">{valueLabel}</span>
          </Badge>
        </div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("xp");
  const { xpLeaderboard, streakLeaderboard, badgeLeaderboard, isLoading } = useLeaderboard();

  return (
    <>
      <Helmet>
        <title>Leaderboard | EduPlatform</title>
        <meta name="description" content="See top learners ranked by XP, streaks, and achievements" />
      </Helmet>
      
      <div className="min-h-screen flex bg-background">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                Leaderboard
              </h1>
              <p className="text-muted-foreground">
                See how you stack up against other learners
              </p>
            </div>

            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                    <TabsTrigger value="xp" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Trophy className="h-4 w-4" />
                      <span className="hidden sm:inline">XP Leaders</span>
                      <span className="sm:hidden">XP</span>
                    </TabsTrigger>
                    <TabsTrigger value="streak" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Flame className="h-4 w-4" />
                      <span className="hidden sm:inline">Top Streaks</span>
                      <span className="sm:hidden">Streaks</span>
                    </TabsTrigger>
                    <TabsTrigger value="badges" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Award className="h-4 w-4" />
                      <span className="hidden sm:inline">Most Badges</span>
                      <span className="sm:hidden">Badges</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent className="pt-6">
                {activeTab === "xp" && (
                  <LeaderboardList
                    data={xpLeaderboard}
                    isLoading={isLoading}
                    valueKey="xp"
                    valueLabel="XP"
                    icon={Trophy}
                  />
                )}
                {activeTab === "streak" && (
                  <LeaderboardList
                    data={streakLeaderboard}
                    isLoading={isLoading}
                    valueKey="streak"
                    valueLabel="days"
                    icon={Flame}
                  />
                )}
                {activeTab === "badges" && (
                  <LeaderboardList
                    data={badgeLeaderboard}
                    isLoading={isLoading}
                    valueKey="badge_count"
                    valueLabel="badges"
                    icon={Award}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
