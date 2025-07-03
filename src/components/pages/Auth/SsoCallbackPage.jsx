import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";

export default function SsoCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      const user = {
        username: decodedToken.sub,
        firstName: decodedToken.firstName,
        roles: decodedToken.roles,
      };
      localStorage.setItem("user", JSON.stringify(user));

      

      if (user.roles.includes("ROLE_ADMIN")) {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.roles.includes("ROLE_PARTNER")) {
        navigate("/mitra/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Mengarahkan...</p>
    </div>
  );
}