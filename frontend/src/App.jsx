import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DailyBar from './components/DailyBar';
import ContinueLearning from './components/ContinueLearning';
import ExploreCourses from './components/ExploreCourses';
import Leaderboard from './components/Leaderboard';
import BottomCta from './components/BottomCta';

export default function App() {
  return (
    <>
      <h2 className="sr-only">
        LearnFlow — Coursera + Duolingo hybrid educational platform
      </h2>

      <Navbar />
      <Hero />
      <DailyBar />
      <ContinueLearning />
      <ExploreCourses />
      <Leaderboard />
      <BottomCta />
    </>
  );
}
