import { useAuth } from "@/hooks/useAuth";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const { role } = useAuth();
  return role === "admin" ? <AdminDashboard /> : <StudentDashboard />;
}
