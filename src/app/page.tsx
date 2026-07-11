import AuroraBackground from "@/components/AuroraBackground";
import GradientScroll from "@/components/GradientScroll";
import IntroReveal from "@/components/IntroReveal";
import IntroBanner from "@/components/IntroBanner";
import Marquee from "@/components/Marquee";
import ReadingProgress from "@/components/ReadingProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Honestidade from "@/components/Honestidade";
import Numeros from "@/components/Numeros";
import Sobre from "@/components/Sobre";
import Processo from "@/components/Processo";
import Portfolio from "@/components/Portfolio";
import Depoimentos from "@/components/Depoimentos";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="grain relative">
      <IntroReveal />
      <AuroraBackground />
      <GradientScroll />
      <ReadingProgress />
      <Nav />
      <IntroBanner />
      <main className="relative">
        <Hero />
        <Manifesto />
        <Honestidade />
        <Numeros />
        <Sobre />
        <Processo />
        <Portfolio />
        <Depoimentos />
        <Marquee />
        <Contato />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
