import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { UserProgressBar } from '@/components/UserProgressBar';
import { StatCard } from '@/components/StatCard';
import { CourseCard } from '@/components/CourseCard';
import { ProgressChart } from '@/components/ProgressChart';
import { AIChatAssistant } from '@/components/AIChatAssistant';
import { LessonPlayer } from '@/components/LessonPlayer';
import { mockUser, mockCourses, mockProgressData } from '@/data/mockData';
import { Course } from '@/types';
import { 
  Zap, 
  Flame, 
  Target, 
  BookOpen, 
  MessageCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const enrolledCourses = mockCourses.filter(c => mockUser.enrolledCourses.includes(c.id));
  const totalXPThisWeek = mockProgressData.reduce((acc, d) => acc + d.xp, 0);
  const totalLessonsThisWeek = mockProgressData.reduce((acc, d) => acc + d.lessonsCompleted, 0);
  const totalTimeThisWeek = mockProgressData.reduce((acc, d) => acc + d.timeSpent, 0);

  if (selectedCourse && selectedCourse.lessons.length > 0) {
    return (
      <LessonPlayer 
        lessons={selectedCourse.lessons} 
        courseTitle={selectedCourse.title}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

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
              value={`${Math.floor(totalTimeThisWeek / 60)}h ${totalTimeThisWeek % 60}m`}
              trend="+2h from last week"
              trendUp={true}
            />
          </div>

          {/* Progress Chart */}
          <ProgressChart data={mockProgressData} />

          {/* Continue Learning */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold">Continue Learning</h2>
              <Button variant="ghost" className="text-primary">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  enrolled={true}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>
          </section>

          {/* Recommended Courses */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-display font-semibold">Recommended For You</h2>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  AI Powered
                </span>
              </div>
              <Button variant="ghost" className="text-primary">Explore All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.filter(c => !mockUser.enrolledCourses.includes(c.id)).slice(0, 3).map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  onClick={() => setSelectedCourse(course)}
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
