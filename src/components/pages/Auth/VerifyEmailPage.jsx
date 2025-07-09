import { useLocation, useNavigate, Navigate } from "react-router-dom";
import VerifyEmailModal from "../../modals/VerifyEmailModal";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const userType = location.state?.userType; // Get userType from state

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleCloseModal = () => {
    if (userType === 'admin') {
      navigate("/admin/profil"); // Redirect admin to ProfileSetting
    } else {
      navigate("/"); // Redirect partner/mitra to home
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-panel-bg">
      <VerifyEmailModal
        isOpen={true}
        onClose={handleCloseModal}
        email={email}
      />
    </section>
  );
}
