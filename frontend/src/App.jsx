import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { FeaturesStrip, HowItWorks, FeatureCards } from './components/Sections';
import GamifySection from './components/GamifySection';
import SurahsSection from './components/SurahsSection';
import { Testimonials, CtaSection, Footer } from './components/Cta';

export default function App() {
  return (
    <>
      <h1 className="sr-only">HifzFlow — Quran Memorization and Recitation App</h1>
      <Navbar />
      <Hero />
      <FeaturesStrip />
      <HowItWorks />
      <FeatureCards />
      <GamifySection />
      <SurahsSection />
      <Testimonials />
      <CtaSection />
      <Footer />
    </>
  );
}
