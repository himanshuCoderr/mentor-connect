import React from 'react';

const CallToAction = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-900 to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Make an Impact?
                    </h3>
                    <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                        Students: Master coding with expert guidance. Mentors: Inspire the next generation of developers.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                        <button className="bg-yellow-400 text-gray-900 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base">
                            Join as Mentor
                        </button>
                        <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition duration-300 text-sm sm:text-base">
                            Join as Student
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="md:w-1/2 mt-8 sm:mt-10 md:mt-0 px-4 sm:px-0">
                    <img
                        src="gh"
                        alt="Tech Community"
                        className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default CallToAction;