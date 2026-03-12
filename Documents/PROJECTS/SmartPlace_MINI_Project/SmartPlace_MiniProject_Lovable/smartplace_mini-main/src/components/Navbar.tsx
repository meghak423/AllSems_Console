import { Brain, LogOut, LayoutDashboard, Upload, Briefcase, Users, Menu, X, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, role, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const studentLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/upload-resume", label: "Upload Resume", icon: Upload },
    { to: "/jobs", label: "Browse Jobs", icon: Briefcase },
    { to: "/edit-profile", label: "My Profile", icon: UserCog },
  ];

  const adminLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/manage-jobs", label: "Manage Jobs", icon: Briefcase },
    { to: "/students", label: "All Students", icon: Users },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">SmartPlace</span>
        </Link>

        {user && (
          <>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Button
                  key={link.to}
                  variant={isActive(link.to) ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={link.to} className="flex items-center gap-1.5">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {profile?.full_name || user.email}
                {role === "admin" && <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-medium">Admin</span>}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-1.5" /> Logout
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </>
        )}

        {!user && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild><Link to="/auth">Sign In</Link></Button>
            <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && user && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                isActive(link.to) ? "bg-secondary/10 text-secondary font-medium" : "text-foreground hover:bg-muted"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
