import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  verifyEmail,
  resendOtp,
  resetAuthStatus,
} from "../../store/auth/authSlice"; // Adjust path as needed
import CountdownTimer from "../ui/CountdownTimer"; // Adjust path as needed
import { MailCheck, X } from 'lucide-react';

export default function VerifyEmailModal({ isOpen, onClose, email }) {
  const [otp, setOtp] = useState("");
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const dispatch = useDispatch();
  const { mutationLoading, error, verifySuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (verifySuccess) {
      toast.success("Verifikasi berhasil! Admin dapat login.");
      dispatch(resetAuthStatus());
      onClose(); // Close modal on success
    }
  }, [verifySuccess, dispatch, onClose]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setOtp("");
      setIsOtpExpired(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP harus 6 digit.");
      return;
    }
    dispatch(verifyEmail({ email, otp }));
  };

  const handleResend = () => {
    dispatch(resendOtp({ email }));
    setOtp(""); // Clear OTP after resend
    setIsOtpExpired(false); // Reset expired status
    toast.success("OTP baru telah dikirim ke email admin.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <MailCheck className="w-8 h-8 text-teal-600" />
            <h2 className="text-2xl font-extrabold text-teal-600">
              Verifikasi Email Admin
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-center text-slate-500 mb-6">
          Kami telah mengirimkan kode OTP 6 digit ke <strong>{email}</strong>.
        </p>
        {!isOtpExpired ? (
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
        ) : (
          <div className="text-center space-y-4">
            <p className="text-red-500">Waktu OTP telah habis.</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={mutationLoading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-slate-400"
            >
              {mutationLoading ? "Mengirim Ulang..." : "Kirim Ulang OTP"}
            </button>
          </div>
        )}
        {!isOtpExpired && (
          <CountdownTimer
            initialSeconds={60}
            onTimeout={() => setIsOtpExpired(true)}
            onResend={handleResend}
          />
        )}
      </div>
    </div>
  );
}
