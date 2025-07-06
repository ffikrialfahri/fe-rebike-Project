import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// Terima onLoginClick dari parent (LandingLayout)
export default function Header({ onLoginClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <button
            onClick={onLoginClick}
            className="border border-teal-600 text-teal-600 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 transition"
          >
            Login
          </button>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <button className="absolute top-4 right-4" onClick={toggleMobileMenu}>
            <X size={24} />
          </button>
          <nav className="flex flex-col space-y-6 text-xl">
            {navLinks.map((link) => (
              <HashLink
                key={link.to}
                to={link.to}
                smooth
                className="text-gray-800 hover:text-teal-600"
                onClick={toggleMobileMenu} // Close menu on link click
              >
                {link.label}
              </HashLink>
            ))}
            <button
              onClick={() => {
                onLoginClick();
                toggleMobileMenu(); // Close menu after login click
              }}
              className="mt-6 bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}