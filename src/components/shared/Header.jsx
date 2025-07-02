import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Terima onLoginClick dari parent (LandingLayout)
export default function Header({ onLoginClick }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/#hero", label: "Beranda" },
    { to: "/#how-it-works", label: "Cara Kerja" },
    { to: "/#why-us", label: "Kenapa Kami?" },
    { to: "/#popular-locations", label: "Lokasi" },
    { to: "/#partner-cta", label: "Jadi Mitra" },
    { to: "/#footer", label: "Hubungi Kami" },
  ];

  return (
    <header
      className={`bg-white/80 backdrop-blur-lg sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-brand-primary font-poppins"
        >
          Rebike
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <HashLink
              key={link.to}
              to={link.to}
              smooth
              className="text-slate-600 hover:text-brand-primary transition-colors"
            >
              {link.label}
            </HashLink>
          ))}
        </nav>

        <div>
          {/* UBAH DARI <Link> MENJADI <button> DAN GUNAKAN onLoginClick */}
          <button
            onClick={onLoginClick}
            className="text-brand-primary border border-brand-primary hover:bg-teal-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}