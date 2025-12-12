import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser, mockCourses } from '@/data/mockData';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Award,
  BookOpen,
  Zap,
  Camera,
  Mail,
  Lock,
  Globe,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Profile = () => {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [bio, setBio] = useState('Passionate learner exploring AI and machine learning. Always curious!');
  
  const completedCourses = mockCourses.filter(c => mockUser.completedCourses.includes(c.id));
  const learningInterests = ['Machine Learning', 'Web Development', 'Data Science', 'Cloud Computing'];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              Profile & Settings
            </h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-card border">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Palette className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              {/* Profile Picture */}
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="font-display font-semibold mb-4">Profile Picture</h2>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                      <AvatarImage src={mockUser.avatar} />
                      <AvatarFallback className="text-2xl">{mockUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a new profile picture
                    </p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="font-display font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      className="h-20"
                    />
                  </div>
                </div>
                <Button variant="gradient" className="mt-4">Save Changes</Button>
              </div>

              {/* Learning Interests */}
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="font-display font-semibold mb-4">Learning Interests</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {learningInterests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="px-3 py-1">
                      {interest}
                      <button className="ml-2 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm">+ Add Interest</Button>
              </div>

              {/* Completed Courses & Certificates */}
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-achievement" />
                    Certificates
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {completedCourses.length} earned
                  </span>
                </div>
                <div className="space-y-3">
                  {completedCourses.length > 0 ? completedCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-achievement" />
                        <span className="font-medium">{course.title}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-4">
                      Complete courses to earn certificates!
                    </p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl border p-4 text-center">
                  <Zap className="h-8 w-8 text-xp mx-auto mb-2" />
                  <p className="text-2xl font-bold">{mockUser.xp.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                </div>
                <div className="bg-card rounded-xl border p-4 text-center">
                  <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold">{mockUser.completedCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
                <div className="bg-card rounded-xl border p-4 text-center">
                  <Award className="h-8 w-8 text-achievement mx-auto mb-2" />
                  <p className="text-2xl font-bold">{mockUser.badges.length}</p>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="font-display font-semibold mb-4">Learning Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-muted-foreground">English (US)</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Use dark theme</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium">Difficulty Level</p>
                      <p className="text-sm text-muted-foreground">Preferred course difficulty</p>
                    </div>
                    <Badge variant="xp">Intermediate</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="font-display font-semibold mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Course Recommendations', desc: 'AI-powered course suggestions' },
                    { title: 'Quiz Reminders', desc: 'Reminders for upcoming quizzes' },
                    { title: 'Streak Alerts', desc: 'Don\'t break your learning streak' },
                    { title: 'New Badges', desc: 'When you earn new achievements' },
                    { title: 'Instructor Messages', desc: 'Messages from course instructors' },
                    { title: 'Platform Updates', desc: 'New features and improvements' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="font-display font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
