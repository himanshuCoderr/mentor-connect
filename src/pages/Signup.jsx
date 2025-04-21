import React, { useEffect, useState } from "react";
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
  const [showPass, setShowPass] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    userType: "",
    profilePhoto: null,
  });

  useEffect(() => {
    const { password } = formData;
    if (!password) {
      setPasswordStrength(null);
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
      setPasswordStrength(
        "Your password is too short. For better protection, use at least 8 characters including letters and numbers."
      );
    } else if (
      password.length >= 8 &&
      !(hasUpperCase && hasLowerCase && hasNumbers)
    ) {
      setPasswordStrength(
        "Good start! Try adding special characters and making it a bit longer to increase security."
      );
    } else if (
      password.length >= 12 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      !hasSymbols
    ) {
      setPasswordStrength(
        "Nice! Your password is getting strong. Add a mix of uppercase, lowercase, numbers & symbols for top security."
      );
    } else if (
      password.length >= 16 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSymbols
    ) {
      setPasswordStrength(
        "Excellent! You've created a strong password. This level of strength is highly recommended for securing important accounts."
      );
    }
  }, [formData.password]);

  // Cloudinary configuration
  const cloudName = "dfw9zclpa";
  // const apiKey = "329838114473811";
  const uploadPreset = "ml_default";

  const uploadImageToCloudinary = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      return null;
    }
  };

  async function registerUser(e) {
    e.preventDefault();
    try {
      if (!formData.mobileNumber || !formData.userType) {
        alert("Please fill all required fields");
        return;
      }

      // Create user in Firebase Auth
      const userResponse = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userResponse.user;

      // Send verification email
      await sendEmailVerification(user);
      alert("Verification email sent. Please verify your email.");

      // Check for email verification
      let isVerified = false;
      let attempts = 0;

      while (attempts < 15) {
        await user.reload();
        if (user.emailVerified) {
          isVerified = true;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
        attempts++;
      }

      if (!isVerified) {
        alert("Email not verified. Please verify your email and try again.");
        await deleteUser(user);
        return;
      }

      // Upload profile photo to Cloudinary if exists
      let profileURL = "";
      if (formData.profilePhoto) {
        profileURL = await uploadImageToCloudinary(formData.profilePhoto);
        if (!profileURL) {
          throw new Error("Failed to upload profile photo");
        }
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        userType: formData.userType,
        emailVerified: true,
        createdAt: new Date(),
        profilePhoto: profileURL,
      });

      // Store user data in localStorage
      localStorage.setItem("userName", formData.name || "User");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userAccessToken", user.uid);
      localStorage.setItem("userType", formData.userType);
      localStorage.setItem(
        "userProfilePhoto",
        profileURL || user.photoURL || ""
      );

      // Redirect based on user type
      if (formData.userType === "student") {
        navigate("/postRequirement");
      } else if (formData.userType === "mentor") {
        navigate("/mentorProfileCreate");
      } else {
        navigate("/signup");
      }
      console.log(user);
      console.log("Profile Photo URL saved to Firestore:", profileURL);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  }

  async function googleSignUp(e) {
    e.preventDefault();
    try {
      if (!formData.mobileNumber || !formData.userType) {
        alert("Please fill all required fields");
        return;
      }

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Upload custom profile photo if selected
      let profileURL = user.photoURL || "";
      if (formData.profilePhoto) {
        profileURL = await uploadImageToCloudinary(formData.profilePhoto);
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || formData.name,
        email: user.email,
        mobileNumber: formData.mobileNumber,
        userType: formData.userType,
        emailVerified: user.emailVerified,
        createdAt: new Date(),
        profilePhoto: profileURL,
      });

      // Store user data in localStorage
      localStorage.setItem(
        "userName",
        user.displayName || formData.name || "User"
      );
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userAccessToken", user.uid);
      localStorage.setItem("userType", formData.userType);
      localStorage.setItem(
        "userProfilePhoto",
        profileURL || user.photoURL || ""
      );

      // Redirect based on user type
      if (formData.userType === "student") {
        navigate("/postRequirement");
      } else if (formData.userType === "mentor") {
        navigate("/mentorProfileCreate");
      }

      alert("Google Signup Successful!");
      console.log("Profile Photo URL saved to Firestore:", profileURL);
      console.log(user);
    } catch (error) {
      console.error("Google Signup Error:", error.message);
      alert(error.message);
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
                <div>
                  <label
                    htmlFor="profilePhoto"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Profile Photo {uploading && "(Uploading...)"}
                  </label>
                  <input
                    type="file"
                    id="profilePhoto"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profilePhoto: e.target.files[0],
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    accept="image/*"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter your email"
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
                    type="tel"
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileNumber: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Create a password"
                  />
                  {formData.password && (
                    <button
                      type="button"
                      className="absolute right-3 top-[42px] text-gray-400 hover:text-yellow-400"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </button>
                  )}
                  {formData.password && (
                    <div>
                      <p
                        className={`text-xs mt-2 ${
                          formData.password.length < 8
                            ? "text-red-400"
                            : formData.password.length < 12
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {passwordStrength}
                      </p>
                      <div className="w-full bg-gray-700 h-1 mt-1">
                        <div
                          className={`h-full ${
                            formData.password.length < 8
                              ? "bg-red-500 w-1/4"
                              : formData.password.length < 12
                              ? "bg-yellow-500 w-2/4"
                              : "bg-green-500 w-full"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="mentor"
                      value="mentor"
                      name="userType"
                      checked={formData.userType === "mentor"}
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      className="mr-2"
                      required
                    />
                    <label htmlFor="mentor" className="text-yellow-400 text-sm">
                      Join as Mentor
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="student"
                      value="student"
                      name="userType"
                      checked={formData.userType === "student"}
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      className="mr-2"
                      required
                    />
                    <label
                      htmlFor="student"
                      className="text-yellow-400 text-sm"
                    >
                      Join as Student
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 mb-2">Continue with Google</p>
                  <button
                    type="button"
                    onClick={googleSignUp}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
                  >
                    <i className="fa-brands fa-google"></i>
                    Sign up with Google
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 ${
                      uploading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {uploading ? "Processing..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                  >
                    Log in
                  </Link>
                </p>
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
