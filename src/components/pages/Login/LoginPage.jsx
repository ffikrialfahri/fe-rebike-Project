import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link dari react-router-dom

// Komponen InputField untuk reuseability
const InputField = ({ id, label, type, value, onChange, placeholder, hint }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
  </div>
);

// Komponen Button untuk reuseability
const AuthButton = ({ onClick, disabled, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-2.5 rounded-lg font-semibold shadow-md transition duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export default function LoginPage() {
  const navigate = useNavigate();

  // Menggunakan state lokal untuk simulasi loading dan error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("mitra@example.com"); // Default value for demo
  const [password, setPassword] = useState("password");   // Default value for demo

  // Mengatur simulasi login
  const handleLogin = (role) => {
    setLoading(true);
    setError(null); // Reset error on new login attempt

    // Simulasi penundaan API
    setTimeout(() => {
      if (email === "mitra@example.com" && password === "password" && role === "mitra") {
        setLoading(false);
        // Simulasi navigasi ke dashboard mitra
        navigate("/mitra/dashboard", { replace: true });
      } else if (email === "admin@example.com" && password === "password" && role === "admin") {
        setLoading(false);
        // Simulasi navigasi ke dashboard admin
        navigate("/admin/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError("Email atau kata sandi salah. Silakan coba lagi.");
      }
    }, 1500); // Simulasi loading selama 1.5 detik
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-panel-bg p-4 sm:p-6">
      <div className="flex bg-card-bg rounded-xl shadow-xl overflow-hidden w-full max-w-5xl">
        {/* Bagian Kiri: Ilustrasi */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-brand-primary to-teal-400 items-center justify-center p-8 relative">
          <img
            src="https://placehold.co/600x400/ccfbf1/0d9488?text=Selamat+Datang+di+ReBike" // Placeholder image
            alt="Ilustrasi Selamat Datang"
            className="w-full max-w-md h-auto rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/ccfbf1/0d9488?text=ReBike+Ilustrasi"}} // Fallback image
          />
          <div className="absolute bottom-8 text-center text-white text-lg font-semibold">
            "Kelola bisnismu lebih mudah dengan e-panel ReBike!"
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center mb-2 text-brand-primary font-poppins">
            Selamat Datang Kembali
          </h2>
          <p className="text-center text-text-light mb-8">
            Masuk ke panel Anda sebagai Admin atau Mitra.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <InputField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              hint="Gunakan 'mitra@example.com' untuk Mitra; 'admin@example.com' untuk Admin"
            />

            <InputField
              id="password"
              label="Kata Sandi"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi Anda"
              hint="Gunakan 'password' untuk semua peran"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center animate-pulse">
                {error}
              </p>
            )}

            <AuthButton
              onClick={() => handleLogin("mitra")}
              disabled={loading}
              className="bg-brand-primary text-white hover:bg-teal-700"
            >
              {loading ? "Memuat..." : "Login sebagai Mitra"}
            </AuthButton>

            <AuthButton
              onClick={() => handleLogin("admin")}
              disabled={loading}
              className="bg-text-dark text-white hover:bg-slate-700"
            >
              {loading ? "Memuat..." : "Login sebagai Admin"}
            </AuthButton>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-text-light hover:text-brand-primary transition duration-150 ease-in-out"
            >
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

