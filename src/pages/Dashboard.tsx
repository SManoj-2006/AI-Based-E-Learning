import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { UserProgressBar } from '@/components/UserProgressBar';
import { StatCard } from '@/components/StatCard';
import { CourseCard } from '@/components/CourseCard';
import { ProgressChart } from '@/components/ProgressChart';
import { AIChatAssistant } from '@/components/AIChatAssistant';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useCourses, useEnrollments, useDailyProgress } from '@/hooks/useCourses';
import { 
  Zap, 
  Flame, 
  BookOpen, 
  MessageCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments();
  const { data: dailyProgress } = useDailyProgress(7);

  const isLoading = profileLoading || coursesLoading || enrollmentsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
  const enrolledCourses = courses?.filter(c => enrolledCourseIds.includes(c.id)) || [];
  const recommendedCourses = courses?.filter(c => !enrolledCourseIds.includes(c.id)).slice(0, 3) || [];

  // Calculate weekly stats from daily progress
  const totalXPThisWeek = dailyProgress?.reduce((acc, d) => acc + (d.xp_earned || 0), 0) || 0;
  const totalLessonsThisWeek = dailyProgress?.reduce((acc, d) => acc + (d.lessons_completed || 0), 0) || 0;
  const totalTimeThisWeek = dailyProgress?.reduce((acc, d) => acc + (d.time_spent_minutes || 0), 0) || 0;

  // Format progress data for chart
  const chartData = dailyProgress?.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    xp: d.xp_earned || 0,
    lessonsCompleted: d.lessons_completed || 0,
    timeSpent: d.time_spent_minutes || 0,
  })) || [];

  const mockUser = {
    id: user?.id || '',
    name: profile?.full_name || user?.email?.split('@')[0] || 'Learner',
    email: user?.email || '',
    avatar: profile?.avatar_url,
    level: profile?.level || 1,
    xp: profile?.xp || 0,
    xpToNextLevel: ((profile?.level || 1) * 1000),
    streak: profile?.streak || 0,
    badges: [],
    enrolledCourses: enrolledCourseIds,
    completedCourses: [],
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold">
                Welcome back, <span className="text-gradient">{mockUser.name.split(' ')[0]}</span>
              </h1>
              <p className="text-muted-foreground mt-1">Continue your learning journey</p>
            </div>
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => setShowChat(true)}
              className="gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Ask AI Tutor
            </Button>
          </div>

          {/* User Progress Bar */}
          <UserProgressBar user={mockUser} />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={<Zap className="h-5 w-5" />}
              label="XP This Week"
              value={totalXPThisWeek.toLocaleString()}
              trend="+12%"
              trendUp={true}
              variant="xp"
            />
            <StatCard 
              icon={<Flame className="h-5 w-5" />}
              label="Day Streak"
              value={mockUser.streak}
              trend="Keep going!"
              trendUp={true}
              variant="streak"
            />
            <StatCard 
              icon={<BookOpen className="h-5 w-5" />}
              label="Lessons Completed"
              value={totalLessonsThisWeek}
              trend="+5 this week"
              trendUp={true}
            />
            <StatCard 
              icon={<Clock className="h-5 w-5" />}
              label="Time Spent"
              value={totalTimeThisWeek > 0 ? `${Math.floor(totalTimeThisWeek / 60)}h ${totalTimeThisWeek % 60}m` : '0m'}
              trend="+2h from last week"
              trendUp={true}
            />
          </div>

          {/* Progress Chart */}
          {chartData.length > 0 && <ProgressChart data={chartData} />}

          {/* Continue Learning */}
          {enrolledCourses.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-semibold">Continue Learning</h2>
                <Button variant="ghost" className="text-primary" onClick={() => navigate('/courses')}>
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={{
                      ...course,
                      lessons: [],
                      rating: course.rating || 0,
                      enrolledCount: course.enrolled_count || 0,
                      tags: course.tags || [],
                      xpReward: course.xp_reward || 100,
                    }}
                    enrolled={true}
                    onClick={() => navigate(`/course/${course.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recommended Courses */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-display font-semibold">
                  {enrolledCourses.length > 0 ? 'Recommended For You' : 'Start Learning'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  AI Powered
                </span>
              </div>
              <Button variant="ghost" className="text-primary" onClick={() => navigate('/courses')}>
                Explore All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={{
                    ...course,
                    lessons: [],
                    rating: course.rating || 0,
                    enrolledCount: course.enrolled_count || 0,
                    tags: course.tags || [],
                    xpReward: course.xp_reward || 100,
                  }}
                  onClick={() => navigate(`/course/${course.id}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* AI Chat Assistant */}
      <AIChatAssistant isOpen={showChat} onClose={() => setShowChat(false)} />

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center transition-transform hover:scale-110 z-40"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </button>
      )}
    </div>
  );
};

export default Dashboard;
