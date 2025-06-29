import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MitraPanel from "./pages/MitraPanel.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

// Mitra Panel Sections
import MitraDashboard from "./features/mitra/MitraDashboard.jsx";
import PesananManagement from "./features/mitra/PesananManagement.jsx";
import ArmadaManagement from "./features/mitra/ArmadaManagement.jsx";
import Laporan from "./features/mitra/Laporan.jsx";
import Profil from "./features/mitra/Profil.jsx";

// Admin Panel Sections
import AdminDashboard from "./features/admin/AdminDashboard.jsx";
import UserManagement from "./features/admin/UserManagement.jsx";
import TransactionManagement from "./features/admin/TransactionManagement.jsx";
import ContentManagement from "./features/admin/ContentManagement.jsx";
import FinanceManagement from "./features/admin/FinanceManagement.jsx";

function App() {
  // ... (sisa kode sama)
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/mitra" element={<MitraPanel />}>
        <Route index element={<MitraDashboard />} />
        <Route path="dashboard" element={<MitraDashboard />} />
        <Route path="pesanan" element={<PesananManagement />} />
        <Route path="armada" element={<ArmadaManagement />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="profil" element={<Profil />} />
      </Route>

      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="pengguna" element={<UserManagement />} />
        <Route path="transaksi" element={<TransactionManagement />} />
        <Route path="konten" element={<ContentManagement />} />
        <Route path="keuangan" element={<FinanceManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
