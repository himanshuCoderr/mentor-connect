import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../BACKEND/firebase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import LocationInput from "../components/Location.jsx";

function MentorDashboard() {
  const [requirements, setRequirements] = useState([]);
  const [searchRequests, setSearchRequests] = useState("");

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "requirements"));
        const reqData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequirements(reqData);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      }
    };
    fetchRequirements();
  }, []);

  const filterBySearch = requirements.filter((req) => {
    if (searchRequests == "") {
      console.log(requirements);
      return requirements;
    }
    return (
      req.subjects.includes(searchRequests) ||
      req.languages.includes(searchRequests)
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-grow pt-24 pb-12 px-6">
        <div className="container lg:mt-8 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
            Available Mentorship Requests
          </h1>

          {/* Search Section */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={searchRequests}
                placeholder="Skills, language..."
                onChange={(e) => setSearchRequests(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <LocationInput
                value={requirements.location}
                onChange={(value) =>
                  setRequirements({ ...requirements, location: value })
                }
              />
            </div>
          </div>

          {/* Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterBySearch.map((req) => (
              <div
                key={req.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 border border-gray-700 hover:border-yellow-400"
              >
                <div className="p-6">
                  {/* Requirement Details */}
                  <p className="text-gray-300 mb-4">{req.requirementDetails}</p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {req.subjects.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-amber-900/50 text-amber-400 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Languages Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {req.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-blue-900/50 text-blue-400 px-2 py-1 rounded text-xs"
                      >
                        {language}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Section */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <span className="text-yellow-400 font-semibold">
                        {req.budget} {req.budgetCurrency || "USD"}
                      </span>
                      <p className="text-sm text-gray-400 mt-1">
                        {req.genderPreference}
                      </p>
                    </div>
                    <Link
                      to={`/requirementDetail/${req.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg text-sm transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700">
        <Footer />
      </footer>
    </div>
  );
}

export default MentorDashboard;
