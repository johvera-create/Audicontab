import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import RentaBand from "./components/RentaBand";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import TaxCalendar from "./components/TaxCalendar";
import TaxCalculator from "./components/TaxCalculator";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper-50 font-body text-ink-900">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <RentaBand />
        <Services />
        <About />
        <Process />
        <TaxCalendar />
        <TaxCalculator />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
