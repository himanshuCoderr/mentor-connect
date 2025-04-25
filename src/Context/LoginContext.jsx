// LoginContext.js
import { createContext, useState, useEffect } from "react";
import { auth, db } from "../BACKEND/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [loginState, setLoginState] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [UserProfilePhoto, setUserProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            // If userType is 'mentor', fetch from mentors collection
            if (userData.userType === "mentor") {
              const mentorRef = doc(db, "mentors", uid);
              const mentorSnap = await getDoc(mentorRef);
              const mentorData = mentorSnap.exists() ? mentorSnap.data() : {};

              setUserName(user.displayName || mentorData.name || userData.name);
              setUserEmail(user.email);
              setUserType("mentor");
              setUserProfilePhoto(mentorData.profilePicture || user.photoURL);
              setIsApproved(true);
              setLoginState(true);
            }
            // If pendingMentor, fetch from mentorRequest collection
            else if (userData.userType === "pendingMentor") {
              const mentorRequestRef = doc(db, "mentorRequest", uid);
              const mentorRequestSnap = await getDoc(mentorRequestRef);
              const mentorRequestData = mentorRequestSnap.exists()
                ? mentorRequestSnap.data()
                : {};

              setUserName(user.displayName || userData.name);
              setUserEmail(user.email);
              setUserType("pendingMentor");
              setUserProfilePhoto(userData.profilePhoto || user.photoURL);
              setIsApproved(mentorRequestData.isApproved || null);
              if (mentorRequestData.isApproved === true) {
                setLoginState(true);
              } else {
                setLoginState(false);
              }
            } else {
              // Normal student or other user types
              setUserName(user.displayName || userData.name);
              setUserEmail(user.email);
              setUserType(userData.userType);
              setUserProfilePhoto(userData.profilePhoto || user.photoURL);
              setIsApproved(null);
              setLoginState(true);
            }
          } else {
            setLoginState(false);
            setUserEmail(null);
            setUserName(null);
            setUserType(null);
            setUserProfilePhoto(null);
            setIsApproved(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          setLoginState(false);
          setUserEmail(null);
          setUserName(null);
          setUserType(null);
          setUserProfilePhoto(null);
          setIsApproved(null);
        }
      } else {
        setLoginState(false);
        setUserEmail(null);
        setUserName(null);
        setUserType(null);
        setUserProfilePhoto(null);
        setIsApproved(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <svg
          className="animate-spin h-8 w-8 text-yellow-400"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
        </svg>
      </div>
    );
  }

  if (userType === "pendingMentor" && isApproved !== true) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md max-w-md text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Mentor Request Under Review 📝
          </h2>
          <p className="text-gray-300 text-base">
            Thank you for submitting your mentor profile! Your request is
            currently under review. You will be notified via email once your
            profile is approved. Please check back later.
          </p>
          <button
            onClick={() => signOut(auth)}
            className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <LoginContext.Provider
      value={{
        loginState,
        setLoginState,
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        userType,
        setUserType,
        UserProfilePhoto,
        setUserProfilePhoto,
        isApproved,
        setIsApproved,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
