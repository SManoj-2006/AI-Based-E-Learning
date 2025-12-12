import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  variant?: 'default' | 'xp' | 'streak' | 'achievement';
  className?: string;
}

export function StatCard({ icon, label, value, trend, trendUp, variant = 'default', className }: StatCardProps) {
  const variants = {
    default: 'bg-card',
    xp: 'bg-gradient-to-br from-xp/10 to-xp/5 border-xp/20',
    streak: 'bg-gradient-to-br from-streak/10 to-streak/5 border-streak/20',
    achievement: 'bg-gradient-to-br from-achievement/10 to-achievement/5 border-achievement/20',
  };

  const iconVariants = {
    default: 'text-primary',
    xp: 'text-xp',
    streak: 'text-streak',
    achievement: 'text-achievement',
  };

  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
      variants[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className={cn("p-2 rounded-lg bg-background/50", iconVariants[variant])}>
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trendUp ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold font-display">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
