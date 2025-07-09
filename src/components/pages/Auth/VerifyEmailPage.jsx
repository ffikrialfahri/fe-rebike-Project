import { useLocation, useNavigate, Navigate } from "react-router-dom";
import VerifyEmailModal from "../../modals/VerifyEmailModal";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleCloseModal = () => {
    navigate("/login"); // Redirect to login page after modal is closed
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <VerifyEmailModal
        isOpen={true} // Always open when this page is rendered
        onClose={handleCloseModal}
        email={email}
      />
    </section>
  );
}
