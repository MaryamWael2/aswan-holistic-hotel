import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import ExperienceCard from "../components/ExperienceCard";

const EXPERIENCES = [
  {
    src: "/images/experiences/sail-the-nile.jpg",
    label: "Felucca sailing on the Nile",
    title: "Sail the Nile",
    description: "Drift past palm-lined banks aboard a traditional felucca at golden hour.",
  },
  {
    src: "/images/experiences/discover-aswan.jpg",
    label: "Aswan streets and heritage sites",
    title: "Discover Aswan",
    description: "Wander markets, temples, and quiet corners of one of Egypt's oldest cities.",
  },
  {
    src: "/images/experiences/golden-hour-river.jpg",
    label: "Sunset over the river",
    title: "Golden Hour by the River",
    description: "Watch the light turn the water gold from a quiet spot along the Corniche.",
  },
  {
    src: "/images/experiences/nubian-moments.jpg",
    label: "Nubian village details and textiles",
    title: "Nubian-Inspired Moments",
    description: "Warm colors, handwoven textiles, and the hospitality Nubia is known for.",
  },
];

export default function AswanExperiencesSection() {
  return (
    <section id="experiences" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionHeading eyebrow="Aswan Experiences" title="The rhythm of the river and the city" align="left" />
        </FadeIn>
      </div>

      <FadeIn delay={0.15}>
        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin] lg:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          {EXPERIENCES.map((experience) => (
            <ExperienceCard
              key={experience.title}
              src={experience.src}
              alt={experience.label}
              label={experience.label}
              title={experience.title}
              description={experience.description}
              className="w-[78vw] snap-start sm:w-[46vw] lg:w-[24rem]"
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
