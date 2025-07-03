import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Terima onLoginClick dari parent (LandingLayout)
export default function Header({ onLoginClick }) {
  const navLinks = [
    { to: "/#hero", label: "Beranda" },
    { to: "/#how-it-works", label: "Cara Kerja" },
    { to: "/#why-us", label: "Kenapa Kami?" },
    { to: "/#popular-locations", label: "Lokasi" },
    { to: "/#partner-cta", label: "Jadi Mitra" },
    { to: "/#footer", label: "Hubungi Kami" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-teal-600">
          Rebike
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <HashLink
                key={link.to}
                to={link.to}
                smooth
                className="text-gray-600 hover:text-teal-600"
              >
                {link.label}
              </HashLink>
            ))}
          </nav>
          {/* Tombol Login di Header - Memanggil openLoginModal */}
          <button
            onClick={onLoginClick}
            className="border border-teal-600 text-teal-600 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 transition"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}