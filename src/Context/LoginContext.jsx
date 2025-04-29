import { createContext, useState, useEffect } from "react";
import { auth, db } from "../BACKEND/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

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

  if (
    userType === "pendingMentor" &&
    isApproved !== true &&
    reapprovalStatus !== "reapproval_pending"
  ) {
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

  if (
    userType === "pendingMentor" &&
    reapprovalStatus === "reapproval_pending"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            Re-approval Required 📝
          </h2>
          <p className="text-gray-300 text-base mb-2">
            The MentorConnect Team has requested changes to your profile.
          </p>
          <p className="text-gray-300 text-base mb-4">
            <strong>Status:</strong> Re-approval Pending
          </p>
          <ul className="text-left text-gray-300 list-disc list-inside mb-4">
            {reapprovalFields.map((field) => (
              <li key={field} className="capitalize">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </li>
            ))}
          </ul>
          {reapprovalReason && (
            <p className="text-gray-300 text-base mb-4">
              <strong>Reason:</strong> {reapprovalReason}
            </p>
          )}
          <a
            href={`/mentorProfileCreate/${auth.currentUser?.uid}`}
            className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Re-approve Profile
          </a>
          <button
            onClick={() => signOut(auth)}
            className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
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
