import React from "react";
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/layout/HeroSection'
import FeaturesSection from '../components/layout/FeaturesSection'
import Testimonials from '../components/layout/Testimonials'
import CallToAction from '../components/layout/CallToAction'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <Testimonials />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;