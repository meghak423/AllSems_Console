import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Mail, Lock, User, ArrowRight, Loader2, ArrowLeft, GraduationCap, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required").max(72),
});

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const roleHint = searchParams.get("role") || "student";
  const isAdmin = roleHint === "admin";

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isSignUp) {
        const validated = signUpSchema.parse({ fullName, email, password });
        const { error } = await signUp(validated.email, validated.password, validated.fullName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Account created! Redirecting...");
          navigate("/dashboard");
        }
      } else {
        const validated = signInSchema.parse({ email, password });
        const { error } = await signIn(validated.email, validated.password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Logged in!");
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error(err?.message || "Network error. Please refresh and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">SmartPlace</span>
          </Link>

          {/* Role indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isAdmin ? "bg-primary/10" : "bg-secondary/10"}`}>
              {isAdmin ? <UserCog className="w-5 h-5 text-primary" /> : <GraduationCap className="w-5 h-5 text-secondary" />}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {isAdmin ? "Admin Portal" : "Student Portal"}
            </span>
          </div>

          <h1 className="text-2xl font-display font-bold text-foreground">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignUp
              ? (isAdmin ? "Sign up as an administrator" : "Sign up as a student to get started")
              : (isAdmin ? "Sign in to the admin dashboard" : "Sign in to your student account")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl border border-border bg-card shadow-card">
          {isSignUp && (
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="fullName" placeholder="Aarav Sharma" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" />
              </div>
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder={isAdmin ? "admin@university.edu" : "you@university.edu"} value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90" disabled={submitting}>
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-secondary font-medium hover:underline">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {/* Switch role link */}
        <p className="text-center text-sm text-muted-foreground mt-2">
          {isAdmin ? "Not an admin?" : "Are you an admin?"}{" "}
          <Link to={`/auth?role=${isAdmin ? "student" : "admin"}`} className="text-secondary font-medium hover:underline">
            {isAdmin ? "Student Login" : "Admin Login"}
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
