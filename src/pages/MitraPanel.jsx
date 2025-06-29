import DashboardLayout from "../components/layout/DashboardLayout";
import { mitraNavItems } from "../lib/navigation";

export default function MitraPanel() {
  return <DashboardLayout navItems={mitraNavItems} panelType="mitra" />;
}
