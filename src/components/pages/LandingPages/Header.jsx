import { Link } from "react-router-dom"; 
import { Menu } from 'lucide-react';

const navLinks = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#cara-kerja', label: 'Cara Kerja' },
    { href: '#jadi-mitra', label: 'Jadi Mitra' },
    { href: '#footer', label: 'Hubungi Kami'},
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Re<span className="text-blue-600">bike</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-2">
                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-100">
                        Login Mitra / Admin
                    </Link>
                    <a href="#download" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Download Aplikasi
                    </a>
                </div>
                {/* Fungsionalitas tombol ini perlu ditambahkan dengan useState */}
                <button className="md:hidden">
                    <Menu className="h-6 w-6 text-gray-700" />
                </button>
            </div>
        </header>
    );
}