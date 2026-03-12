
-- Add CGPA and projects columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cgpa numeric(4,2) DEFAULT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS projects jsonb DEFAULT '[]'::jsonb;

-- Fix ALL RLS policies to be PERMISSIVE instead of RESTRICTIVE
-- Drop all existing RESTRICTIVE policies and recreate as PERMISSIVE

-- JOBS table
DROP POLICY IF EXISTS "Authenticated can read active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can delete jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can insert jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can read all jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can update jobs" ON public.jobs;

CREATE POLICY "Anyone can read active jobs" ON public.jobs FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Admins full read jobs" ON public.jobs FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert jobs" ON public.jobs FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update jobs" ON public.jobs FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete jobs" ON public.jobs FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- PROFILES table
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all profiles" ON public.profiles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- MATCH_RESULTS table
DROP POLICY IF EXISTS "Admins can insert matches" ON public.match_results;
DROP POLICY IF EXISTS "Admins can read all matches" ON public.match_results;
DROP POLICY IF EXISTS "Admins can update matches" ON public.match_results;
DROP POLICY IF EXISTS "Users can insert own matches" ON public.match_results;
DROP POLICY IF EXISTS "Users can read own matches" ON public.match_results;
DROP POLICY IF EXISTS "Users can update own matches" ON public.match_results;

CREATE POLICY "Users read own matches" ON public.match_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all matches" ON public.match_results FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own matches" ON public.match_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins insert matches" ON public.match_results FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own matches" ON public.match_results FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins update matches" ON public.match_results FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- RESUMES table
DROP POLICY IF EXISTS "Admins can read all resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can delete own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can insert own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can read own resumes" ON public.resumes;

CREATE POLICY "Users read own resumes" ON public.resumes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all resumes" ON public.resumes FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own resumes" ON public.resumes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own resumes" ON public.resumes FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own resumes" ON public.resumes FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- STUDENT_SKILLS table
DROP POLICY IF EXISTS "Admins can read all skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can delete own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can insert own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can read own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can update own skills" ON public.student_skills;

CREATE POLICY "Users read own skills" ON public.student_skills FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all skills" ON public.student_skills FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own skills" ON public.student_skills FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own skills" ON public.student_skills FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own skills" ON public.student_skills FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- USER_ROLES table
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all roles" ON public.user_roles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Re-create the trigger for new user handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
