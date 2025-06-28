import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingLayout from "./components/ui/Layout/LandingLayout";
import HomePage from "./components/pages/LandingPages/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LandingLayout>
        <HomePage />
      </LandingLayout>
    ),
  },
  {
    path: "/login",
    element: <div>Halaman Login</div>,
  },
  {
    path: "/Registrasi/pendaftaran",
    element: <div>Halaman Pendaftaran Mitra</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;