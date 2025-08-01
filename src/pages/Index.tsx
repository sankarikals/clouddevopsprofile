import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VoiceAssistant from "@/components/VoiceAssistant";
import Courses from "@/components/Courses";
import Blog from "@/components/Blog";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onEnrollClick={() => setShowContactForm(true)} />
      <About />
      <VoiceAssistant />
      <Courses onEnrollClick={() => setShowContactForm(true)} />
      <Blog />
      <Reviews />
      {showContactForm && <Contact onClose={() => setShowContactForm(false)} />}
      <Footer />
    </div>
  );
};

export default Index;
