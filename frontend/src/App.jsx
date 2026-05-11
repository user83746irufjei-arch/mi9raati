import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { HowItWorks, FeatureCards } from './components/Sections';
import TajweedSection from './components/TajweedSection';
import ContentDemoSection from './components/ContentDemoSection';
import { Testimonials, CtaSection, Footer } from './components/Cta';
import MotivationSection from './components/MotivationSection';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function LandingPage() {
  return (
    <>
      <h1 className="sr-only">Miqra'ati — Quran Memorization and Recitation App</h1>
      <Hero />
      <HowItWorks />
      <FeatureCards />
      <TajweedSection />
      <ContentDemoSection />
      <Testimonials />
      <MotivationSection />
      <CtaSection />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}