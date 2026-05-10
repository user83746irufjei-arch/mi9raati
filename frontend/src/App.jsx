import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { HowItWorks, FeatureCards } from './components/Sections';
import TajweedSection from './components/TajweedSection';
import ContentDemoSection from './components/ContentDemoSection';
import { Testimonials, CtaSection, Footer } from './components/Cta';
import MotivationSection from './components/MotivationSection';

export default function App() {
  return (
    <>
      <h1 className="sr-only">Miqra'ati — Quran Memorization and Recitation App</h1>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeatureCards />
      <TajweedSection />
      <ContentDemoSection />
      <Testimonials />
      <MotivationSection />
      <CtaSection />
      <Footer />
    </>
  );
}