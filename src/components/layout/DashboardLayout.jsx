import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { LogOut, MoreHorizontal, Bell, Menu } from "lucide-react";
import Logo3 from "@/assets/logo3.png";
import { useState, useEffect } from "react";

const Sidebar = ({ navItems, isCollapsed }) => {
  const { user } = useSelector((state) => state.auth);
  const basePath = user?.roles?.includes("ROLE_PARTNER") ? "/mitra" : "/admin";

  const renderNavSection = (title, items) => (
    <div>
      {!isCollapsed && (
        <p className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-slate-400">
          {title}
        </p>
      )}
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path.endsWith("dashboard")}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""} ${
              isCollapsed ? "justify-center" : ""
            }`
          }
        >
          <item.icon size={20} className="text-slate-500" />
          {!isCollapsed && <span>{item.name}</span>}
        </NavLink>
      ))}
    </div>
  );

  return (
    <aside
      id={user?.roles?.includes("ROLE_PARTNER") ? "mitra-sidebar" : "admin-sidebar"}
      className={`bg-white border-r border-slate-300 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-300">
        <div className="flex items-center gap-2">
          <img src={Logo3} alt="Rebike Logo" className="h-15 w-20" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-brand-primary">ReBike</span>
          )}
        </div>
        {!isCollapsed && (
          <button className="relative text-slate-500 hover:text-slate-800">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
      </div>
      <div className="p-4">
        {!isCollapsed && (
          <p className="text-xs font-semibold uppercase text-slate-400 mb-2">
            Account
          </p>
        )}
        <div
          className={`flex items-center gap-3 p-2 border border-slate-300 rounded-lg bg-slate-50 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.firstName || user?.username || "A"
            }&background=c7d2fe&color=4338ca`}
            alt="User Avatar"
            className="w-9 h-9 rounded-full"
          />
          {!isCollapsed && (
            <div className="flex-grow">
              <p className="font-semibold text-sm text-slate-800">
                {user?.firstName || user?.username || "Pengguna"}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <span className="text-xs font-medium bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
              {user?.roles?.includes("ROLE_PARTNER") ? "Mitra" : "Admin"}
            </span>
          )}
        </div>
      </div>
      <nav className="flex-grow overflow-y-auto">
        {navItems.navigate && renderNavSection("Navigate", navItems.navigate)}
        {navItems.account && renderNavSection("Account", navItems.account)}
        {navItems.subscriptions &&
          renderNavSection("Subscriptions", navItems.subscriptions)}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.firstName || user?.username || "A"
            }&background=c7d2fe&color=4338ca`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          {!isCollapsed && (
            <div className="flex-grow">
              <p className="font-semibold text-sm text-slate-800">
                {user?.firstName || user?.username || "Pengguna"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="text-slate-500 hover:text-slate-800">
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

const PanelHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white p-4 border-b border-slate-200 flex justify-between items-center shadow-sm">
      <button
        onClick={toggleSidebar}
        className="text-slate-600 hover:text-slate-800"
      >
        <Menu size={24} />
      </button>
      <button
        onClick={handleLogout}
        className="text-sm text-slate-600 hover:text-danger font-semibold transition flex items-center gap-2 bg-slate-100 hover:bg-red-100 px-3 py-2 rounded-lg"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default function DashboardLayout({ navItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint is 768px
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar navItems={navItems} isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PanelHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
