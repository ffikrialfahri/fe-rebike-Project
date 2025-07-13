import { 
  AreaChart, Car, LayoutDashboard, Package, History, Users, Receipt, User, 
  Settings, FileText, Banknote, ShieldCheck, MapPin 
} from "lucide-react";


export const mitraNavItems = {
    navigate: [
        { name: 'Dasbor', path: '/mitra/dashboard', icon: LayoutDashboard },
        { name: 'Transaksi', path: '/mitra/transaction', icon: Package },
        { name: 'Manajement Product', path: '/mitra/armada', icon: Car },
        { name: 'Report & Finance', path: '/mitra/laporan', icon: AreaChart },
        { name: 'History', path: '/mitra/history', icon: History },
    ],
    account: [
      { name: "Pengaturan Akun", path: "/mitra/profil", icon: Settings }
    ],
    subscriptions: [
      { name: "Billing", path: "/mitra/billing", icon: Receipt }
    ],
};

export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const adminNavItems = {
    navigate: [
        { name: 'Dasbor', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Manajemen Partner', path: '/admin/partners', icon: Users },
        { name: 'Manajemen User', path: '/admin/users', icon: User },
        { name: 'Manajemen Transaksi', path: '/admin/transaksi', icon: Package },
        { name: 'Permintaan Pencairan', path: '/admin/keuangan', icon: Banknote },
    ],
    account: [
      { name: "Pengaturan Akun", path: "/admin/profil", icon: Settings }
    ],
};