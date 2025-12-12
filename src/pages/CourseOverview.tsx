import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCourses, mockUser } from '@/data/mockData';
import { 
  Clock, 
  Users, 
  Star, 
  Zap, 
  Play, 
  BookOpen, 
  CheckCircle2, 
  Award,
  BarChart3,
  User,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CourseOverview = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);
  const isEnrolled = mockUser.enrolledCourses.includes(courseId || '');

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;

  const learningOutcomes = [
    'Understand core concepts and fundamentals',
    'Apply knowledge to real-world projects',
    'Build a portfolio-worthy project',
    'Prepare for industry certifications',
    'Gain hands-on practical experience',
  ];

  const levelColors = {
    beginner: 'bg-accent/10 text-accent border-accent/20',
    intermediate: 'bg-xp/10 text-xp border-xp/20',
    advanced: 'bg-streak/10 text-streak border-streak/20',
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 h-80">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          </div>
          
          <div className="relative pt-12 pb-8 px-8">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span>Courses</span>
                <ChevronRight className="h-4 w-4" />
                <span>{course.category}</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{course.title}</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Course Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={cn("capitalize", levelColors[course.level])}>
                      {course.level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{course.category}</span>
                  </div>

                  <h1 className="text-4xl font-display font-bold mb-4">{course.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-achievement fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-muted-foreground">({course.enrolledCount.toLocaleString()} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <span>{course.enrolledCount.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">Course Instructor</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enrollment Card */}
                <div className="lg:w-80">
                  <div className="bg-card rounded-2xl border p-6 shadow-xl sticky top-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-achievement">
                        <Zap className="h-5 w-5" />
                        <span className="font-semibold">{course.xpReward} XP</span>
                      </div>
                      <Badge variant="accent" className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        AI Recommended
                      </Badge>
                    </div>

                    {isEnrolled ? (
                      <>
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Your progress</span>
                            <span className="font-medium">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        <Button 
                          variant="hero" 
                          size="xl" 
                          className="w-full mb-3"
                          onClick={() => navigate(`/lesson/${courseId}`)}
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Continue Learning
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="hero" 
                        size="xl" 
                        className="w-full mb-3"
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        Start Course
                      </Button>
                    )}

                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Free • Certificate included
                    </p>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>{course.lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>AI tutor support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-8 pb-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Learning Outcomes */}
            <section className="bg-card rounded-2xl border p-6">
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Learning Path */}
            <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg gradient-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-display font-semibold">AI-Generated Learning Path</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Based on your learning history and goals, we recommend completing this course along with:
              </p>
              <div className="flex flex-wrap gap-3">
                {mockCourses.filter(c => c.id !== courseId).slice(0, 3).map((rec) => (
                  <div key={rec.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border">
                    <img src={rec.thumbnail} alt={rec.title} className="w-8 h-8 rounded object-cover" />
                    <span className="text-sm font-medium">{rec.title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus */}
            <section className="bg-card rounded-2xl border p-6">
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Syllabus
              </h2>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-colors",
                      lesson.completed ? "bg-accent/10" : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                      lesson.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {lesson.completed ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">{lesson.type} • {lesson.duration}</p>
                    </div>
                    <div className="flex items-center gap-2 text-achievement">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm font-medium">{lesson.xpReward} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-card rounded-2xl border p-6">
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-achievement" />
                Student Reviews
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Sarah M.', rating: 5, comment: 'Excellent course! The AI tutor really helped me understand complex concepts.' },
                  { name: 'John D.', rating: 5, comment: 'Very well structured. I loved the interactive exercises.' },
                  { name: 'Emily R.', rating: 4, comment: 'Great content, would recommend to anyone starting out.' },
                ].map((review, index) => (
                  <div key={index} className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">{review.name[0]}</span>
                      </div>
                      <span className="font-medium">{review.name}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-achievement fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseOverview;
