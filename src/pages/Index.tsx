import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ModernEngagementTools from "@/components/ModernEngagementTools";
import Courses from "@/components/Courses";
import Projects from "@/components/Projects";
import LearningInsights from "@/components/LearningInsights";
import ReviewsDisplay from "@/components/ReviewsDisplay";
import SubmitReviewForm from "@/components/SubmitReviewForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleContactOpen = () => setShowContactForm(true);

  return (
    <div className="min-h-screen">
      <Header onContactClick={handleContactOpen} />
      <Hero onEnrollClick={handleContactOpen} />
      <About />
      <ModernEngagementTools />
      <Courses onEnrollClick={handleContactOpen} />
      <Projects onEnrollClick={handleContactOpen} />
      <LearningInsights />
      <ReviewsDisplay onSubmitClick={() => setShowReviewForm(true)} />
      <SubmitReviewForm isOpen={showReviewForm} onClose={() => setShowReviewForm(false)} />
      <div id="contact">
        {showContactForm && <Contact onClose={() => setShowContactForm(false)} />}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
