import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-brand-primary font-poppins"
        >
          Rebike
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="/#hero"
            className="text-slate-600 hover:text-brand-primary transition"
          >
            Beranda
          </a>
          <a
            href="/#how-it-works"
            className="text-slate-600 hover:text-brand-primary transition"
          >
            Cara Kerja
          </a>
          <a
            href="/#partner-cta"
            className="text-slate-600 hover:text-brand-primary transition"
          >
            Jadi Mitra
          </a>
          <a
            href="/#footer"
            className="text-slate-600 hover:text-brand-primary transition"
          >
            Hubungi Kami
          </a>
        </div>
        <div>
          <Link
            to="/login"
            className="text-brand-primary border border-brand-primary hover:bg-teal-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Login Mitra / Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
