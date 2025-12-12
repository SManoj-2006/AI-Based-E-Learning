import { Lesson } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  FileText, 
  HelpCircle, 
  Beaker, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface LessonPlayerProps {
  lessons: Lesson[];
  courseTitle: string;
  onBack: () => void;
}

export function LessonPlayer({ lessons, courseTitle, onBack }: LessonPlayerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLesson = lessons[currentLessonIndex];
  const completedCount = lessons.filter(l => l.completed).length;
  const progress = (completedCount / lessons.length) * 100;

  const lessonIcons = {
    video: Play,
    text: FileText,
    quiz: HelpCircle,
    interactive: Beaker,
  };

  const LessonIcon = lessonIcons[currentLesson?.type || 'video'];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">{courseTitle}</p>
                <h1 className="font-display font-semibold">{currentLesson?.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <Progress value={progress} className="w-32 h-2" />
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {currentLesson?.type === 'video' && (
              <div className="aspect-video bg-foreground/5 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <Button size="xl" variant="hero" className="z-10 rounded-full w-20 h-20 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </div>
            )}

            {currentLesson?.type === 'text' && (
              <div className="prose prose-lg max-w-none">
                <div className="bg-card rounded-2xl border p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg gradient-primary">
                      <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-xl font-semibold m-0">Reading Material</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    This is where the lesson content would be displayed. The content adapts to your learning style and pace, 
                    providing explanations that match your current understanding level.
                  </p>
                </div>
              </div>
            )}

            {currentLesson?.type === 'quiz' && (
              <div className="bg-card rounded-2xl border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-xp/10">
                    <HelpCircle className="h-5 w-5 text-xp" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Knowledge Check</h2>
                </div>
                <p className="text-muted-foreground mb-6">Test your understanding of the concepts covered.</p>
                <Button variant="gradient" size="lg">Start Quiz</Button>
              </div>
            )}

            {currentLesson?.type === 'interactive' && (
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg gradient-accent">
                    <Beaker className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Interactive Lab</h2>
                </div>
                <p className="text-muted-foreground mb-6">Apply what you've learned in a hands-on exercise.</p>
                <Button variant="accent" size="lg">Launch Lab</Button>
              </div>
            )}

            {/* XP Reward Display */}
            <div className="mt-6 flex items-center justify-center gap-2 p-4 rounded-xl bg-achievement/10 border border-achievement/20">
              <Zap className="h-5 w-5 text-achievement" />
              <span className="font-medium text-achievement">
                Complete this lesson to earn {currentLesson?.xpReward} XP
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <footer className="border-t p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
              disabled={currentLessonIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button variant="accent">
              Mark Complete
            </Button>

            <Button 
              variant="outline"
              onClick={() => setCurrentLessonIndex(Math.min(lessons.length - 1, currentLessonIndex + 1))}
              disabled={currentLessonIndex === lessons.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
      </div>

      {/* Lessons Sidebar */}
      <aside className="w-80 border-l bg-card hidden lg:block overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-card">
          <h3 className="font-display font-semibold">Course Content</h3>
          <p className="text-sm text-muted-foreground">{completedCount} of {lessons.length} completed</p>
        </div>
        <div className="p-2">
          {lessons.map((lesson, index) => {
            const Icon = lessonIcons[lesson.type];
            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(index)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                  index === currentLessonIndex 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-secondary"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  lesson.completed 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-secondary text-muted-foreground"
                )}>
                  {lesson.completed ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-medium truncate",
                    lesson.completed && "text-muted-foreground"
                  )}>{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
