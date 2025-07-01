import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo3 from "@/assets/logo3.png"; // Pastikan path ini benar

// Komponen InputField untuk input form yang reusable
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

// Komponen AuthButton untuk tombol submit yang reusable
const AuthButton = ({ disabled, children, className = "" }) => (
  <button
    type="submit" // Penting: type="submit" agar form bisa disubmit
    disabled={disabled}
    className={`w-full font-bold py-3 rounded-lg transition shadow-md ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

// Komponen utama LoginPage yang akan menjadi modal
// Menerima props isOpen (boolean) dan onClose (fungsi untuk menutup modal)
export default function LoginPage({ isOpen, onClose }) {
  const navigate = useNavigate();

  // State untuk menangani loading dan error saat proses login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State untuk input email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Efek untuk mereset error saat modal dibuka atau ditutup
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  // Fungsi untuk menangani proses login (mockup)
  // Sekarang hanya menangani login mitra
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman default dari form submit

    setLoading(true);
    setError(null);

    // Simulasi panggilan API dengan setTimeout
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Logika validasi dan navigasi mockup untuk mitra
    if (email === "mitra@example.com" && password === "password") {
      setLoading(false);
      navigate("/mitra/dashboard", { replace: true }); // Navigasi ke dashboard mitra
      onClose(); // Tutup modal setelah berhasil login
    } else {
      setLoading(false);
      setError("Email atau kata sandi salah. Silakan coba lagi.");
    }
  };

  // Jika modal tidak terbuka, jangan render apa-apa
  if (!isOpen) return null;

  return (
    // Overlay modal
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-[999] p-4"
      onClick={onClose} // Tutup modal saat klik di luar
    >
      {/* Konten modal utama */}
      <div
        className="bg-white rounded-lg shadow-2xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Cegah event klik menyebar ke overlay
      >
        {/* Kolom Kiri (Logo) - Sesuai desain Figma */}
        <div className="hidden md:flex w-2/5 p-8 items-center justify-center bg-white rounded-l-lg">
          <img src={Logo3} alt="Rebike Logo" className="w-full max-w-[200px]" />
        </div>

        {/* Kolom Kanan (Form Login) - Sesuai desain Figma */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">
            Welcome to{" "}
            <span className="text-orange-500">ReBike</span>
          </h2>
          <p className="text-slate-600 mb-6">
            Kelola bisnismu dengan lebih mudah dengan e-panel
          </p>

          {/* Form Login - onSubmit akan memanggil handleLoginSubmit */}
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
              hint="password minimal 8 character"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center animate-pulse">
                {error}
              </p>
            )}

            {/* Tombol Login (sekarang hanya satu tombol "Login") */}
            <AuthButton
              disabled={loading}
              className="bg-teal-500 text-white hover:bg-teal-600" // Kelas disesuaikan
            >
              {loading ? "Memuat..." : "Login"} {/* Teks tombol menjadi "Login" */}
            </AuthButton>
          </form>

          <p className="text-center text-slate-600 text-sm mt-6">
            Don't have an Account?{" "}
            <Link to="/register" className="text-teal-600 hover:underline">
              Registrasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
