import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/auth/authSlice";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("mitra@example.com");
  const [password, setPassword] = useState("password");

  // This effect hook handles navigation after login state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.roles.includes("ROLE_ADMIN")) {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.roles.includes("ROLE_PARTNER")) {
        navigate("/mitra/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (role) => {
    const credentials = {
      // Use role-specific email for the demo
      email: role === "admin" ? "admin@example.com" : email,
      password: password,
    };
    // Dispatch the action with only serializable data
    dispatch(loginRequest({ credentials }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-1 text-teal-600 font-poppins">
          Login Panel
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Masuk sebagai Admin atau Mitra.
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email (for Mitra login)
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-slate-400 mt-1">
              Hint: Use 'admin@example.com' and 'password' for Admin login.
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => handleLogin("mitra")}
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition font-semibold shadow-md disabled:bg-slate-400"
            >
              {loading ? "Logging in..." : "Login sebagai Mitra"}
            </button>
            <button
              type="button"
              onClick={() => handleLogin("admin")}
              disabled={loading}
              className="w-full bg-slate-700 text-white py-2.5 rounded-lg hover:bg-slate-800 transition font-semibold shadow-md disabled:bg-slate-400"
            >
              {loading ? "Logging in..." : "Login sebagai Admin"}
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-teal-600 transition"
            >
              Kembali ke Halaman Utama
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
