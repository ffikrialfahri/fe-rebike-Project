import Header from "../../pages/LandingPages/Header";
import Footer from "../../pages/LandingPages/Footer";

export default function LandingLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
}