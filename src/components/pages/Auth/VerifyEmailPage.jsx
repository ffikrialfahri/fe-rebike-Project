import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom"; // 'Navigate' ditambahkan di sini
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  verifyEmailRequest,
  resendOtpRequest,
  resetAuthStatus,
} from "@/store/auth/authSlice";
import CountdownTimer from "@/components/ui/CountdownTimer";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { mutationLoading, error, verifySuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (verifySuccess) {
      toast.success("Verifikasi berhasil! Silakan login.");
      dispatch(resetAuthStatus());
      navigate("/");
    }
  }, [verifySuccess, navigate, dispatch]);

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP harus 6 digit.");
      return;
    }
    dispatch(verifyEmailRequest({ email, otp }));
  };

  const handleResend = () => {
    dispatch(resendOtpRequest({ email }));
    toast.success("OTP baru telah dikirim ke email Anda.");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-teal-600">
          Verifikasi Email Anda
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Kami telah mengirimkan kode OTP 6 digit ke <strong>{email}</strong>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Kode OTP
            </label>
            <input
              type="text"
              id="otp"
              maxLength="6"
              className="w-full px-4 py-2 text-center text-2xl tracking-[.5em] border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={mutationLoading}
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition font-semibold disabled:bg-slate-400"
          >
            {mutationLoading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>
        <CountdownTimer
          initialSeconds={60}
          onTimeout={() => toast.info("Waktu habis, silakan kirim ulang OTP.")}
          onResend={handleResend}
        />
      </div>
    </section>
  );
}