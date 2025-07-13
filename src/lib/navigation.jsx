import { 
  LayoutDashboard, Users, Receipt, User, 
  Settings, FileText, Banknote, ShieldCheck, MapPin, Package 
} from "lucide-react";




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