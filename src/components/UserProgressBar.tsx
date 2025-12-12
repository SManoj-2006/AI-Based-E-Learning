import { User } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flame, Zap, Trophy, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserProgressBarProps {
  user: User;
}

export function UserProgressBar({ user }: UserProgressBarProps) {
  const progressPercentage = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Avatar className="h-14 w-14 border-2 border-primary ring-2 ring-primary/20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold">{user.name}</h3>
            <Badge variant="epic" className="text-xs">Level {user.level}</Badge>
          </div>
          
          {/* XP Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {user.xp.toLocaleString()} / {user.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-streak/10 text-streak">
            <Flame className="w-4 h-4" />
            <span className="font-semibold">{user.streak}</span>
            <span className="text-xs opacity-80">day streak</span>
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-achievement/10 text-achievement">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">{user.badges.length}</span>
            <span className="text-xs opacity-80">badges</span>
          </div>
        </div>
      </div>
    </div>
  );
}
