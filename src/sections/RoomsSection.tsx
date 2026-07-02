import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import ImageCard from "../components/ImageCard";

const ROOMS = [
  {
    src: "/images/rooms/nile-view-suite.jpg",
    label: "Nile View Suite",
    title: "Nile View Suite",
    tags: ["Nile View", "Natural Light"],
  },
  {
    src: "/images/rooms/quiet-garden-room.jpg",
    label: "Quiet Garden Room",
    title: "Quiet Garden Room",
    tags: ["Quiet Stay", "Natural Light"],
  },
  {
    src: "/images/rooms/sunrise-room.jpg",
    label: "Sunrise Room",
    title: "Sunrise Room",
    tags: ["Nile View", "Quiet Stay"],
  },
];

export default function RoomsSection() {
  return (
    <section id="rooms" className="bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading eyebrow="Rooms & Suites" title="Spaces to breathe and rest" />
        </FadeIn>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, index) => (
            <FadeIn key={room.title} delay={index * 0.1}>
              <ImageCard
                src={room.src}
                alt={`${room.title} at Aswan Holistic Hotel`}
                label={room.label}
                title={room.title}
                tags={room.tags}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
