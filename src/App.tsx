import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Services from "./components/Services";
import PlanEstimator from "./components/PlanEstimator";
import About from "./components/About";
import Process from "./components/Process";
import TaxHub from "./components/TaxHub";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import KnowledgeGuides from "./components/KnowledgeGuides";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AiAssistant from "./components/AiAssistant";

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper-50 font-body text-ink-900">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <PlanEstimator />
        <About />
        <Process />
        <TaxHub />
        <Reviews />
        <Faq />
        <KnowledgeGuides />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AiAssistant />
    </div>
  );
}
