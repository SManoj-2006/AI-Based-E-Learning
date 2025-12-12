import { Badge } from '@/types';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({ badge, size = 'md' }: AchievementBadgeProps) {
  const sizes = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const rarityColors = {
    common: 'from-secondary to-muted border-border',
    rare: 'from-xp/20 to-xp/5 border-xp/30',
    epic: 'from-primary/20 to-primary/5 border-primary/30',
    legendary: 'from-achievement/30 to-streak/20 border-achievement/50',
  };

  const rarityGlow = {
    common: '',
    rare: 'shadow-[0_0_20px_rgba(14,165,233,0.3)]',
    epic: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    legendary: 'shadow-[0_0_30px_rgba(245,158,11,0.4)]',
  };

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div 
        className={cn(
          "rounded-2xl bg-gradient-to-br flex items-center justify-center border transition-all duration-300 hover:scale-110",
          sizes[size],
          rarityColors[badge.rarity],
          rarityGlow[badge.rarity]
        )}
      >
        <span className="drop-shadow-lg">{badge.icon}</span>
      </div>
      <div className="text-center">
        <p className={cn(
          "font-medium",
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
        )}>{badge.name}</p>
        {size !== 'sm' && (
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        )}
        <BadgeUI variant={badge.rarity} className="mt-1 capitalize text-[10px]">
          {badge.rarity}
        </BadgeUI>
      </div>
    </div>
  );
}
