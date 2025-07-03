import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/auth/authSlice";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutationLoading, error } = useSelector((state) => state.auth);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok.");
      return;
    }
    dispatch(
      resetPassword({
        token,
        newPassword,
        onComplete: () => navigate("/login"),
      })
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-1 text-teal-600 font-poppins">
          Atur Ulang Password
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Masukkan password baru Anda.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password Baru
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
            {mutationLoading ? "Menyimpan..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
