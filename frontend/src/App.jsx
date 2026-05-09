import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { HowItWorks, FeatureCards } from './components/Sections';
import MotivationSection from './components/MotivationSection';
import ContentDemoSection from './components/ContentDemoSection';
import { Testimonials, CtaSection, Footer } from './components/Cta';

export default function App() {
  return (
    <>
      <h1 className="sr-only">Miqra'ati — Quran Memorization and Recitation App</h1>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeatureCards />
      <MotivationSection />
      <ContentDemoSection />
      <Testimonials />
      <CtaSection />
      <Footer />
    </>
  );
}