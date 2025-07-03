import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { useState } from "react";
import LogoutConfirmationModal from "../ui/LogoutConfirmationModal";

const Sidebar = ({ navItems, panelType }) => {
  const { user } = useSelector((state) => state.auth);
  const baseUrl = user?.roles?.includes("ROLE_PARTNER") ? "/mitra" : "/admin";

  const renderNavSection = (title, items ) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <p className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-slate-400">{title}</p>
        {items.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path.endsWith('dashboard')}
          className={({ isActive }) => `sidebar-link flex items-center gap-3 text-sm ${isActive ? 'active' : ''}`}>
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    )
  };
  return (
    <aside
      id={`${panelType}-sidebar`}
      className={`w-64 flex-shrink-0 p-4 ${
        panelType === "admin" ? "bg-slate-800 text-white" : "bg-card-bg shadow-lg"
      }`}
    >
      <div
        className={`text-2xl font-extrabold font-poppins mb-2 border-b pb-4 ${
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

      <nav className="flex flex-col h-[calc(100%-60px)] justify-between">
        <div>
          {/* Panggil helper untuk setiap seksi */}
          {renderNavSection("Navigate", navItems.navigate)}
          {renderNavSection("Subscriptions", navItems.subscriptions)}
        </div>
        <div>
          {renderNavSection("Account", navItems.account)}
        </div>
      </nav>
    </aside>
  );
};

const PanelHeader = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeLogoutModal();
  };

  return (
    <header className="bg-card-bg p-4 border-b flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      <div>
        <button
          onClick={openLogoutModal}
          className="text-sm text-slate-600 hover:text-brand-primary font-semibold transition"
        >
          Logout
        </button>
      </div>
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </header>
  );
};

export default function DashboardLayout({ navItems, panelType }) {
  const location = useLocation();

  const allNavItems = Object.values(navItems).flat();

  const currentNavItem =
    allNavItems.find((item) => location.pathname.startsWith(item.path)) ||
    allNavItems[0];

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
