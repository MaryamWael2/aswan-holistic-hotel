import Navbar from "./components/Navbar";
import HeroScrollSection from "./sections/HeroScrollSection";
import IntroSection from "./sections/IntroSection";
import RoomsSection from "./sections/RoomsSection";
import NileDiningSection from "./sections/NileDiningSection";
import WellbeingSection from "./sections/WellbeingSection";
import AswanExperiencesSection from "./sections/AswanExperiencesSection";
import GalleryPreviewSection from "./sections/GalleryPreviewSection";
import BookingCTASection from "./sections/BookingCTASection";

export default function App() {
  return (
    <div className="bg-ivory">
      <Navbar />
      <main>
        <HeroScrollSection />
        <IntroSection />
        <RoomsSection />
        <NileDiningSection />
        <WellbeingSection />
        <AswanExperiencesSection />
        <GalleryPreviewSection />
        <BookingCTASection />
      </main>
    </div>
  );
}
