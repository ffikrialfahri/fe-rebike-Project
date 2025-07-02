import Header from "../shared/Header";
import Footer from "../shared/Footer";

// Terima prop `onLoginClick` dari parent (LandingPage)
export default function LandingLayout({ children, onLoginClick }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Teruskan prop tersebut ke komponen Header */}
      <Header onLoginClick={onLoginClick} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}