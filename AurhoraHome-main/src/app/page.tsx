import AboutUs from "./components/AboutUs";
import CTA from "./components/CTA";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import TransformationProcess from "./components/TransformationProcess";

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Services />
      <TransformationProcess />
      <AboutUs />
      <CTA />
    </main>
  );
}
