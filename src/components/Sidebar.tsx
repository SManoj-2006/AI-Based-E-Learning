import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Trophy, 
  Settings,
  GraduationCap,
  Users,
  Sparkles,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const learnerLinks = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/progress', icon: BarChart3, label: 'Progress' },
    { to: '/achievements', icon: Trophy, label: 'Achievements' },
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/courses', icon: BookOpen, label: 'Manage Courses' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const links = isAdmin ? adminLinks : learnerLinks;

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen gradient-dark border-r border-sidebar-border transition-all duration-300 z-40 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-display font-bold text-lg text-sidebar-foreground">LearnAI</h1>
              <p className="text-xs text-sidebar-foreground/60">Smart Learning Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground group",
              collapsed && "justify-center"
            )}
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
          >
            <link.icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
            {!collapsed && <span className="font-medium">{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* AI Assistant Toggle */}
      {!isAdmin && (
        <div className="p-3">
          <div className={cn(
            "rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-3 border border-primary/20",
            collapsed && "p-2"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">AI Tutor</p>
                  <p className="text-xs text-sidebar-foreground/60">Get personalized help</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <NavLink
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </NavLink>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center px-3"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span className="ml-3 font-medium">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
