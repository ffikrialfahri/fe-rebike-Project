import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";

const Sidebar = ({ navItems, panelType }) => (
  <aside
    id={`${panelType}-sidebar`}
    className={`w-64 flex-shrink-0 p-4 ${
      panelType === "admin" ? "bg-slate-800 text-white" : "bg-card-bg shadow-lg"
    }`}
  >
    <div
      className={`text-2xl font-extrabold font-poppins mb-6 border-b pb-4 ${
        panelType === "admin"
          ? "text-white border-slate-700"
          : "text-brand-primary"
      }`}
    >
      Rebike{" "}
      {panelType === "admin" && (
        <span className="text-xs text-teal-400 font-normal">ADMIN</span>
      )}
    </div>
    <nav className="space-y-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          {item.icon} {item.name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

const PanelHeader = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-card-bg p-4 border-b flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      <div>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-600 hover:text-brand-primary font-semibold transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default function DashboardLayout({ navItems, panelType }) {
  const location = useLocation();

  // Logika yang lebih tangguh untuk menemukan item navigasi yang aktif
  const currentNavItem =
    navItems.find((item) => location.pathname.startsWith(item.path)) ||
    navItems[0];

  // Pastikan pageTitle tidak menyebabkan error jika currentNavItem tidak ditemukan
  const pageTitle = currentNavItem ? currentNavItem.name : "Dashboard";

  return (
    <div className="flex h-screen bg-panel-bg">
      <Sidebar navItems={navItems} panelType={panelType} />
      <div className="flex-1 flex flex-col">
        <PanelHeader title={pageTitle} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
