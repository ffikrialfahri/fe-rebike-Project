import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerRequest } from "@/store/auth/authSlice";
import RegisterLayout from "@/components/layout/RegisterLayout";
import LoginPage from "@/components/pages/Login/LoginPage";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { mutationLoading, error } = useSelector((state) => state.auth);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // State untuk data form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    agreeTerms: false,
  });

  // Handler untuk mengubah state form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Validasi agar input nomor telepon hanya menerima angka
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      toast.error("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const { agreeTerms, ...userData } = formData;
    dispatch(
      registerRequest({
        userData: { ...userData, phoneNumber: `+62${userData.phoneNumber}` },
        // Setelah registrasi berhasil, buka modal login
        onComplete: () => openLoginModal(),
      })
    );
  };

  return (
    <RegisterLayout>
      <div className="flex min-h-screen">
        {/* Kolom Kiri: Gambar Latar */}
        <div
          className="hidden lg:flex w-1/2 items-center justify-center p-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 w-1/2 bg-black/50"></div>
          <div className="relative text-white text-left">
            <h1 className="text-5xl font-extrabold font-poppins leading-tight">
              Siap Kembangkan <br /> Usahamu?
            </h1>
            <p className="mt-4 text-2xl font-semibold">
              Ayo Jadi Mitra Rebike!
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Form Registrasi */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-right mb-4">
              <span className="text-sm text-slate-500">Sudah punya akun? </span>
              <button
                onClick={openLoginModal}
                className="text-sm font-semibold text-brand-primary hover:underline"
              >
                Login di sini
              </button>
            </div>
            <h2 className="text-3xl font-bold mb-2">Registrasi</h2>
            <p className="text-slate-500 mb-6">
              Daftar Sekarang dan Biarkan Kami yang Mencari Pelanggan untuk
              Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Username */}
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-600">
                  Nama Pengguna (username)
                </label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  Minimal 6 karakter, tanpa spasi.
                </p>
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-600">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Input Password */}
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-600">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  Minimal 8 karakter.
                </p>
              </div>

              {/* Input Nomor Telepon */}
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-600">
                  No. Telepon Aktif
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-slate-900 bg-slate-200 border border-r-0 border-slate-300 rounded-l-lg">
                    +62
                  </span>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="81234567890"
                    required
                  />
                </div>
              </div>

              {/* Menampilkan pesan error dari Redux */}
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              {/* Checkbox Syarat & Ketentuan */}
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.agreeTerms}
                  className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Saya setuju dengan{" "}
                  <a
                    href="#"
                    className="font-medium text-brand-primary hover:underline"
                  >
                    Syarat & Ketentuan
                  </a>
                </label>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={mutationLoading}
                className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {mutationLoading ? "Mendaftar..." : "Registrasi"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Render modal login di sini */}
      <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </RegisterLayout>
  );
}