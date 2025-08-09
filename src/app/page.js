import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import dynamic from "next/dynamic";
const AboutSection = dynamic(() => import('./components/AboutSection'), { ssr: false });
import Footer from "./components/Footer";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection/>
      <GallerySection/>
      <ContactSection/>
      <Footer />
    </main>
  );
}
