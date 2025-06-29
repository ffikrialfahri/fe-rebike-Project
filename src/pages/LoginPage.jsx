import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Simulasi login, dalam aplikasi nyata, akan ada panggilan API
    if (role === "mitra") {
      navigate("/mitra/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-1 text-teal-600 font-poppins">
          Login Panel
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Masuk sebagai Admin atau Mitra.
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              defaultValue="mitra@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              defaultValue="password"
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => handleLogin("mitra")}
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition font-semibold shadow-md"
            >
              Login sebagai Mitra
            </button>
            <button
              type="button"
              onClick={() => handleLogin("admin")}
              className="w-full bg-slate-700 text-white py-2.5 rounded-lg hover:bg-slate-800 transition font-semibold shadow-md"
            >
              Login sebagai Admin
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-teal-600 transition"
            >
              Kembali ke Halaman Utama
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
