// File: src/components/pages/Login/LoginPage.jsx

import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/store/auth/authSlice";
import Logo3 from "@/assets/logo3.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Format email tidak valid").required("Email tidak boleh kosong"),
  password: yup.string().required("Password tidak boleh kosong").min(8, "Password minimal 8 karakter"),
});

const InputField = ({ id, label, type, placeholder, hint, register, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-slate-700 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
        error ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-teal-500"
      }`}
      placeholder={placeholder}
      {...register(id)}
    />
    {hint && !error && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

const AuthButton = ({ disabled, children, className = "" }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`w-full font-bold py-3 rounded-lg transition shadow-md active:scale-95 ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

export default function LoginPage({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(); // Reset form fields when modal opens
    }
  }, [isOpen, reset]);

  const handleLoginSubmit = (data) => {
    dispatch(
      loginRequest({
        credentials: { email: data.email, password: data.password },
        onSuccess: () => {
          navigate("/mitra", { replace: true });
          onClose();
        },
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-2xl font-bold"
        >
          &times;
        </button>
        <div
          className="hidden md:flex w-2/5 p-8 items-center justify-center bg-cover bg-center rounded-l-lg"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>

        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">
            Welcome to <span className="text-orange-500">ReBike</span>
          </h2>
          <p className="text-slate-600 mb-6">
            Kelola bisnismu dengan lebih mudah dengan e-panel
          </p>

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField
              id="email"
              label="*email"
              type="email"
              placeholder="masukan email"
              hint="email harus menggunakan '@'"
              register={register}
              error={errors.email}
            />
            <InputField
              id="password"
              label="*password"
              type="password"
              placeholder="********"
              hint="password minimal 8 karakter"
              register={register}
              error={errors.password}
            />

            {reduxError && (
              <p className="text-red-500 text-sm mb-4 text-center animate-pulse">
                {reduxError}
              </p>
            )}

            <AuthButton
              disabled={loading}
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