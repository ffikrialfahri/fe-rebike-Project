import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import MitraInfoPage from "./components/pages/Mitra/MitraInfoPage.jsx";
import { setShowMitraInfoModal, setShowLoginModal } from "./store/auth/authSlice";

// Layout Panel
import AdminPanel from "./components/pages/Admin/AdminPanel.jsx";

import LandingPage from "./components/pages/LandingPage/LandingPage.jsx";
import RegisterPage from "./components/pages/Registrasi/RegistrasiPage.jsx";
import LoginPage from "./components/pages/Login/LoginPage.jsx";

// Komponen dan Halaman Otentikasi
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import ForgotPasswordPage from "./components/pages/Auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./components/pages/Auth/ResetPasswordPage.jsx";
import VerifyEmailPage from "./components/pages/Auth/VerifyEmailPage.jsx";
import SsoCallbackPage from "./components/pages/Auth/SsoCallbackPage.jsx";



// Fitur Panel Admin
import AdminDashboard from "./features/admin/AdminDashboard.jsx";
import PartnerManagement from "./features/admin/PartnerManagement.jsx";
import UserManagement from "./features/admin/UserManagement.jsx";
import TransactionManagement from "./features/admin/Transaction.jsx";
import HistoryAdmin from "./features/admin/History.jsx";
import KeuanganAdmin from "./features/admin/Keuangan.jsx";
import ProfileSettingAdmin from "./features/admin/ProfileSetting.jsx";

function App() {
  const dispatch = useDispatch();
  const { showMitraInfoModal, showLoginModal } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* --- RUTE PUBLIK & OTENTIKASI --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/auth/sso-callback" element={<SsoCallbackPage />} />

        {/* --- RUTE ADMIN --- */}
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
          <Route path="history" element={<HistoryAdmin />} />
          <Route path="keuangan" element={<KeuanganAdmin />} />
          <Route path="profil" element={<ProfileSettingAdmin />} />
        </Route>
      </Routes>

      <MitraInfoPage
        isOpen={showMitraInfoModal}
        onClose={() => dispatch(setShowMitraInfoModal(false))}
      />
      <LoginPage
        isOpen={showLoginModal}
        onClose={() => dispatch(setShowLoginModal(false))}
      />
    </>
  );
}

export default App;

