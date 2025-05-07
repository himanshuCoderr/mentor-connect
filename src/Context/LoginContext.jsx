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
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(null);
  const [reapprovalStatus, setReapprovalStatus] = useState(null);
  const [reapprovalFields, setReapprovalFields] = useState([]);
  const [reapprovalReason, setReapprovalReason] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

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
              setReapprovalStatus(null);
              setReapprovalFields([]);
              setReapprovalReason("");
            } else if (userData.userType === "pendingMentor") {
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
              setReapprovalStatus(mentorRequestData.status || null);
              setReapprovalFields(mentorRequestData.reapproval_fields || []);
              setReapprovalReason(mentorRequestData.reapproval_reason || "");
              if (mentorRequestData.isApproved === true) {
                setLoginState(true);
              } else {
                setLoginState(false);
              }
            } else {
              setUserName(user.displayName || userData.name);
              setUserEmail(user.email);
              setUserType(userData.userType);
              setUserProfilePhoto(userData.profilePhoto || user.photoURL);
              setIsApproved(null);
              setLoginState(true);
              setReapprovalStatus(null);
              setReapprovalFields([]);
              setReapprovalReason("");
            }
          } else {
            setLoginState(false);
            setUserEmail(null);
            setUserName(null);
            setUserType(null);
            setUserProfilePhoto(null);
            setIsApproved(null);
            setReapprovalStatus(null);
            setReapprovalFields([]);
            setReapprovalReason("");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          setLoginState(false);
          setUserEmail(null);
          setUserName(null);
          setUserType(null);
          setUserProfilePhoto(null);
          setIsApproved(null);
          setReapprovalStatus(null);
          setReapprovalFields([]);
          setReapprovalReason("");
        }
      } else {
        setLoginState(false);
        setUserEmail(null);
        setUserName(null);
        setUserType(null);
        setUserProfilePhoto(null);
        setIsApproved(null);
        setReapprovalStatus(null);
        setReapprovalFields([]);
        setReapprovalReason("");
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
        reapprovalStatus,
        setReapprovalStatus,
        reapprovalFields,
        setReapprovalFields,
        reapprovalReason,
        setReapprovalReason,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
