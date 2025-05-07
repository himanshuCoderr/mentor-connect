import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userEmail, userName, UserProfilePhoto } = useContext(LoginContext);

  // Hardcoded user data
  const user = {
    name: userName,
    email: userEmail,
    profilePicture: UserProfilePhoto,
    bio: "A passionate learner looking to master web development and build real-world projects with the help of experienced mentors.",
    interests: ["React", "JavaScript", "CSS", "Python"],
    recentActivity: [
      {
        action: "Submitted a requirement",
        details: "Need help with React hooks and state management.",
        date: "March 25, 2025",
      },
      {
        action: "Contacted a mentor",
        details: "Reached out to Sarah Johnson for mentorship.",
        date: "March 20, 2025",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* User Profile Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Card */}
            <div className="bg-gray-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  User Profile
                </h2>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                  View and manage your profile details.
                </p>
              </div>
              <button className="bg-yellow-400 text-gray-900 px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-xs sm:text-sm">
                Edit Profile
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10">
              {/* Basic Info */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 sm:gap-6">
                <img
                  src={user.profilePicture}
                  alt={`${user.name}'s Profile`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 shadow-md"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {user.name}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm sm:text-base">
                    {user.email}
                  </p>
                  {user.bio && (
                    <p className="text-gray-200 mt-2 text-sm sm:text-base leading-relaxed">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {user.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-yellow-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-2 sm:mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {user.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-3 sm:p-4 rounded-lg"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2">
                        <p className="text-base sm:text-lg font-semibold text-white">
                          {activity.action}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {activity.date}
                        </p>
                      </div>
                      <p className="text-gray-200 text-sm sm:text-base">
                        {activity.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserProfile;
