import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../BACKEND/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(null);
  const [signIn, setSignIn] = useState({
    userEmail: "",
    userPassword: "",
  });

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signIn.userEmail,
        signIn.userPassword
      );
      const user = userCredential.user;

      // Firestore se user ka data lana
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("No account found. Please signup first.");
        navigate("/signup");
        return;
      }

      const userData = userSnap.data();

      localStorage.setItem("userName", user.displayName || userData.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userAccessToken", user.uid);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem(
        "userProfilePhoto",
        userData.profilePhoto || user.photoURL || ""
      );

      alert("User Logged In Successfully!");
      console.log("Firestore Data:", userData);
      // Navigate based on userType
      if (userData.userType === "mentor") {
        navigate("/mentorProfileCreate");
      } else if (userData.userType === "student") {
        navigate("/postRequirement");
      }
    } catch (error) {
      console.error("Login Failed:", error.message);
      alert("Login Failed: " + error.message);
    }

    // Reset form fields
    setSignIn({
      userEmail: "",
      userPassword: "",
    });
  }

  async function googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        alert("No account found. Please signup first.");
        navigate("/signup");
        return;
      }

      const userData = userSnap.data();

      localStorage.setItem("userName", user.displayName || userData.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userAccessToken", user.uid);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem(
        "userProfilePhoto",
        userData.profilePhoto || user.photoURL || ""
      );

      alert("Login successful!");
      // Navigate based on userType
      if (userData.userType === "mentor") {
        navigate("/mentorProfileCreate");
      } else if (userData.userType === "student") {
        navigate("/postRequirement");
      }
      console.log("Firestore Data:", userData);
      console.log(
        "Profile Photo set in localStorage:",
        userData.profilePhoto || user.photoURL || ""
      );
    } catch (error) {
      console.error("Google SignIn Error:", error.message);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Login Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Welcome Back
            </h2>

            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-xl text-center">
                Log in
              </label>
            </div>

            <form className="space-y-6" onSubmit={handleSignIn}>
              {/* Email Field */}
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={signIn.userEmail}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  onChange={(e) => {
                    setSignIn({ ...signIn, userEmail: e.target.value });
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  value={signIn.userPassword}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  onChange={(e) => {
                    setSignIn({ ...signIn, userPassword: e.target.value });
                  }}
                  placeholder="Enter your password"
                  required
                />
                {signIn.userPassword && (
                  <i
                    className={`absolute right-3 top-[50px] fa-solid ${
                      showPass ? "fa-eye" : "fa-eye-slash"
                    } text-gray-400 cursor-pointer`}
                    onClick={() => setShowPass(!showPass)}
                  ></i>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-yellow-400 hover:text-yellow-300 transition duration-300 text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              {/* continue with google */}
              <div className="mt-6">
                <p className=" block text-gray-300 mb-2">
                  Continue with google
                </p>
                <button
                  className="w-full bg-gray-900  text-yellow-400 px-6 py-2 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 mt-2"
                  onClick={googleSignIn}
                >
                  Signin with google
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
              >
                Log In
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-400 hover:text-yellow-300 transition duration-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Login;
