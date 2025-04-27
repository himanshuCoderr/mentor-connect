import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext.jsx";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../BACKEND/firebase.js";
import { signOut } from "firebase/auth";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Step1BasicInfo from "../components/layout/mentorProfile/Step1BasicInfo.jsx";
import Step2ExpertiseSkills from "../components/layout/mentorProfile/Step2ExpertiseSkills.jsx";
import Step3EducationCertifications from "../components/layout/mentorProfile/Step3EducationCertifications.jsx";
import Step4Availability from "../components/layout/mentorProfile/Step4Availability.jsx";
import Step5Pricing from "../components/layout/mentorProfile/Step5Pricing.jsx";
import Step6SocialPortfolio from "../components/layout/mentorProfile/Step6SocialPortfolio.jsx";
import Step7DemoVideo from "../components/layout/mentorProfile/Step7DemoVideo.jsx";
import Step8Terms from "../components/layout/mentorProfile/Step8Terms.jsx";
import Step9Preview from "../components/layout/mentorProfile/Step9Preview.jsx";

const apiKey = "5eba8f49c8a995e0e09ddd9c";

function MentorProfileCreation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { userName, UserProfilePhoto } = useContext(LoginContext);

  const [mentorApprovalData, setMentorApprovalData] = useState({
    fullName: userName || "",
    profilePicture: UserProfilePhoto || "",
    professionalTitle: "",
    bio: "",
    skills: [],
    primaryCategory: "",
    experienceLevel: "",
    yearsOfExperience: "",
    highestQualification: "",
    certifications: [],
    resume: "",
    timeSlots: [],
    preferredDays: [],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    sessionPrice: "",
    currency: "USD",
    sessionDuration: "60",
    linkedin: "",
    github: "",
    portfolio: "",
    youtube: "",
    demoVideo: "",
    experience: "",
    teachingStyle: "",
    languages: [],
    agreedToTerms: false,
    agreedToNDA: false,
  });

  const [currencies, setCurrencies] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Web Development",
    "AI/ML",
    "UI/UX",
    "Data Science",
    "Mobile Development",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
  ];
  const experienceLevels = ["Beginner", "Intermediate", "Expert"];
  const sessionDurations = ["30", "45", "60", "90", "120"];
  const teachingStyles = [
    "Hands-on",
    "Lecture-based",
    "Interactive",
    "Project-based",
  ];
  const languagesList = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Other",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeZones = Intl.supportedValuesOf("timeZone");
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    KRW: "₩",
    RUB: "₽",
    BRL: "R$",
    ZAR: "R",
    NZD: "NZ$",
    SGD: "S$",
    MXN: "$",
    HKD: "HK$",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    THB: "฿",
    TRY: "₺",
    AED: "د.إ",
    SAR: "﷼",
    MYR: "RM",
    IDR: "Rp",
    PKR: "₨",
    BDT: "৳",
    NGN: "₦",
  };

  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
  });

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Expertise & Education" },
    { number: 3, title: "Availability & Pricing" },
    { number: 4, title: "Social & Demo" },
    { number: 5, title: "Terms" },
    { number: 6, title: "Preview" },
  ];

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.conversion_rates);
        setCurrencies(currencyList);
        setMentorApprovalData((prev) => ({
          ...prev,
          currency: currencyList.includes("USD") ? "USD" : currencyList[0],
        }));
      })
      .catch((err) => {
        console.error("Error fetching currencies:", err);
        setError("Currency fetch failed. Please try again.");
      });
  }, []);

  const addTimeSlot = () => {
    if (newSlot.startTime >= newSlot.endTime) {
      setError("End time must be after start time");
      return;
    }
    setMentorApprovalData({
      ...mentorApprovalData,
      timeSlots: [...mentorApprovalData.timeSlots, newSlot],
    });
    setNewSlot({ day: "Monday", startTime: "09:00", endTime: "10:00" });
    setError("");
  };

  const removeTimeSlot = (index) => {
    setMentorApprovalData({
      ...mentorApprovalData,
      timeSlots: mentorApprovalData.timeSlots.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !mentorApprovalData.skills.includes(newSkill.trim())
    ) {
      setMentorApprovalData({
        ...mentorApprovalData,
        skills: [...mentorApprovalData.skills, newSkill.trim()],
      });
      setNewSkill("");
      setError("");
    } else {
      setError("Skill already exists or is empty");
    }
  };

  const removeSkill = (skillToRemove) => {
    setMentorApprovalData({
      ...mentorApprovalData,
      skills: mentorApprovalData.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setMentorApprovalData({
        ...mentorApprovalData,
        certifications: [
          ...mentorApprovalData.certifications,
          newCertification.trim(),
        ],
      });
      setNewCertification("");
      setError("");
    } else {
      setError("Certification cannot be empty");
    }
  };

  const removeCertification = (certToRemove) => {
    setMentorApprovalData({
      ...mentorApprovalData,
      certifications: mentorApprovalData.certifications.filter(
        (cert) => cert !== certToRemove
      ),
    });
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !mentorApprovalData.languages.includes(newLanguage.trim())
    ) {
      setMentorApprovalData({
        ...mentorApprovalData,
        languages: [...mentorApprovalData.languages, newLanguage.trim()],
      });
      setNewLanguage("");
      setError("");
    } else {
      setError("Language already added or is empty");
    }
  };

  const removeLanguage = (langToRemove) => {
    setMentorApprovalData({
      ...mentorApprovalData,
      languages: mentorApprovalData.languages.filter(
        (lang) => lang !== langToRemove
      ),
    });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const validVideoTypes = ["video/mp4"];
      const validDocTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (field === "profilePicture" && !validImageTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG/PNG/GIF)");
        return;
      }
      if (field === "demoVideo" && !validVideoTypes.includes(file.type)) {
        setError("Please upload a valid MP4 video file");
        return;
      }
      if (field === "resume" && !validDocTypes.includes(file.type)) {
        setError("Please upload a valid PDF or Word document");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMentorApprovalData({
          ...mentorApprovalData,
          [field]: reader.result,
        });
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          mentorApprovalData.fullName &&
          mentorApprovalData.professionalTitle &&
          mentorApprovalData.bio
        );
      case 2:
        return (
          mentorApprovalData.primaryCategory &&
          mentorApprovalData.experienceLevel &&
          mentorApprovalData.yearsOfExperience &&
          mentorApprovalData.skills.length > 0 &&
          mentorApprovalData.highestQualification
        );
      case 3:
        return (
          mentorApprovalData.preferredDays.length > 0 &&
          mentorApprovalData.timeSlots.length > 0 &&
          mentorApprovalData.timeZone &&
          mentorApprovalData.sessionPrice &&
          mentorApprovalData.currency &&
          mentorApprovalData.sessionDuration
        );
      case 4:
        return (
          mentorApprovalData.experience &&
          mentorApprovalData.teachingStyle &&
          mentorApprovalData.languages.length > 0
        );
      case 5:
        return (
          mentorApprovalData.agreedToTerms && mentorApprovalData.agreedToNDA
        );
      case 6:
        return true;
      default:
        return false;
    }
  };

  function mentorApprovalRequest(e) {
    e.preventDefault();
    const user = auth.currentUser;
    const uid = user?.uid;

    if (!uid) {
      setError("User not logged in!");
      return;
    }

    const mentorRequestRef = doc(db, "mentorRequest", uid);
    const userRef = doc(db, "users", uid);

    setDoc(
      mentorRequestRef,
      {
        uid: uid,
        ...mentorApprovalData,
        isApproved: false,
        submittedAt: new Date().toISOString(),
      },
      { merge: true }
    )
      .then(() => {
        return updateDoc(userRef, {
          userType: "pendingMentor",
        });
      })
      .then(() => {
        signOut(auth).then(() => {
          alert("Profile submitted! You'll be notified after approval.");
          navigate("/login");
        });
      })
      .catch((error) => {
        console.error("Error submitting mentor request: ", error);
        setError("Something went wrong. Please try again.");
      });
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError("");
    } else {
      setError("Please fill all required fields before proceeding.");
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-22 pb-12 min-h-screen flex items-center">
        <div className="container  lg:mt-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gray-700 px-6 py-6 border-b border-gray-600">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Mentor Profile Creation
              </h2>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Complete all steps to create your professional mentor profile
              </p>
              <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-2 pb-2">
                {steps.map((step) => (
                  <button
                    key={step.number}
                    onClick={() =>
                      currentStep >= step.number && setCurrentStep(step.number)
                    }
                    className={`relative text-xs sm:text-sm font-semibold whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentStep === step.number
                        ? "bg-gray-800 text-yellow-400"
                        : currentStep > step.number
                        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={mentorApprovalRequest}>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-sm shadow-md">
                    {error}
                  </div>
                )}
                <div className="animate-fade-in">
                  {currentStep === 1 && (
                    <Step1BasicInfo
                      data={mentorApprovalData}
                      setData={setMentorApprovalData}
                      handleFileUpload={handleFileUpload}
                    />
                  )}
                  {currentStep === 2 && (
                    <>
                      <Step2ExpertiseSkills
                        data={mentorApprovalData}
                        setData={setMentorApprovalData}
                        newSkill={newSkill}
                        setNewSkill={setNewSkill}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                        categories={categories}
                        experienceLevels={experienceLevels}
                      />
                      <div className="mt-6">
                        <Step3EducationCertifications
                          data={mentorApprovalData}
                          setData={setMentorApprovalData}
                          newCertification={newCertification}
                          setNewCertification={setNewCertification}
                          addCertification={addCertification}
                          removeCertification={removeCertification}
                          handleFileUpload={handleFileUpload}
                        />
                      </div>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <Step4Availability
                        data={mentorApprovalData}
                        setData={setMentorApprovalData}
                        newSlot={newSlot}
                        setNewSlot={setNewSlot}
                        addTimeSlot={addTimeSlot}
                        removeTimeSlot={removeTimeSlot}
                        days={days}
                        timeZones={timeZones}
                      />
                      <div className="mt-6">
                        <Step5Pricing
                          data={mentorApprovalData}
                          setData={setMentorApprovalData}
                          currencies={currencies}
                          currencySymbols={currencySymbols}
                          sessionDurations={sessionDurations}
                        />
                      </div>
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      <Step6SocialPortfolio
                        data={mentorApprovalData}
                        setData={setMentorApprovalData}
                      />
                      <div className="mt-6">
                        <Step7DemoVideo
                          data={mentorApprovalData}
                          setData={setMentorApprovalData}
                          newLanguage={newLanguage}
                          setNewLanguage={setNewLanguage}
                          addLanguage={addLanguage}
                          removeLanguage={removeLanguage}
                          handleFileUpload={handleFileUpload}
                          teachingStyles={teachingStyles}
                          languagesList={languagesList}
                        />
                      </div>
                    </>
                  )}
                  {currentStep === 5 && (
                    <Step8Terms
                      data={mentorApprovalData}
                      setData={setMentorApprovalData}
                    />
                  )}
                  {currentStep === 6 && (
                    <Step9Preview
                      data={mentorApprovalData}
                      currencySymbols={currencySymbols}
                    />
                  )}
                </div>
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 6 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors duration-200 shadow-md"
                    >
                      Next: {steps[currentStep].title}
                    </button>
                  )}
                  {currentStep === 6 && (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors duration-200 shadow-md"
                    >
                      Submit Profile
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MentorProfileCreation;
