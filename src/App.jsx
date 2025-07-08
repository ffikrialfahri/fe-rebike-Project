import { Routes, Route, Navigate } from "react-router-dom";
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

// Fitur Panel Mitra
import MitraDashboard from "./features/mitra/MitraDashboard.jsx";
import ArmadaManagement from "./features/mitra/ArmadaManagement.jsx";
import TransactionMitra from "./features/mitra/Transaction.jsx";
import LaporanMitra from "./features/mitra/Laporan.jsx";
import ProfilMitra from "./features/mitra/ProfileSetting.jsx";
import HistoryMitra from "./features/mitra/History.jsx";
import BillingMitra from "./features/mitra/Billing.jsx";

// Fitur Panel Admin
import AdminDashboard from "./features/admin/AdminDashboard.jsx";
import PartnerManagement from "./features/admin/PartnerManagement.jsx";
import UserManagement from "./features/admin/UserManagement.jsx";
import TransactionManagement from "./features/admin/Transaction.jsx";
import HistoryAdmin from "./features/admin/History.jsx";
import KeuanganAdmin from "./features/admin/Keuangan.jsx";
import ProfileSettingAdmin from "./features/admin/ProfileSetting.jsx";
import MitraVerificationPage from "./components/pages/Admin/MitraVerificationPage.jsx";
import PickupPointManagement from "./features/admin/PickupPointManagement.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* --- RUTE PUBLIK & OTENTIKASI --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/auth/sso-callback" element={<SsoCallbackPage />} />

        <Route
          path="/mitra"
          element={
            <ProtectedRoute requiredRole="ROLE_PARTNER">
              <MitraPanel />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/mitra/dashboard" replace />} />
          <Route path="dashboard" element={<MitraDashboard />} />
          <Route path="transaction" element={<TransactionMitra />} />
          <Route path="armada" element={<ArmadaManagement />} />
          <Route path="laporan" element={<LaporanMitra />} />
          <Route path="profil" element={<ProfilMitra />} />
          <Route path="history" element={<HistoryMitra />} />
          <Route path="billing" element={<BillingMitra />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="partners" element={<PartnerManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="transaksi" element={<TransactionManagement />} />
          <Route path="pickup-points" element={<PickupPointManagement />} />
          <Route path="history" element={<HistoryAdmin />} />
          <Route path="keuangan" element={<KeuanganAdmin />} />
          <Route path="profil" element={<ProfileSettingAdmin />} />
          <Route path="mitra-verification" element={<MitraVerificationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
