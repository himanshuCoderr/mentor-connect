import { createContext, useState, useEffect } from "react";
import { auth, db } from "../BACKEND/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [loginState, setLoginState] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [UserProfilePhoto, setUserProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true); // Initial auth check ke liye

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User logged-in hai
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(user.displayName || userData.name);
            setUserEmail(user.email);
            setUserType(userData.userType);
            setUserProfilePhoto(userData.profilePhoto || user.photoURL);
            setLoginState(true);
          } else {
            // Agar Firestore mein data nahi hai
            setLoginState(false);
            setUserEmail(null);
            setUserName(null);
            setUserType(null);
            setUserProfilePhoto(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          setLoginState(false);
          setUserEmail(null);
          setUserName(null);
          setUserType(null);
          setUserProfilePhoto(null);
        }
      } else {
        // User logged-in nahi hai
        setLoginState(false);
        setUserEmail(null);
        setUserName(null);
        setUserType(null);
        setUserProfilePhoto(null);
      }
      setLoading(false); // Auth check complete
    });

    // Cleanup listener
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
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
