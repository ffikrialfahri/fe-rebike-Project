// File: src/components/pages/Login/LoginPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { loginRequest } from "@/store/auth/authSlice"; // Import Redux action
import Logo3 from "@/assets/logo3.png";

const InputField = ({ id, label, type, value, onChange, placeholder, hint }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-slate-700 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
    {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
  </div>
);

const AuthButton = ({ disabled, children, className = "" }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`w-full font-bold py-3 rounded-lg transition shadow-md ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

export default function LoginPage({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isAuthenticated && user?.roles?.includes("ROLE_PARTNER")) {
      navigate("/mitra/dashboard", { replace: true });
      onClose();
    }
  }, [isAuthenticated, user, navigate, onClose, isOpen]);


  // Handler untuk submit form, sekarang menggunakan Redux
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ credentials: { email, password } }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Konten modal utama */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kolom Kiri (Logo) */}
        <div className="hidden md:flex w-2/5 p-8 items-center justify-center bg-white rounded-l-lg">
          <img src={Logo3} alt="Rebike Logo" className="w-full max-w-[200px]" />
        </div>

        {/* Kolom Kanan (Form Login) */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">
            Welcome to <span className="text-orange-500">ReBike</span>
          </h2>
          <p className="text-slate-600 mb-6">
            Kelola bisnismu dengan lebih mudah dengan e-panel
          </p>

          <form onSubmit={handleLoginSubmit}>
            <InputField
              id="email"
              label="*email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="masukan email"
              hint="email harus menggunakan '@'"
            />
            <InputField
              id="password"
              label="*password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              hint="password minimal 8 karakter"
            />

            {/* Tampilkan error dari Redux store */}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center animate-pulse">
                {error}
              </p>
            )}

            <AuthButton
              disabled={loading} // Ambil status loading dari Redux
              className="bg-teal-500 text-white hover:bg-teal-600"
            >
              {loading ? "Memuat..." : "Login"}
            </AuthButton>
          </form>

          <p className="text-center text-slate-600 text-sm mt-6">
            Don't have an Account?{" "}
            <Link
              to="/register"
              className="text-teal-600 hover:underline"
              onClick={onClose}
            >
              Registrasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}