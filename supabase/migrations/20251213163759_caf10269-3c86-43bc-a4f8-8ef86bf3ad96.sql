-- Add admin write policies for courses table
CREATE POLICY "Admins can insert courses" ON public.courses
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update courses" ON public.courses
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete courses" ON public.courses
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Add admin write policies for lessons table
CREATE POLICY "Admins can insert lessons" ON public.lessons
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update lessons" ON public.lessons
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete lessons" ON public.lessons
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Add admin write policies for badges table
CREATE POLICY "Admins can insert badges" ON public.badges
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update badges" ON public.badges
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete badges" ON public.badges
  FOR DELETE USING (has_role(auth.uid(), 'admin'));