import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VoiceAssistant from "@/components/VoiceAssistant";
import Courses from "@/components/Courses";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <VoiceAssistant />
      <Courses />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
