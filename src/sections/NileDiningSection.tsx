import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import PlaceholderImage from "../components/PlaceholderImage";

const CALLOUTS = ["Slow breakfast", "Local flavors", "Sunset tea"];

export default function NileDiningSection() {
  return (
    <section id="dining" className="bg-nile-deep px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <FadeIn from="none" className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <PlaceholderImage
            src="/images/dining/nile-terrace.jpg"
            alt="A dining terrace overlooking the Nile at sunset."
            label="Nile-facing dining terrace"
            className="h-full w-full"
          />
        </FadeIn>

        <FadeIn>
          <SectionHeading eyebrow="Nile Dining" title="Nourished by the Nile" align="left" light />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/85">
            Slow breakfasts, fresh local ingredients, warm drinks, sunset views, and simple meals
            designed to make the stay feel lighter and more grounded.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {CALLOUTS.map((item) => (
              <li
                key={item}
                className="rounded-full border border-gold/40 bg-ivory/5 px-4 py-2 text-sm font-medium text-gold"
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
