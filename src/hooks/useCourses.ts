import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  instructor: string;
  category: string;
  level: string;
  duration: string | null;
  rating: number | null;
  enrolled_count: number | null;
  tags: string[] | null;
  xp_reward: number | null;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  type: string;
  duration: string | null;
  content: string | null;
  video_url: string | null;
  order_index: number;
  xp_reward: number | null;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  level: number | null;
  xp: number | null;
  streak: number | null;
  last_activity_date: string | null;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean | null;
  completed_at: string | null;
  xp_earned: number | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  rarity: string;
  xp_requirement: number | null;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

// Fetch all courses
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Course[];
    },
  });
}

// Fetch single course with lessons
export function useCourse(courseId: string | undefined) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null;
      
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle();
      
      if (courseError) throw courseError;
      if (!course) return null;
      
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });
      
      if (lessonsError) throw lessonsError;
      
      return { ...course, lessons: lessons || [] } as Course & { lessons: Lesson[] };
    },
    enabled: !!courseId,
  });
}

// Fetch user profile
export function useProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!user,
  });
}

// Fetch user enrollments
export function useEnrollments() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['enrollments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as (Enrollment & { course: Course })[];
    },
    enabled: !!user,
  });
}

// Enroll in a course
export function useEnrollCourse() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('enrollments')
        .insert({ user_id: user.id, course_id: courseId })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast({ title: 'Enrolled successfully!' });
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast({ title: 'Already enrolled in this course' });
      } else {
        toast({ title: 'Failed to enroll', variant: 'destructive' });
      }
    },
  });
}

// Fetch lesson progress for a course
export function useLessonProgress(courseId: string | undefined) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['lessonProgress', user?.id, courseId],
    queryFn: async () => {
      if (!user || !courseId) return [];
      
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', courseId);
      
      if (!lessons || lessons.length === 0) return [];
      
      const lessonIds = lessons.map(l => l.id);
      
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('lesson_id', lessonIds);
      
      if (error) throw error;
      return data as LessonProgress[];
    },
    enabled: !!user && !!courseId,
  });
}

// Mark lesson complete
export function useCompleteLesson() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ lessonId, xpReward }: { lessonId: string; xpReward: number }) => {
      if (!user) throw new Error('Must be logged in');
      
      // Insert or update lesson progress
      const { error: progressError } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
          xp_earned: xpReward,
        });
      
      if (progressError) throw progressError;
      
      // Update user XP
      const { data: profile } = await supabase
        .from('profiles')
        .select('xp, level')
        .eq('user_id', user.id)
        .single();
      
      if (profile) {
        const newXp = (profile.xp || 0) + xpReward;
        const newLevel = Math.floor(newXp / 1000) + 1;
        
        await supabase
          .from('profiles')
          .update({ xp: newXp, level: newLevel })
          .eq('user_id', user.id);
      }
      
      return { xpReward };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lessonProgress'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({ title: `+${data.xpReward} XP earned!` });
    },
  });
}

// Fetch badges
export function useBadges() {
  return useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('rarity', { ascending: true });
      
      if (error) throw error;
      return data as Badge[];
    },
  });
}

// Fetch user badges
export function useUserBadges() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userBadges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as (UserBadge & { badge: Badge })[];
    },
    enabled: !!user,
  });
}

// Fetch daily progress
export function useDailyProgress(days: number = 7) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['dailyProgress', user?.id, days],
    queryFn: async () => {
      if (!user) return [];
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('daily_progress')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}
