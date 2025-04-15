import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HeroSection = () => {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(false);

    return (
        <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left ">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                        <span className="text-white">Unlock Your </span>
                        <span className="text-yellow-400">Coding Potential</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10">
                        Join as a student to learn from experts or as a mentor to shape the future of tech.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                        <button 
                            onClick={() => navigate("/findMentors")} 
                            className="bg-yellow-400 text-gray-900 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                        >
                            Find Mentors
                        </button>
                        <button 
                            onClick={() => {
                                if (loginState) {
                                    navigate("/postRequirement");
                                } else {
                                    navigate("/login");
                                }
                            }} 
                            className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                        >
                            Post your Requirement
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="md:w-1/2 mt-8 sm:mt-10 md:mt-0 px-4 sm:px-0">
                    <img
                        src="bv"
                        alt="Coding Illustration"
                        className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;