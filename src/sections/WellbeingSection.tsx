import { Moon, Wind, Leaf, Waves, Sunrise } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import WellbeingPillar from "../components/WellbeingPillar";

const PILLARS = [
  { icon: Moon, label: "Rest", description: "Quiet rooms and unhurried time to simply be still." },
  { icon: Wind, label: "Fresh Air", description: "Open windows, river breeze, and space to breathe." },
  { icon: Leaf, label: "Nourishing Food", description: "Simple, local ingredients prepared with care." },
  { icon: Waves, label: "Nile Views", description: "The calm of moving water, always within sight." },
  { icon: Sunrise, label: "Slow Mornings", description: "No rush — the day begins on your own time." },
];

export default function WellbeingSection() {
  return (
    <section id="wellbeing" className="bg-sand/25 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Wellbeing" title="The simple things that restore you" />
          <p className="mt-6 text-lg leading-relaxed text-brown/80">
            True rest often comes from the simplest details: a quiet room, a warm drink, natural
            light, fresh air, nourishing food, and time beside the Nile.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((pillar, index) => (
            <WellbeingPillar
              key={pillar.label}
              icon={pillar.icon}
              label={pillar.label}
              description={pillar.description}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
