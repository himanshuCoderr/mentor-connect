import React from "react";
import HeroSection from "../components/layout/HeroSection";
import FeaturesSection from "../components/layout/FeaturesSection";
import Testimonials from "../components/layout/Testimonials";
import CallToAction from "../components/layout/CallToAction";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const StudentHomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default StudentHomePage;
