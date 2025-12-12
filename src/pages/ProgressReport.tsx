import { Sidebar } from '@/components/Sidebar';
import { ProgressChart } from '@/components/ProgressChart';
import { StatCard } from '@/components/StatCard';
import { mockUser, mockCourses, mockProgressData } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Target, 
  BookOpen, 
  Clock,
  TrendingUp,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const ProgressReport = () => {
  const completedCourses = mockUser.completedCourses.length;
  const enrolledCourses = mockUser.enrolledCourses.length;
  const totalXP = mockProgressData.reduce((acc, d) => acc + d.xp, 0);
  const totalTime = mockProgressData.reduce((acc, d) => acc + d.timeSpent, 0);
  const avgDailyXP = Math.round(totalXP / 7);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-display font-bold">Progress Report</h1>
            <p className="text-muted-foreground mt-1">Track your learning journey and achievements</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={<Zap className="h-5 w-5" />}
              label="Total XP"
              value={mockUser.xp.toLocaleString()}
              trend={`Level ${mockUser.level}`}
              trendUp={true}
              variant="xp"
            />
            <StatCard 
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Courses Completed"
              value={completedCourses}
            />
            <StatCard 
              icon={<BookOpen className="h-5 w-5" />}
              label="Active Courses"
              value={enrolledCourses}
            />
            <StatCard 
              icon={<TrendingUp className="h-5 w-5" />}
              label="Avg. Daily XP"
              value={avgDailyXP}
              trend="+15% vs last week"
              trendUp={true}
            />
          </div>

          {/* Weekly Progress Chart */}
          <ProgressChart data={mockProgressData} />

          {/* Course Progress */}
          <section className="bg-card rounded-xl border p-6">
            <h2 className="text-xl font-display font-semibold mb-6">Course Progress</h2>
            <div className="space-y-6">
              {mockCourses.filter(c => mockUser.enrolledCourses.includes(c.id)).map((course) => {
                const completedLessons = course.lessons.filter(l => l.completed).length;
                const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;
                
                return (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {completedLessons} of {course.lessons.length} lessons completed
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-accent">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Learning Streak Calendar */}
          <section className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold">Learning Streak</h2>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => {
                const isActive = Math.random() > 0.3;
                const intensity = isActive ? Math.floor(Math.random() * 4) + 1 : 0;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-md transition-colors ${
                      intensity === 0 ? 'bg-secondary' :
                      intensity === 1 ? 'bg-accent/25' :
                      intensity === 2 ? 'bg-accent/50' :
                      intensity === 3 ? 'bg-accent/75' :
                      'bg-accent'
                    }`}
                    title={`Day ${i + 1}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>4 weeks ago</span>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-secondary" />
                  <div className="w-3 h-3 rounded-sm bg-accent/25" />
                  <div className="w-3 h-3 rounded-sm bg-accent/50" />
                  <div className="w-3 h-3 rounded-sm bg-accent/75" />
                  <div className="w-3 h-3 rounded-sm bg-accent" />
                </div>
                <span>More</span>
              </div>
              <span>Today</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProgressReport;
