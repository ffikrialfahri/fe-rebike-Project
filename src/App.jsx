import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout dan Halaman Publik
import LandingPage from "./components/pages/LandingPage/LandingPage.jsx";
import RegisterPage from "./components/pages/Registrasi/RegistrasiPage.jsx";
import AdminLoginPage from "./components/pages/Admin/AdminLoginPages.jsx";

// Komponen dan Halaman Otentikasi
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import ForgotPasswordPage from "./components/pages/Auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./components/pages/Auth/ResetPasswordPage.jsx";
import VerifyEmailPage from "./components/pages/Auth/VerifyEmailPage.jsx";
import SsoCallbackPage from "./components/pages/Auth/SsoCallbackPage.jsx";

// Layout Panel
import MitraPanel from "./components/pages/Mitra/MitraPanel.jsx";
import AdminPanel from "./components/pages/Admin/AdminPanel.jsx";

// Fitur Panel
import MitraDashboard from "./features/mitra/MitraDashboard.jsx";
import PesananManagement from "./features/mitra/PesananManagement.jsx";
import ArmadaManagement from "./features/mitra/ArmadaManagement.jsx";
import Laporan from "./features/mitra/Laporan.jsx";
import Profil from "./features/mitra/Profil.jsx";
import AdminDashboard from "./features/admin/AdminDashboard.jsx";
import UserManagement from "./features/admin/UserManagement.jsx";
import TransactionManagement from "./features/admin/TransactionManagement.jsx";
import ContentManagement from "./features/admin/ContentManagement.jsx";
import FinanceManagement from "./features/admin/FinanceManagement.jsx";

function App() {
  return (
    <>
    <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    <Routes>
      {/* --- RUTE PUBLIK & OTENTIKASI --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Hapus rute /login karena sekarang ditangani modal */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      
      <Route path="/login/admin" element={<AdminLoginPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/auth/sso-callback" element={<SsoCallbackPage />} />

      {/* --- RUTE PANEL MITRA (DILINDUNGI) --- */}
      <Route
        path="/mitra"
        element={
          <ProtectedRoute requiredRole="ROLE_PARTNER">
            <MitraPanel />
          </ProtectedRoute>
        }
      >
        <Route index element={<MitraDashboard />} />
        <Route path="dashboard" element={<MitraDashboard />} />
        <Route path="pesanan" element={<PesananManagement />} />
        <Route path="armada" element={<ArmadaManagement />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="profil" element={<Profil />} />
      </Route>

      {/* --- RUTE PANEL ADMIN (DILINDUNGI) --- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ROLE_ADMIN">
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="pengguna" element={<UserManagement />} />
        <Route path="transaksi" element={<TransactionManagement />} />
        <Route path="konten" element={<ContentManagement />} />
        <Route path="keuangan" element={<FinanceManagement />} />
      </Route>
    </Routes>
    </>
    
  );
}

export default App;