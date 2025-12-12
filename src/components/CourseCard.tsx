import { Course } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  enrolled?: boolean;
}

export function CourseCard({ course, onClick, enrolled = false }: CourseCardProps) {
  const levelColors = {
    beginner: 'bg-accent/10 text-accent border-accent/20',
    intermediate: 'bg-xp/10 text-xp border-xp/20',
    advanced: 'bg-streak/10 text-streak border-streak/20',
  };

  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;

  return (
    <div 
      className="group relative bg-card rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* XP Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-achievement/90 text-achievement-foreground text-xs font-semibold">
          <Zap className="w-3 h-3" />
          {course.xpReward} XP
        </div>

        {/* Level Badge */}
        <Badge className={cn("absolute top-3 left-3 capitalize", levelColors[course.level])}>
          {course.level}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{course.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>

        <h3 className="font-display font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {course.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          {course.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Progress bar for enrolled courses */}
        {enrolled && progress > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-accent">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full gradient-accent rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-achievement">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{(course.enrolledCount / 1000).toFixed(1)}k</span>
            </div>
          </div>
          <Button variant={enrolled ? "accent" : "default"} size="sm">
            {enrolled ? 'Continue' : 'Enroll'}
          </Button>
        </div>
      </div>
    </div>
  );
}
