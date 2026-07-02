import FadeIn from "../components/FadeIn";
import CTAButton from "../components/CTAButton";

export default function BookingCTASection() {
  return (
    <section
      id="booking"
      className="bg-gradient-to-b from-nile-deep to-brown px-6 py-28 text-center sm:py-36"
    >
      <FadeIn className="mx-auto flex max-w-2xl flex-col items-center">
        <h2 className="font-serif text-4xl font-medium text-ivory sm:text-5xl">
          Begin your Aswan escape
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ivory/80">
          Step into a slower rhythm, surrounded by Nile views, warm light, and the quiet beauty of
          Aswan.
        </p>
        <CTAButton variant="gold" className="mt-10">
          Plan Your Stay
        </CTAButton>
      </FadeIn>
    </section>
  );
}
