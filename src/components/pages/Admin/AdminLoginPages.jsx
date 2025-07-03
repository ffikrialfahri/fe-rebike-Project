import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth/authSlice";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user?.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      setValidationError("Email dan password tidak boleh kosong.");
      return;
    }
    setValidationError("");
    dispatch(loginUser({ credentials: { email, password } }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-1 text-slate-700 font-poppins">
          Login Admin
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Manajemen Platform Rebike.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {validationError && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {validationError}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-700 text-white py-2.5 rounded-lg hover:bg-slate-800 transition font-semibold shadow-md disabled:bg-slate-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-slate-500 hover:text-slate-600 transition"
            >
              Bukan Admin? Kembali
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}