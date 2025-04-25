import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../BACKEND/firebase"; // apna firebase config path daal do
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

function MentorDashboard() {
  const [requirements, setRequirements] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all Categories");
  const [serachRequests, setSearchRequests] = useState("");

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

  const filteredRequirements = requirements.filter((requirement) => {
    const matchesCategory =
      selectCategory === "" ||
      selectCategory === "all Categories" ||
      requirement.category === selectCategory;

    const matchesSearch =
      serachRequests === "" ||
      requirement.requirementTitle
        .toLowerCase()
        .includes(serachRequests.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Navbar - Fixed at top */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main Content - With proper padding to account for fixed header */}
      <main className="flex-grow pt-24 pb-12 px-6">
        {" "}
        {/* Increased top padding */}
        <div className="container lg:mt-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
            Available Mentorship Requests
          </h1>

          {/* Centered Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="w-full max-w-md">
              <input
                type="text"
                value={serachRequests}
                placeholder="Search requests..."
                onChange={(e) => setSearchRequests(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="w-full max-w-xs">
              <select
                onChange={(e) => setSelectCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="all Categories">All Categories</option>
                <option value="project-guidance">Project Guidance</option>
                <option value="assignment-help">Assignment Help</option>
                <option value="mentorship">Mentorship</option>
                <option value="live-coding">Live Coding</option>
              </select>
            </div>
          </div>

          {/* Requirements Grid */}
          {filteredRequirements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequirements.map((req) => (
                <div
                  key={req.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 border border-gray-700 hover:border-yellow-400"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-yellow-400">
                        {req.requirementTitle}
                      </h3>
                      <span className="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {req.budget} Coins
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="bg-blue-900/50 text-blue-400 px-2 py-1 rounded text-xs">
                        {req.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {req.preferredTime}
                      </span>
                    </div>

                    <p className="mt-4 text-gray-300 line-clamp-3">
                      {req.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{req.name}</p>
                        <p className="text-xs text-gray-500">{req.email}</p>
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
          ) : (
            <p className="text-center text-gray-400">
              No mentorship requests found.
            </p>
          )}
        </div>
      </main>

      {/* Footer - Fixed at bottom */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <Footer />
      </footer>
    </div>
  );
}

export default MentorDashboard;
