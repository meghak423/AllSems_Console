import { motion } from "framer-motion";
import { Brain, Target, TrendingUp, Shield, ArrowRight, Users, Briefcase, BarChart3, GraduationCap, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { icon: Brain, title: "AI Resume Analysis", description: "Deep learning models automatically extract skills, experience, and qualifications from resumes with proficiency levels." },
  { icon: Target, title: "Semantic Job Matching", description: "Beyond keyword matching — understand contextual similarity between skills and job requirements." },
  { icon: TrendingUp, title: "Skill Gap Prediction", description: "Actionable insights showing exactly which skills students need to improve their match scores." },
  { icon: Shield, title: "Bias-Free Shortlisting", description: "Fair, transparent ranking based purely on skills and qualifications — no demographic bias." },
];

const stats = [
  { icon: Users, value: "500+", label: "Students Matched" },
  { icon: Briefcase, value: "120+", label: "Job Postings" },
  { icon: BarChart3, value: "92%", label: "Placement Rate" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple top bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">SmartPlace</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth?role=student"><GraduationCap className="w-4 h-4 mr-1.5" />Student Login</Link>
            </Button>
            <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90" asChild>
              <Link to="/auth?role=admin"><UserCog className="w-4 h-4 mr-1.5" />Admin Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-[0.03]" />
        <div className="container relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card mb-6 text-sm text-muted-foreground">
              <Brain className="w-4 h-4 text-secondary" />
              Powered by Deep Learning & NLP
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground leading-tight mb-6">
              Smart Campus<br />
              <span className="text-gradient-hero">Placement System</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              AI-driven semantic matching between student resumes and job descriptions.
              Automated skill gap analysis and bias-free candidate ranking.
            </p>

            {/* Two login cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Link to="/auth?role=student" className="block p-6 rounded-xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-secondary/40 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-secondary/20 transition-colors">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">I'm a Student</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload resume, discover job matches, get AI career recommendations & interview prep</p>
                  <span className="inline-flex items-center text-sm font-medium text-secondary group-hover:gap-2 transition-all gap-1">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Link to="/auth?role=admin" className="block p-6 rounded-xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-secondary/40 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <UserCog className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">I'm an Admin</h3>
                  <p className="text-sm text-muted-foreground mb-4">Post jobs, rank candidates by skills & CGPA, select students for placements</p>
                  <span className="inline-flex items-center text-sm font-medium text-secondary group-hover:gap-2 transition-all gap-1">
                    Admin Portal <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="flex justify-center gap-12 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">How SmartPlace Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Leveraging AI models for intelligent placement automation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card shadow-card hover:shadow-elevated transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students & Admins */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <GraduationCap className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-3">For Students</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Upload resume & auto-extract skills</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Get AI-powered job matching scores</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Skill gap analysis & improvement roadmap</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Recommended courses & interview questions</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Track placement readiness</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <UserCog className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-3">For Admins</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Post & manage job listings</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Rank candidates by skills & match %</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Filter students by CGPA, skills, projects</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> Select & shortlist for placements</li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span> View all student skill profiles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>SmartPlace — AI-Based Semantic Matching Platform • Mini Project 2026</p>
        </div>
      </footer>
    </div>
  );
}
