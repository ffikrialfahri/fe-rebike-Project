import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-12">
        <div>
          <h3 className="text-xl font-bold mb-4">Re<span className="text-blue-400">bike</span></h3>
          <p className="text-gray-400 text-sm">
            Platform sewa motor terpercaya di Malang. Liburan lebih mudah, bisnis rental lebih berkembang.
          </p>
          <p className="text-gray-400 text-sm mt-2">Jl. Contoh No. 123, Malang, Indonesia</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Tautan Penting</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            <li><Link to="/kebijakan-privasi" className="text-gray-400 hover:text-white">Kebijakan Privasi</Link></li>
            <li><Link to="/syarat-ketentuan" className="text-gray-400 hover:text-white">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@re-bike.com</li>
            <li>Telepon: +62 812 3456 7890</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <p className="text-center text-xs text-gray-500">© {new Date().getFullYear()} Rebike. All rights reserved.</p>
      </div>
    </footer>
  );
}