
-- Drop all existing RESTRICTIVE policies and recreate as PERMISSIVE

-- JOBS table
DROP POLICY IF EXISTS "Admins can delete jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can insert jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can read all jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can update jobs" ON public.jobs;
DROP POLICY IF EXISTS "Authenticated can read active jobs" ON public.jobs;

CREATE POLICY "Admins can delete jobs" ON public.jobs FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert jobs" ON public.jobs FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can read all jobs" ON public.jobs FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update jobs" ON public.jobs FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated can read active jobs" ON public.jobs FOR SELECT USING (is_active = true);

-- MATCH_RESULTS table
DROP POLICY IF EXISTS "Admins can insert matches" ON public.match_results;
DROP POLICY IF EXISTS "Admins can read all matches" ON public.match_results;
DROP POLICY IF EXISTS "Admins can update matches" ON public.match_results;
DROP POLICY IF EXISTS "Users can insert own matches" ON public.match_results;
DROP POLICY IF EXISTS "Users can read own matches" ON public.match_results;
DROP POLICY IF EXISTS "Users can update own matches" ON public.match_results;

CREATE POLICY "Admins can insert matches" ON public.match_results FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can read all matches" ON public.match_results FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update matches" ON public.match_results FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert own matches" ON public.match_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own matches" ON public.match_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own matches" ON public.match_results FOR UPDATE USING (auth.uid() = user_id);

-- PROFILES table
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Admins can read all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- RESUMES table
DROP POLICY IF EXISTS "Admins can read all resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can delete own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can insert own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can read own resumes" ON public.resumes;

CREATE POLICY "Admins can read all resumes" ON public.resumes FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can delete own resumes" ON public.resumes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);

-- STUDENT_SKILLS table
DROP POLICY IF EXISTS "Admins can read all skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can delete own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can insert own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can read own skills" ON public.student_skills;
DROP POLICY IF EXISTS "Users can update own skills" ON public.student_skills;

CREATE POLICY "Admins can read all skills" ON public.student_skills FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can delete own skills" ON public.student_skills FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skills" ON public.student_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own skills" ON public.student_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON public.student_skills FOR UPDATE USING (auth.uid() = user_id);

-- USER_ROLES table
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

CREATE POLICY "Admins can read all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Re-attach the handle_new_user trigger (it was missing)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
