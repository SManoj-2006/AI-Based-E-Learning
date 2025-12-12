import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Send, Users, Calendar, Megaphone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminNotifications = () => {
  const [announcement, setAnnouncement] = useState({
    title: '',
    message: '',
    audience: 'all',
    priority: 'normal',
  });

  // Mock sent notifications
  const sentNotifications = [
    {
      id: 1,
      title: 'New Course Available: Advanced React',
      message: 'We just launched a new course on Advanced React patterns. Check it out!',
      audience: 'All Users',
      sentAt: '2024-01-15 10:00',
      status: 'delivered',
      recipients: 2450,
    },
    {
      id: 2,
      title: 'Platform Maintenance Notice',
      message: 'Scheduled maintenance on Jan 20th from 2-4 AM EST.',
      audience: 'All Users',
      sentAt: '2024-01-14 09:00',
      status: 'delivered',
      recipients: 2450,
    },
    {
      id: 3,
      title: 'Complete Your Profile',
      message: 'Add your learning goals to get personalized recommendations.',
      audience: 'New Users',
      sentAt: '2024-01-13 14:30',
      status: 'delivered',
      recipients: 156,
    },
  ];

  const scheduledNotifications = [
    {
      id: 1,
      title: 'Weekly Learning Reminder',
      audience: 'Inactive Users',
      scheduledFor: '2024-01-17 09:00',
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Course Completion Reminder',
      audience: 'Active Learners',
      scheduledFor: '2024-01-18 10:00',
      status: 'scheduled',
    },
  ];

  const handleSendAnnouncement = () => {
    if (!announcement.title || !announcement.message) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    toast({ title: 'Announcement sent!', description: 'Your announcement has been sent to all users.' });
    setAnnouncement({ title: '', message: '', audience: 'all', priority: 'normal' });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Megaphone className="h-8 w-8 text-primary" />
              Notifications & Announcements
            </h1>
            <p className="text-muted-foreground mt-1">Communicate with your learners</p>
          </div>

          <Tabs defaultValue="create" className="space-y-6">
            <TabsList>
              <TabsTrigger value="create">Create Announcement</TabsTrigger>
              <TabsTrigger value="sent">Sent Notifications</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>New Announcement</CardTitle>
                    <CardDescription>Send a notification to your learners</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Announcement Title</Label>
                      <Input 
                        value={announcement.title}
                        onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                        placeholder="e.g., New Course Available!"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea 
                        value={announcement.message}
                        onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                        placeholder="Write your announcement message..."
                        rows={5}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Audience</Label>
                        <Select 
                          value={announcement.audience} 
                          onValueChange={(v) => setAnnouncement({ ...announcement, audience: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="active">Active Learners</SelectItem>
                            <SelectItem value="inactive">Inactive Users</SelectItem>
                            <SelectItem value="new">New Users (Last 7 days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select 
                          value={announcement.priority} 
                          onValueChange={(v) => setAnnouncement({ ...announcement, priority: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSendAnnouncement} className="gap-2">
                        <Send className="h-4 w-4" />
                        Send Now
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">24</div>
                        <div className="text-sm text-muted-foreground">Sent This Month</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Users className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold">2,450</div>
                        <div className="text-sm text-muted-foreground">Total Recipients</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Mail className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-semibold">89%</div>
                        <div className="text-sm text-muted-foreground">Open Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sent">
              <Card>
                <CardHeader>
                  <CardTitle>Sent Notifications</CardTitle>
                  <CardDescription>History of all sent notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sentNotifications.map((notif) => (
                      <div key={notif.id} className="flex items-start gap-4 p-4 rounded-lg border">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notif.title}</h4>
                            <Badge variant="secondary">{notif.audience}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notif.sentAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {notif.recipients.toLocaleString()} recipients
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scheduled">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Notifications</CardTitle>
                  <CardDescription>Upcoming notifications to be sent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledNotifications.map((notif) => (
                      <div key={notif.id} className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                          <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notif.title}</h4>
                            <Badge variant="outline">{notif.audience}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Scheduled for: {notif.scheduledFor}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-destructive">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>Reusable templates for common notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { title: 'Welcome Email', description: 'Sent to new users after signup' },
                      { title: 'Course Reminder', description: 'Remind users to complete courses' },
                      { title: 'Achievement Unlocked', description: 'Congratulate users on achievements' },
                      { title: 'Weekly Digest', description: 'Weekly learning progress summary' },
                      { title: 'New Course Alert', description: 'Notify about new course releases' },
                      { title: 'Streak Warning', description: 'Alert users about expiring streaks' },
                    ].map((template, index) => (
                      <div key={index} className="p-4 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors">
                        <h4 className="font-medium">{template.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        <Button variant="link" className="p-0 h-auto mt-2">Use Template →</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminNotifications;