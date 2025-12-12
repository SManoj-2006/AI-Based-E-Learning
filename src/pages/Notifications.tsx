import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Clock,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'ai' | 'quiz' | 'reminder' | 'achievement' | 'instructor' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'ai',
    title: 'AI Recommendation',
    message: 'Based on your progress, we recommend completing "Neural Networks Basics" before moving to advanced topics.',
    time: '2 min ago',
    read: false,
    actionLabel: 'View Course',
  },
  {
    id: '2',
    type: 'quiz',
    title: 'Quiz Available',
    message: 'A new quiz for "Machine Learning Fundamentals" is now available. Test your knowledge!',
    time: '1 hour ago',
    read: false,
    actionLabel: 'Take Quiz',
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Don\'t break your streak!',
    message: 'You\'re on a 7-day streak! Complete a lesson today to keep it going.',
    time: '3 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'achievement',
    title: 'New Badge Earned!',
    message: 'Congratulations! You\'ve earned the "Week Warrior" badge for maintaining a 7-day streak.',
    time: '1 day ago',
    read: true,
    actionLabel: 'View Badge',
  },
  {
    id: '5',
    type: 'instructor',
    title: 'Message from Dr. Sarah Chen',
    message: 'Great progress on the ML course! Check out the bonus materials I\'ve added.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'system',
    title: 'New Courses Added',
    message: '5 new courses have been added to the platform. Explore them now!',
    time: '3 days ago',
    read: true,
    actionLabel: 'Explore',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<string>('all');

  const typeIcons = {
    ai: Sparkles,
    quiz: BookOpen,
    reminder: Clock,
    achievement: Trophy,
    instructor: MessageCircle,
    system: AlertCircle,
  };

  const typeColors = {
    ai: 'bg-primary/10 text-primary',
    quiz: 'bg-xp/10 text-xp',
    reminder: 'bg-streak/10 text-streak',
    achievement: 'bg-achievement/10 text-achievement',
    instructor: 'bg-accent/10 text-accent',
    system: 'bg-secondary text-muted-foreground',
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </h1>
              <p className="text-muted-foreground mt-1">Stay updated with your learning journey</p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notification Settings */}
          <div className="bg-card rounded-xl border p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">AI-Powered Notifications</p>
                  <p className="text-sm text-muted-foreground">Get personalized alerts based on your learning patterns</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'unread', 'ai', 'quiz', 'reminder', 'achievement', 'instructor'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium capitalize transition-all",
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = typeIcons[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "bg-card rounded-xl border p-4 transition-all hover:shadow-md",
                      !notification.read && "border-l-4 border-l-primary"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        typeColors[notification.type]
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(notification.id);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {notification.actionLabel && (
                            <Button variant="outline" size="sm">
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
