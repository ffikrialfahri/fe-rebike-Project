import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import PopularLocationSection from './PopularLocationSection';
import BecomeMitraSection from './BecomeMitraSection';
import DownloadSection from './DownloadSection';
import AdvenceSection from './AdvenceSection';

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <AdvenceSection />
            <HowItWorksSection />
            <PopularLocationSection />
            <BecomeMitraSection />
            <DownloadSection />
        </main>
    )
}