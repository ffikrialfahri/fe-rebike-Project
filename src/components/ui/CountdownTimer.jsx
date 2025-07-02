import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function CountdownTimer({ initialSeconds, onResend, onTimeout }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Jangan mulai timer jika sudah 0
    if (seconds <= 0) {
      setCanResend(true);
      if (onTimeout) {
          // Hanya panggil onTimeout jika timer benar-benar habis, bukan saat inisialisasi
          if (seconds === 0) onTimeout();
      }
      return;
    }

    // Set canResend menjadi false saat timer berjalan
    setCanResend(false);

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // Bersihkan interval saat komponen di-unmount atau timer selesai
    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  const handleResendClick = useCallback(() => {
    if (canResend) {
      setSeconds(initialSeconds); // Reset timer
      setCanResend(false);
      onResend(); // Panggil fungsi resend dari props
    } else {
        toast.error(`Harap tunggu ${seconds} detik sebelum mengirim ulang.`);
    }
  }, [canResend, initialSeconds, onResend]);

  return (
    <div className="mt-6 text-center text-sm">
      {canResend ? (
        <p className="text-slate-500">
          Tidak menerima kode?{" "}
          <button
            type="button"
            onClick={handleResendClick}
            className="font-semibold text-teal-600 hover:underline"
          >
            Kirim ulang
          </button>
        </p>
      ) : (
        <p className="text-slate-500">
          Kirim ulang kode dalam <strong>{seconds}</strong> detik
        </p>
      )}
    </div>
  );
}