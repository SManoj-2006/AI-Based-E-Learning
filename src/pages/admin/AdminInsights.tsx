import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Users, BookOpen, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const AdminInsights = () => {
  const { data: courses } = useQuery({
    queryKey: ['courses-insights'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: enrollments } = useQuery({
    queryKey: ['enrollments-insights'],
    queryFn: async () => {
      const { data, error } = await supabase.from('enrollments').select('*, courses(title)');
      if (error) throw error;
      return data;
    },
  });

  const { data: lessonProgress } = useQuery({
    queryKey: ['lesson-progress-insights'],
    queryFn: async () => {
      const { data, error } = await supabase.from('lesson_progress').select('*');
      if (error) throw error;
      return data;
    },
  });

  // Generate AI insights based on data
  const generateInsights = () => {
    const insights = [];

    // Course performance analysis
    const avgRating = courses?.reduce((acc, c) => acc + (c.rating || 0), 0) / (courses?.length || 1);
    if (avgRating < 4) {
      insights.push({
        type: 'warning',
        title: 'Course Ratings Below Target',
        description: `Average course rating is ${avgRating.toFixed(1)}/5. Consider reviewing course content and gathering student feedback.`,
        action: 'Review Courses',
        icon: AlertTriangle,
      });
    }

    // Enrollment trends
    const lowEnrollmentCourses = courses?.filter(c => (c.enrolled_count || 0) < 10) || [];
    if (lowEnrollmentCourses.length > 0) {
      insights.push({
        type: 'insight',
        title: 'Courses Need Promotion',
        description: `${lowEnrollmentCourses.length} courses have fewer than 10 enrollments. Consider marketing campaigns or featured placement.`,
        action: 'View Courses',
        icon: Lightbulb,
      });
    }

    // Completion rate analysis
    const completedLessons = lessonProgress?.filter(l => l.completed).length || 0;
    const totalLessonAttempts = lessonProgress?.length || 1;
    const completionRate = (completedLessons / totalLessonAttempts) * 100;
    
    if (completionRate < 50) {
      insights.push({
        type: 'warning',
        title: 'Low Completion Rate',
        description: `Only ${completionRate.toFixed(0)}% of started lessons are completed. Consider shorter lessons or more engaging content.`,
        action: 'Analyze Drop-offs',
        icon: TrendingDown,
      });
    } else {
      insights.push({
        type: 'success',
        title: 'Strong Completion Rate',
        description: `${completionRate.toFixed(0)}% completion rate indicates engaging content. Keep up the good work!`,
        action: 'View Details',
        icon: TrendingUp,
      });
    }

    // Category diversity
    const categories = [...new Set(courses?.map(c => c.category) || [])];
    if (categories.length < 5) {
      insights.push({
        type: 'insight',
        title: 'Expand Course Categories',
        description: 'Consider adding courses in more diverse categories to attract a broader audience.',
        action: 'Add Category',
        icon: Target,
      });
    }

    return insights;
  };

  const insights = generateInsights();

  // Recommendations
  const recommendations = [
    {
      title: 'Personalized Learning Paths',
      description: 'Implement AI-driven learning paths based on student progress and goals.',
      impact: 'High',
      effort: 'Medium',
      progress: 35,
    },
    {
      title: 'Gamification Elements',
      description: 'Add more badges, achievements, and daily challenges to boost engagement.',
      impact: 'High',
      effort: 'Low',
      progress: 60,
    },
    {
      title: 'Video Quality Improvements',
      description: 'Upgrade video resolution and add subtitles for better accessibility.',
      impact: 'Medium',
      effort: 'High',
      progress: 20,
    },
    {
      title: 'Mobile App Development',
      description: 'Create a native mobile app for learning on the go.',
      impact: 'High',
      effort: 'High',
      progress: 10,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                AI Insights
              </h1>
              <p className="text-muted-foreground mt-1">Intelligent recommendations to improve your courses</p>
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Insights
            </Button>
          </div>

          {/* AI-Generated Insights */}
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Smart Insights</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((insight, index) => (
                <Card key={index} className={`border-l-4 ${
                  insight.type === 'warning' ? 'border-l-orange-500' :
                  insight.type === 'success' ? 'border-l-green-500' :
                  'border-l-primary'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        insight.type === 'warning' ? 'bg-orange-500/10' :
                        insight.type === 'success' ? 'bg-green-500/10' :
                        'bg-primary/10'
                      }`}>
                        <insight.icon className={`h-5 w-5 ${
                          insight.type === 'warning' ? 'text-orange-500' :
                          insight.type === 'success' ? 'text-green-500' :
                          'text-primary'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        <Button variant="link" className="p-0 h-auto mt-2">{insight.action} →</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Health Score</CardTitle>
              <CardDescription>Overall performance across key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="hsl(234 89% 58%)"
                      strokeWidth="12"
                      strokeDasharray={`${78 * 3.51} 351`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">78</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">User Engagement</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Content Quality</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Goal Completion</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Growth Rate</span>
                    </div>
                    <Progress value={88} className="h-2" />
                    <span className="text-sm font-medium">88%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>AI-suggested improvements for your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge variant={rec.impact === 'High' ? 'default' : 'secondary'}>
                          {rec.impact} Impact
                        </Badge>
                        <Badge variant="outline">{rec.effort} Effort</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    <div className="w-32">
                      <div className="text-sm text-muted-foreground mb-1">Progress</div>
                      <Progress value={rec.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{rec.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminInsights;