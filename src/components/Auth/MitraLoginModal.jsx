import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/auth/authSlice";
import { X, Eye, EyeOff } from "lucide-react";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 4.983 29.637 2.5 24 2.5C11.318 2.5 2.5 11.318 2.5 24s8.818 21.5 21.5 21.5S45.5 36.682 45.5 24c0-1.572-.154-3.085-.436-4.564z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-1.645 3.119-2.659 6.654-2.659 10.309s1.014 7.19 2.659 10.309l7.707-6.096c-.36-1.127-.55-2.316-.55-3.55S13.653 19.7 14.013 18.568L6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 45.5c5.637 0 10.524-2.483 14.804-6.389l-7.961-6.289c-2.119 1.885-4.902 3.039-7.961 3.039c-5.223 0-9.657-3.343-11.303-8l-7.707 6.096C10.14 40.518 16.637 45.5 24 45.5z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083L43.595 20L24 20v8h11.303a12.04 12.04 0 0 1-4.087 5.571l7.961 6.289c4.71-4.285 7.788-10.742 7.788-18.286c0-1.572-.154-3.085-.436-4.564z"
    />
  </svg>
);

const MitraLoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("mitra@example.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated && user?.roles.includes("ROLE_PARTNER")) {
      navigate("/mitra/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginRequest({ credentials: { email, password } }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center mb-6 text-center">
            <img
              src="/vite.svg"
              alt="ReBike Logo"
              className="h-12 w-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-slate-800">Login Mitra</h2>
            <p className="text-slate-500 text-sm mt-1">
              Kelola bisnis rental Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-slate-700 text-sm font-bold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-slate-300 rounded-lg w-full py-2.5 px-4"
                placeholder="masukan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-slate-700 text-sm font-bold mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border border-slate-300 rounded-lg w-full py-2.5 px-4"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3 px-4 rounded-lg"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-sm">
              atau
            </span>
            <div className="flex-grow border-t border-slate-300"></div>
          </div>

          <a
            href="http://localhost:8083/oauth2/authorization/google"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-semibold"
          >
            <GoogleIcon />
            <span>Lanjutkan dengan Google</span>
          </a>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-brand-primary font-semibold hover:underline"
              >
                Registrasi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MitraLoginModal;