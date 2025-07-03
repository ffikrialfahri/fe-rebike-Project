import { 
  AreaChart, Car, LayoutDashboard, Package, History, Users, Receipt, User, 
  Settings, FileText, Banknote, ShieldCheck 
} from "lucide-react";


export const mitraNavItems = {
    navigate: [
        { name: 'Dasbor', path: '/mitra/dashboard', icon: LayoutDashboard },
        { name: 'Transaksi', path: '/mitra/transaction', icon: Package },
        { name: 'Armada', path: '/mitra/armada', icon: Car },
        { name: 'Laporan', path: '/mitra/laporan', icon: AreaChart },
        { name: 'Riwayat', path: '/mitra/history', icon: History },
    ],
    account: [
      { name: "Pengaturan Akun", path: "/mitra/profil", icon: Settings }
    ],
    subscriptions: [
      { name: "Billing", path: "/mitra/billing", icon: Receipt }
    ],
};

export const adminNavItems = {
    navigate: [
        { name: 'Dasbor', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Manajemen User', path: '/admin/pengguna', icon: Users },
        { name: 'Manajemen Transaksi', path: '/admin/transaksi', icon: Package },
        { name: 'Keuangan', path: '/admin/keuangan', icon: Banknote },
        { name: 'Manajemen Konten', path: '/admin/konten', icon: FileText },
    ],
    account: [
      { name: "Verifikasi Mitra", path: "/admin/verifikasi", icon: ShieldCheck },
      { name: "Pengaturan Akun", path: "/admin/profil", icon: Settings }
    ],
};