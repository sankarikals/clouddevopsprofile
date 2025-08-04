import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VoiceAssistant from "@/components/VoiceAssistant";
import Courses from "@/components/Courses";
import Projects from "@/components/Projects";
import LearningInsights from "@/components/LearningInsights";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleContactOpen = () => setShowContactForm(true);

  return (
    <div className="min-h-screen">
      <Header onContactClick={handleContactOpen} />
      <Hero onEnrollClick={handleContactOpen} />
      <About />
      <VoiceAssistant />
      <Courses onEnrollClick={handleContactOpen} />
      <Projects onEnrollClick={handleContactOpen} />
      <LearningInsights />
      <Reviews />
      <div id="contact">
        {showContactForm && <Contact onClose={() => setShowContactForm(false)} />}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
