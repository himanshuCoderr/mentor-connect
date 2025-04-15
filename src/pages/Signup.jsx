import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { auth, db } from "../BACKEND/firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    userType: "",
  });

  async function registerUser(e) {
    e.preventDefault();
    try {
      if (formData.mobileNumber && formData.userType) {
        const userResponse = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userResponse.user;
        console.log(user);

        // Step 2: Email Verification bhejna
        await sendEmailVerification(user);
        alert("Verification email sent. Please verify before proceeding.");

        // Step 3: Polling Mechanism (10 sec tak wait kar ke bar bar check karega)
        let isVerified = false;
        let attempts = 0;

        while (attempts < 15) {
          // 10 attempts tak check karega
          await user.reload(); // Firebase se fresh data le ke aayega
          if (user.emailVerified) {
            isVerified = true;
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec ka delay
          attempts++;
        }

        // Step 4: Agar verify ho gaya to Firestore me save kar
        if (isVerified) {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName || formData.name,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            userType: formData.userType,
            emailVerified: true,
            createdAt: new Date(),
          });

          alert("Signup successful! Your account is now verified.");

          if (formData.userType == "student") {
            navigate("/postRequirment");
          } else if (formData.userType == "mentor") {
            navigate("/mentorProfileCreate");
          } else {
            navigate("/signup");
          }

          localStorage.setItem("userName", user.displayName);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userAccessToken", user.uid);
          localStorage.setItem("userType", formData.userType);

          console.log("Firebase User:", user);
        } else {
          alert(
            "Email not verified. Please verify your email and sign up again."
          );
          await deleteUser(user); // Agar verify nahi kare to account delete ho jayega
        }
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }

    // reset
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      userType: "",
    });
  }

  async function googleSignUp(e) {
    e.preventDefault();
    try {
      if (formData.mobileNumber && formData.userType) {
        const provider = new GoogleAuthProvider();

        // Force Google to always show account selection popup
        provider.setCustomParameters({
          prompt: "select_account",
        });

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Save user to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || formData.name,
          email: user.email,
          mobileNumber: formData.mobileNumber,
          userType: formData.userType,
          emailVerified: user.emailVerified,
          createdAt: new Date(),
        });

        alert("Google Signup Successful!");

        // Navigate based on userType
        if (formData.userType === "mentor") {
          navigate("/mentorProfileCreate");
        } else if (formData.userType === "student") {
          navigate("/postRequirment");
        } else {
          navigate("/signup");
        }

        localStorage.setItem("userName", user.displayName);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userAccessToken", user.uid);
        localStorage.setItem("userType", formData.userType);
        console.log("Firebase User:", user);
      } else {
        alert("please fill the required field");
      }
    } catch (error) {
      console.error("Error Signing In:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-8 py-6 border-b border-gray-600">
              <h2 className="text-3xl font-bold text-white">Sign Up</h2>
              <p className="text-gray-400 mt-1">
                Create your account to get started.
              </p>
            </div>
            <div className="p-8">
              <form className="space-y-6" onSubmit={registerUser}>
                <div
                  id="recaptcha-container"
                  className="flex justify-center mb-4"
                ></div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobileNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter your number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value="mentor"
                      name="userType"
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      className="mr-2"
                      required
                    />
                    <p className="text-yellow-400 text-[14px]">
                      Join as Mentor
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value="student"
                      name="userType"
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      className="mr-2"
                      required
                    />
                    <p className="text-yellow-400 text-[14px]">
                      Join as Student
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400">Continue with Google</p>
                  <button
                    className="w-full bg-gray-900 text-yellow-400 px-6 py-2 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 mt-2"
                    onClick={googleSignUp}
                  >
                    Signup with Google
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mt-6 flex text-center justify-center items-center">
                <p className="text-gray-400">Already have an account?</p>
                <Link
                  to="/login"
                  className="text-yellow-400 hover:text-yellow-300 transition duration-300 ml-2"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Signup;
