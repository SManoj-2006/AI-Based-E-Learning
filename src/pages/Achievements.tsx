import { Sidebar } from '@/components/Sidebar';
import { AchievementBadge } from '@/components/AchievementBadge';
import { mockUser } from '@/data/mockData';
import { Badge } from '@/types';
import { Trophy, Lock } from 'lucide-react';

const allBadges: Badge[] = [
  { id: '1', name: 'Quick Learner', description: 'Complete 5 lessons in one day', icon: '⚡', earnedAt: new Date(), rarity: 'common' },
  { id: '2', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earnedAt: new Date(), rarity: 'rare' },
  { id: '3', name: 'Code Master', description: 'Complete all programming courses', icon: '💻', earnedAt: new Date(), rarity: 'epic' },
  { id: '4', name: 'Knowledge Seeker', description: 'Enroll in 10 courses', icon: '📚', earnedAt: new Date(), rarity: 'common' },
  { id: '5', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: '💯', earnedAt: new Date(), rarity: 'rare' },
  { id: '6', name: 'Night Owl', description: 'Study after midnight', icon: '🦉', earnedAt: new Date(), rarity: 'common' },
  { id: '7', name: 'Early Bird', description: 'Study before 6 AM', icon: '🌅', earnedAt: new Date(), rarity: 'common' },
  { id: '8', name: 'Marathon Runner', description: 'Study for 5 hours in one day', icon: '🏃', earnedAt: new Date(), rarity: 'epic' },
  { id: '9', name: 'Legend', description: 'Reach Level 50', icon: '👑', earnedAt: new Date(), rarity: 'legendary' },
  { id: '10', name: 'First Steps', description: 'Complete your first lesson', icon: '👣', earnedAt: new Date(), rarity: 'common' },
  { id: '11', name: 'Social Butterfly', description: 'Join a study group', icon: '🦋', earnedAt: new Date(), rarity: 'rare' },
  { id: '12', name: 'Mentor', description: 'Help 10 other learners', icon: '🎓', earnedAt: new Date(), rarity: 'epic' },
];

const Achievements = () => {
  const earnedBadgeIds = mockUser.badges.map(b => b.id);
  const earnedBadges = allBadges.filter(b => earnedBadgeIds.includes(b.id));
  const lockedBadges = allBadges.filter(b => !earnedBadgeIds.includes(b.id));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Trophy className="h-8 w-8 text-achievement" />
              Achievements
            </h1>
            <p className="text-muted-foreground mt-1">
              {earnedBadges.length} of {allBadges.length} badges earned
            </p>
          </div>

          {/* Earned Badges */}
          <section className="bg-card rounded-xl border p-6">
            <h2 className="text-xl font-display font-semibold mb-6">Your Badges</h2>
            {earnedBadges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {earnedBadges.map((badge) => (
                  <AchievementBadge key={badge.id} badge={badge} size="md" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Complete lessons to earn your first badge!</p>
              </div>
            )}
          </section>

          {/* Locked Badges */}
          <section className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-display font-semibold">Badges to Unlock</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {lockedBadges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center gap-2 opacity-50 grayscale">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-2xl">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Achievements;
