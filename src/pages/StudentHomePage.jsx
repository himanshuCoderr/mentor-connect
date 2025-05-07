import React from "react";
import HeroSection from "../components/layout/HeroSection";
import FeaturesSection from "../components/layout/FeaturesSection";
import Testimonials from "../components/layout/Testimonials";
import CallToAction from "../components/layout/CallToAction";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const StudentHomePage = () => {
  const userRedux = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Redux login state: ", userRedux);
  }, [userRedux]);

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
