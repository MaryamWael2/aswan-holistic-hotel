import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import CTAButton from "../components/CTAButton";
import PlaceholderImage from "../components/PlaceholderImage";

const GALLERY_IMAGES = [
  {
    src: "/images/gallery/riverfront-day.jpg",
    label: "Riverfront terrace by day",
    className: "sm:col-span-2 sm:row-span-2",
  },
  { src: "/images/gallery/room-detail.jpg", label: "Room textile detail", className: "" },
  { src: "/images/gallery/sunset-nile.jpg", label: "Sunset over the Nile", className: "" },
  { src: "/images/gallery/courtyard-night.jpg", label: "Courtyard by night", className: "sm:col-span-2" },
  { src: "/images/gallery/breakfast-table.jpg", label: "Breakfast on the terrace", className: "" },
];

export default function GalleryPreviewSection() {
  return (
    <section id="gallery" className="bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="flex flex-col items-center text-center">
          <SectionHeading eyebrow="Gallery" title="Moods of Aswan, day and night" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 grid auto-rows-[14rem] grid-cols-2 gap-4 sm:grid-cols-4">
            {GALLERY_IMAGES.map((image) => (
              <div key={image.src} className={`overflow-hidden rounded-2xl ${image.className}`}>
                <PlaceholderImage
                  src={image.src}
                  alt={image.label}
                  label={image.label}
                  className="h-full w-full transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-14 flex justify-center">
          <CTAButton>Explore the Gallery</CTAButton>
        </FadeIn>
      </div>
    </section>
  );
}
