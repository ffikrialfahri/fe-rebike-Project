import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminNavItems } from "@/lib/navigation";

export default function AdminPanel() {
  return <DashboardLayout navItems={adminNavItems} panelType="admin" />;
}
