import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "@/store/auth/authSlice";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { mutationLoading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    dispatch(
      forgotPasswordRequest({ email, onComplete: () => setIsSubmitted(true) })
    );
  };

  if (isSubmitted && !error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-panel-bg">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-center mb-2 text-teal-600">
            Periksa Email Anda
          </h2>
          <p className="text-slate-600">
            Jika email Anda terdaftar, kami telah mengirimkan link untuk mereset
            password. Silakan periksa kotak masuk (dan folder spam) Anda.
          </p>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-teal-600 hover:underline">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-1 text-teal-600 font-poppins">
          Lupa Password
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Masukkan email Anda untuk menerima link reset password.
        </p>
        <form onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="contoh@email.com"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={mutationLoading}
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition font-semibold shadow-md disabled:bg-slate-400"
          >
            {mutationLoading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-slate-500 hover:text-teal-600 transition"
            >
              Kembali ke Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
