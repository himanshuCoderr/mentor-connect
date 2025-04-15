import React from 'react';

const Testimonials = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12 md:mb-16">
                    What Our Users Say
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                    {/* Testimonial 1 - Student */}
                    <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                            "MentorConnect helped me debug my Python project in days! My mentor was amazing and worth every coin."
                        </p>
                        <div className="flex items-center">
                            <img
                                src="hg"
                                alt="Student Avatar"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                            />
                            <div>
                                <p className="text-white font-semibold text-sm sm:text-base">Alex, Student</p>
                                <p className="text-gray-500 text-xs sm:text-sm">Aspiring Developer</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 - Mentor */}
                    <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                            "I love mentoring students here. It's rewarding to share my 10+ years of experience and earn coins!"
                        </p>
                        <div className="flex items-center">
                            <img
                                src="hf"
                                alt="Mentor Avatar"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                            />
                            <div>
                                <p className="text-white font-semibold text-sm sm:text-base">Sarah, Mentor</p>
                                <p className="text-gray-500 text-xs sm:text-sm">Senior Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;