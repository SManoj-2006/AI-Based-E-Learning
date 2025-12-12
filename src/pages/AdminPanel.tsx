import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { mockCourses, mockUser } from '@/data/mockData';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const adminStats = [
  { date: 'Jan', users: 1200, revenue: 45000, completions: 890 },
  { date: 'Feb', users: 1500, revenue: 52000, completions: 1100 },
  { date: 'Mar', users: 1800, revenue: 61000, completions: 1350 },
  { date: 'Apr', users: 2100, revenue: 68000, completions: 1580 },
  { date: 'May', users: 2400, revenue: 75000, completions: 1820 },
  { date: 'Jun', users: 2900, revenue: 89000, completions: 2100 },
];

const AdminPanel = () => {
  const totalUsers = 2900;
  const totalCourses = mockCourses.length;
  const totalRevenue = 89000;
  const completionRate = 78;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isAdmin />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your e-learning platform</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={<Users className="h-5 w-5" />}
              label="Total Users"
              value={totalUsers.toLocaleString()}
              trend="+21% this month"
              trendUp={true}
            />
            <StatCard 
              icon={<BookOpen className="h-5 w-5" />}
              label="Active Courses"
              value={totalCourses}
              trend="+2 new"
              trendUp={true}
            />
            <StatCard 
              icon={<DollarSign className="h-5 w-5" />}
              label="Revenue"
              value={`$${(totalRevenue / 1000).toFixed(0)}k`}
              trend="+18% this month"
              trendUp={true}
              variant="achievement"
            />
            <StatCard 
              icon={<TrendingUp className="h-5 w-5" />}
              label="Completion Rate"
              value={`${completionRate}%`}
              trend="+5% vs last month"
              trendUp={true}
              variant="xp"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-display font-semibold mb-4">User Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={adminStats}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(234 89% 58%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(234 89% 58%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" stroke="hsl(220 9% 46%)" />
                    <YAxis stroke="hsl(220 9% 46%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(234 89% 58%)" 
                      strokeWidth={2}
                      fill="url(#userGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-display font-semibold mb-4">Revenue</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adminStats}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" stroke="hsl(220 9% 46%)" />
                    <YAxis stroke="hsl(220 9% 46%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="hsl(158 64% 52%)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Courses */}
          <section className="bg-card rounded-xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold">Course Management</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Instructor</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Enrolled</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.slice(0, 5).map((course) => (
                    <tr key={course.id} className="border-b last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium">{course.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{course.instructor}</td>
                      <td className="py-3 px-4">{course.enrolledCount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="text-achievement">★ {course.rating}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
