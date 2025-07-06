import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "@/store/auth/authSlice";
import RegisterLayout from "@/components/layout/RegisterLayout";
import LoginPage from "@/components/pages/Login/LoginPage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserPlus, ChevronLeft } from 'lucide-react';

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Nama depan tidak boleh kosong"),
  lastName: yup.string().required("Nama belakang tidak boleh kosong"),
  username: yup
    .string()
    .required("Username tidak boleh kosong")
    .min(6, "Username minimal 6 karakter")
    .matches(/^\S*$/, "Username tidak boleh mengandung spasi"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email tidak boleh kosong"),
  password: yup
    .string()
    .required("Password tidak boleh kosong")
    .min(8, "Password minimal 8 karakter"),
  phoneNumber: yup
    .string()
    .required("Nomor telepon tidak boleh kosong")
    .matches(/^\d+$/, "Nomor telepon hanya boleh berisi angka"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "Anda harus menyetujui Syarat & Ketentuan"),
});

const InputField = ({ id, label, type, placeholder, hint, register, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold mb-1 text-slate-600">
      {label}
    </label>
    <input
      name={id}
      type={type}
      className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        error ? "border-red-500" : "border-slate-300"
      }`}
      placeholder={placeholder}
      {...register(id)}
    />
    {hint && !error && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

// --- Komponen Utama RegisterPage ---
export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutationLoading, error: reduxError } = useSelector((state) => state.auth);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    const { ...userData } = data;
    const completeUserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      phoneNumber: `+62${userData.phoneNumber}`,
      locationName: "",
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "",
    };

    dispatch(
      registerUser({
        userData: completeUserData,
        onComplete: () => {
          navigate("/verify-email", { state: { email: completeUserData.email } });
          reset();
        },
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
            backgroundImage: "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>

        {/* Kolom Kanan: Form Registrasi */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-8 flex justify-between items-center ml-0">
              <button
                onClick={() => navigate('/')}
                className="text-slate-500 rounded-full hover:bg-slate-100 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="text-sm text-slate-500">
                <span>Sudah punya akun? </span>
                <button
                  onClick={openLoginModal}
                  className="font-semibold text-brand-primary hover:underline"
                >
                  Login di sini
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <UserPlus className="w-8 h-8 text-brand-primary" />
              <h2 className="text-3xl font-bold">Registrasi</h2>
            </div>
            <p className="text-slate-500 mb-6">
              Daftar Sekarang dan Biarkan Kami yang Mencari Pelanggan untuk Anda.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                id="firstName"
                label="Nama Depan"
                type="text"
                placeholder="Masukkan nama depan"
                register={register}
                error={errors.firstName}
              />
              <InputField
                id="lastName"
                label="Nama Belakang"
                type="text"
                placeholder="Masukkan nama belakang"
                register={register}
                error={errors.lastName}
              />
              <InputField
                id="username"
                label="Nama Pengguna (username)"
                type="text"
                placeholder="Masukkan username"
                hint="Minimal 6 karakter, tanpa spasi."
                register={register}
                error={errors.username}
              />

              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="Masukkan email"
                register={register}
                error={errors.email}
              />

              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="********"
                hint="Minimal 8 karakter."
                register={register}
                error={errors.password}
              />

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
                    className={`w-full p-2.5 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      errors.phoneNumber ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="81234567890"
                    {...register("phoneNumber")}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {reduxError && (
                <p className="text-sm text-red-500 text-center">{reduxError}</p>
              )}

              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  className={`h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary ${
                    errors.agreeTerms ? "border-red-500" : ""
                  }`}
                  {...register("agreeTerms")}
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
              {errors.agreeTerms && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.agreeTerms.message}
                </p>
              )}
              <button
                type="submit"
                disabled={mutationLoading}
                className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {mutationLoading ? "Mendaftar..." : "Registrasi"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </RegisterLayout>
  );
}
