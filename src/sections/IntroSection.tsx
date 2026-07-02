import FadeIn from "../components/FadeIn";

export default function IntroSection() {
  return (
    <section className="bg-ivory px-6 py-24 sm:py-32">
      <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-6 h-px w-12 bg-gold" aria-hidden="true" />
        <h2 className="font-serif text-4xl font-medium text-nile-deep sm:text-5xl">A calmer way to stay</h2>
        <p className="mt-6 text-lg leading-relaxed text-brown/80">
          At Aswan Holistic Hotel, wellbeing is not a separate activity. It is found in quiet
          mornings, open air, nourishing food, Nile views, and simple moments that help you feel
          restored.
        </p>
        <span className="mt-8 h-px w-12 bg-gold" aria-hidden="true" />
      </FadeIn>
    </section>
  );
}
