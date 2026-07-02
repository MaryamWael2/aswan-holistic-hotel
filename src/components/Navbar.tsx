import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import CTAButton from "./CTAButton";

const NAV_LINKS = [
  { label: "Stay", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Wellbeing", href: "#wellbeing" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
];

/**
 * Floating navbar, transparent over the hero and softly ivory-tinted with
 * a blur once the page has scrolled past it. Text stays light/readable
 * over the hero photography either way.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 64);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textClass = isScrolled ? "text-nile-deep" : "text-ivory";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled ? "bg-ivory/85 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10" aria-label="Primary">
        <a href="#top" className={`font-serif text-xl tracking-wide ${textClass}`}>
          Aswan Holistic Hotel
        </a>

        <ul className={`hidden items-center gap-9 text-sm font-medium tracking-wide md:flex ${textClass}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <CTAButton
            variant={isScrolled ? "gold" : "ivory"}
            onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            Plan Your Stay
          </CTAButton>
        </div>

        <button
          type="button"
          className={`md:hidden ${textClass}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-ivory/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 text-nile-deep">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-base font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <CTAButton
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Plan Your Stay
                </CTAButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
