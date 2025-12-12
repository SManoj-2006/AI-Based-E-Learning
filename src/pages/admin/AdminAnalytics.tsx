import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, BookOpen, Clock, Target, Award } from 'lucide-react';

const COLORS = ['hsl(234, 89%, 58%)', 'hsl(158, 64%, 52%)', 'hsl(43, 96%, 58%)', 'hsl(280, 75%, 60%)'];

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const { data: dailyProgress } = useQuery({
    queryKey: ['daily-progress-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_progress')
        .select('*')
        .order('date', { ascending: true })
        .limit(30);
      if (error) throw error;
      return data;
    },
  });

  const { data: courses } = useQuery({
    queryKey: ['courses-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: enrollments } = useQuery({
    queryKey: ['enrollments-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase.from('enrollments').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: lessonProgress } = useQuery({
    queryKey: ['lesson-progress-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase.from('lesson_progress').select('*');
      if (error) throw error;
      return data;
    },
  });

  // Aggregate data for charts
  const engagementData = dailyProgress?.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.date === curr.date);
    if (existing) {
      existing.lessons += curr.lessons_completed || 0;
      existing.time += curr.time_spent_minutes || 0;
      existing.xp += curr.xp_earned || 0;
    } else {
      acc.push({
        date: curr.date,
        lessons: curr.lessons_completed || 0,
        time: curr.time_spent_minutes || 0,
        xp: curr.xp_earned || 0,
      });
    }
    return acc;
  }, []) || [];

  const categoryData = courses?.reduce((acc: any[], course) => {
    const existing = acc.find(a => a.name === course.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: course.category, value: 1 });
    }
    return acc;
  }, []) || [];

  const completionRate = lessonProgress?.filter(l => l.completed).length || 0;
  const totalLessons = lessonProgress?.length || 1;
  const avgCompletionRate = Math.round((completionRate / totalLessons) * 100);

  const totalTimeSpent = dailyProgress?.reduce((acc, curr) => acc + (curr.time_spent_minutes || 0), 0) || 0;
  const totalXpEarned = dailyProgress?.reduce((acc, curr) => acc + (curr.xp_earned || 0), 0) || 0;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold">Analytics & Reports</h1>
              <p className="text-muted-foreground mt-1">Performance insights and engagement metrics</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{enrollments?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Total Enrollments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Target className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{avgCompletionRate}%</div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round(totalTimeSpent / 60)}h</div>
                    <p className="text-sm text-muted-foreground">Total Learning Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Award className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalXpEarned.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Total XP Awarded</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                      <defs>
                        <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(234 89% 58%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(234 89% 58%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" stroke="hsl(220 9% 46%)" fontSize={12} />
                      <YAxis stroke="hsl(220 9% 46%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area type="monotone" dataKey="xp" stroke="hsl(234 89% 58%)" strokeWidth={2} fill="url(#xpGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Courses by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Lessons Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" stroke="hsl(220 9% 46%)" fontSize={12} />
                      <YAxis stroke="hsl(220 9% 46%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="lessons" fill="hsl(158 64% 52%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;