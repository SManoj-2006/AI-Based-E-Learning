import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { mockCourses } from '@/data/mockData';
import { AIChatAssistant } from '@/components/AIChatAssistant';
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
  ArrowLeft,
  MessageCircle,
  StickyNote,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const LessonPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);
  
  if (!course || course.lessons.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No lessons available for this course</p>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const completedCount = course.lessons.filter(l => l.completed).length;
  const progress = (completedCount / course.lessons.length) * 100;

  const lessonIcons = {
    video: Play,
    text: FileText,
    quiz: HelpCircle,
    interactive: Beaker,
  };

  const LessonIcon = lessonIcons[currentLesson?.type || 'video'];

  return (
    <div className="flex h-screen bg-background">
      {/* Lessons Sidebar */}
      <aside className={cn(
        "border-r bg-card transition-all duration-300 flex flex-col",
        showSidebar ? "w-80" : "w-0 overflow-hidden"
      )}>
        <div className="p-4 border-b">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/course/${courseId}`)} className="mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <h3 className="font-display font-semibold line-clamp-2">{course.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={progress} className="h-2 flex-1" />
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {course.lessons.map((lesson, index) => {
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
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">{currentLesson?.type}</Badge>
                  <span className="text-sm text-muted-foreground">{currentLesson?.duration}</span>
                </div>
                <h1 className="font-display font-semibold">{currentLesson?.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={showNotes ? "default" : "outline"} 
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
              >
                <StickyNote className="h-4 w-4 mr-2" />
                Notes
              </Button>
              <Button 
                variant={showChat ? "default" : "outline"} 
                size="sm"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Tutor
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Lesson Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              {currentLesson?.type === 'video' && (
                <div className="aspect-video bg-foreground/5 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
                  <img 
                    src={course.thumbnail} 
                    alt={currentLesson.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
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
                    <div className="text-muted-foreground leading-relaxed space-y-4">
                      <p>
                        This is where the lesson content would be displayed. The content adapts to your learning style and pace, 
                        providing explanations that match your current understanding level.
                      </p>
                      <p>
                        The AI continuously monitors your progress and adjusts the difficulty and depth of explanations 
                        to ensure optimal learning outcomes.
                      </p>
                      <h3 className="text-foreground font-semibold text-lg mt-6 mb-3">Key Concepts</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Understanding fundamental principles</li>
                        <li>Applying theory to practical scenarios</li>
                        <li>Building on previous knowledge</li>
                        <li>Connecting with real-world applications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentLesson?.type === 'quiz' && (
                <div className="bg-card rounded-2xl border p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-xp/10 flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-xp" />
                  </div>
                  <h2 className="font-display text-xl font-semibold mb-2">Knowledge Check</h2>
                  <p className="text-muted-foreground mb-6">Test your understanding of the concepts covered.</p>
                  <Button variant="gradient" size="lg" onClick={() => navigate('/quizzes')}>
                    Start Quiz
                  </Button>
                </div>
              )}

              {currentLesson?.type === 'interactive' && (
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl border p-8 text-center">
                  <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4">
                    <Beaker className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h2 className="font-display text-xl font-semibold mb-2">Interactive Lab</h2>
                  <p className="text-muted-foreground mb-6">Apply what you've learned in a hands-on exercise.</p>
                  <Button variant="accent" size="lg">Launch Lab</Button>
                </div>
              )}

              {/* XP Reward */}
              <div className="mt-6 flex items-center justify-center gap-2 p-4 rounded-xl bg-achievement/10 border border-achievement/20">
                <Zap className="h-5 w-5 text-achievement" />
                <span className="font-medium text-achievement">
                  Complete this lesson to earn {currentLesson?.xpReward} XP
                </span>
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          {showNotes && (
            <div className="w-80 border-l bg-card p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Notes
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setShowNotes(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes here..."
                className="flex-1 resize-none"
              />
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <footer className="border-t p-4 bg-card">
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
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>

            <Button 
              variant="outline"
              onClick={() => setCurrentLessonIndex(Math.min(course.lessons.length - 1, currentLessonIndex + 1))}
              disabled={currentLessonIndex === course.lessons.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
      </div>

      {/* AI Chat */}
      <AIChatAssistant isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default LessonPage;
