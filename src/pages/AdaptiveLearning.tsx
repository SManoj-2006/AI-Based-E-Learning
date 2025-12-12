import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockUser, mockCourses, mockLearningPaths } from '@/data/mockData';
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdaptiveLearning = () => {
  const skillGraph = [
    { skill: 'Python Programming', level: 85, category: 'Technical' },
    { skill: 'Machine Learning', level: 72, category: 'AI' },
    { skill: 'Data Analysis', level: 68, category: 'Data Science' },
    { skill: 'React Development', level: 55, category: 'Web Dev' },
    { skill: 'Cloud Computing', level: 45, category: 'Infrastructure' },
    { skill: 'UX Design', level: 30, category: 'Design' },
  ];

  const strengths = ['Python Programming', 'Machine Learning', 'Data Analysis'];
  const weaknesses = ['Cloud Computing', 'UX Design'];

  const recommendedSchedule = [
    { day: 'Monday', topic: 'Neural Networks Deep Dive', duration: '45 min', type: 'video' },
    { day: 'Tuesday', topic: 'Practice: Build a Model', duration: '60 min', type: 'interactive' },
    { day: 'Wednesday', topic: 'Cloud Deployment Basics', duration: '30 min', type: 'text' },
    { day: 'Thursday', topic: 'Quiz: ML Concepts', duration: '20 min', type: 'quiz' },
    { day: 'Friday', topic: 'Review & Revision', duration: '40 min', type: 'review' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                Adaptive Learning
              </h1>
              <p className="text-muted-foreground mt-1">
                AI-powered personalization tailored to your learning style
              </p>
            </div>
            <Badge variant="accent" className="text-sm px-4 py-1.5">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Optimized
            </Badge>
          </div>

          {/* Recommended Learning Path */}
          <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl border border-primary/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg gradient-primary">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold">Your AI Learning Path</h2>
                <p className="text-sm text-muted-foreground">Based on your goals and performance</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {mockLearningPaths[0] && mockCourses.slice(0, 4).map((course, index) => (
                <div 
                  key={course.id}
                  className={cn(
                    "relative bg-card rounded-xl border p-4 transition-all hover:shadow-lg",
                    index === 0 && "ring-2 ring-primary"
                  )}
                >
                  {index === 0 && (
                    <Badge variant="default" className="absolute -top-2 -right-2 text-xs">
                      Current
                    </Badge>
                  )}
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-20 rounded-lg object-cover mb-3"
                  />
                  <h3 className="font-medium text-sm line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </div>
                  {index < 3 && (
                    <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hidden lg:block" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skill Graph */}
          <section className="bg-card rounded-2xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold">Skill Proficiency</h2>
            </div>
            
            <div className="space-y-4">
              {skillGraph.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {skill.category}
                      </span>
                    </div>
                    <span className={cn(
                      "font-semibold",
                      skill.level >= 70 ? "text-accent" : 
                      skill.level >= 50 ? "text-xp" : "text-muted-foreground"
                    )}>
                      {skill.level}%
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </section>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-card rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-display font-semibold">Strengths</h2>
              </div>
              <ul className="space-y-3">
                {strengths.map((strength) => (
                  <li key={strength} className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-card rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-streak/10">
                  <Lightbulb className="h-5 w-5 text-streak" />
                </div>
                <h2 className="text-xl font-display font-semibold">Areas to Improve</h2>
              </div>
              <ul className="space-y-3">
                {weaknesses.map((weakness) => (
                  <li key={weakness} className="flex items-center justify-between p-3 rounded-lg bg-streak/5">
                    <span>{weakness}</span>
                    <Button variant="outline" size="sm">
                      Practice
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Personalized Schedule */}
          <section className="bg-card rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-display font-semibold">AI-Generated Study Schedule</h2>
              </div>
              <Button variant="outline" size="sm">
                Customize
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {recommendedSchedule.map((item) => (
                <div 
                  key={item.day}
                  className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <p className="text-sm font-semibold text-primary mb-2">{item.day}</p>
                  <p className="font-medium text-sm mb-2">{item.topic}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.duration}
                  </div>
                  <Badge variant="secondary" className="mt-2 capitalize text-xs">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          {/* Revision Suggestions */}
          <section className="bg-gradient-to-r from-achievement/10 to-streak/10 rounded-2xl border border-achievement/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-5 w-5 text-achievement" />
              <h2 className="text-xl font-display font-semibold">Topics to Revise</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Based on your quiz performance and time since last review
            </p>
            <div className="flex flex-wrap gap-3">
              {['Gradient Descent', 'Cross Validation', 'RESTful APIs', 'SQL Joins'].map((topic) => (
                <Button key={topic} variant="outline" size="sm" className="bg-background/50">
                  {topic}
                </Button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdaptiveLearning;
