import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../BACKEND/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../BACKEND/firebase.js";
import LocationInput from "../components/Location.jsx";

function RequestMentorship() {
  const navigate = useNavigate();

  const allSubjects = [
    "React JS",
    "React Native",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Angular",
    "Vue.js",
    "HTML",
    "CSS",
    "SASS",
    "Tailwind CSS",
    "Bootstrap",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring Boot",
    "C++",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Ruby",
    "Ruby on Rails",
    "Go",
    "Rust",
    "SQL",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Firebase",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST API",
    "Flutter",
    "Swift",
    "Kotlin",
    "Dart",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Blockchain",
    "Solidity",
    "Web3.js",
  ];

  const [requirement, setRequirement] = useState({
    location: "",
    phone: "",
    requirementDetails: "",
    subjects: [],
    newSubject: "",
    showNewSubjectInput: false,
    level: "",
    iWant: "",
    budget: "",
    budgetCurrency: "USD",
    genderPreference: "",
    languages: [],
    tutorLocation: "",
    files: [],
  });

  const [meetingOptions, setMeetingOptions] = useState({
    online: false,
    atMyPlace: false,
    travelToTutor: false,
  });

  const [currencyRates] = useState({
    AFN: 80.0,
    ALL: 95.0,
    DZD: 135.0,
    EUR: 0.85,
    AOA: 650.0,
    XCD: 2.7,
    ARS: 950.0,
    AMD: 390.0,
    AUD: 1.35,
    AZN: 1.7,
    BSD: 1.0,
    BHD: 0.38,
    BDT: 110.0,
    BBD: 2.0,
    BYN: 3.3,
    BZD: 2.0,
    XOF: 550.0,
    BTN: 83.0,
    BOB: 6.9,
    BAM: 1.65,
    BWP: 13.0,
    BRL: 5.6,
    BND: 1.35,
    BGN: 1.65,
    BIF: 2900.0,
    CVE: 95.0,
    KHR: 4100.0,
    XAF: 550.0,
    CAD: 1.25,
    CLP: 950.0,
    CNY: 7.0,
    COP: 4200.0,
    KMF: 450.0,
    CDF: 2800.0,
    CRC: 510.0,
    CUP: 24.0,
    CZK: 22.0,
    DKK: 6.3,
    DJF: 178.0,
    DOP: 60.0,
    USD: 1.0,
    EGP: 48.0,
    ERN: 15.0,
    SZL: 18.0,
    ETB: 80.0,
    FJD: 2.25,
    GMD: 70.0,
    GEL: 2.65,
    GHS: 15.0,
    GTQ: 7.75,
    GNF: 8600.0,
    GYD: 210.0,
    HTG: 130.0,
    HNL: 25.0,
    HUF: 360.0,
    ISK: 135.0,
    INR: 83.0,
    IDR: 16000.0,
    IRR: 42000.0,
    IQD: 1300.0,
    ILS: 3.7,
    JMD: 155.0,
    JPY: 150.0,
    JOD: 0.71,
    KZT: 450.0,
    KES: 130.0,
    KWD: 0.31,
    KGS: 85.0,
    LAK: 21000.0,
    LBP: 90000.0,
    LSL: 18.0,
    LRD: 190.0,
    LYD: 4.85,
    MOP: 8.0,
    MKD: 55.0,
    MGA: 4500.0,
    MWK: 1700.0,
    MYR: 4.5,
    MVR: 15.4,
    MRU: 40.0,
    MUR: 46.0,
    MXN: 20.0,
    MDL: 18.0,
    MNT: 3400.0,
    MAD: 10.0,
    MZN: 64.0,
    MMK: 2100.0,
    NAD: 18.0,
    NPR: 133.0,
    NZD: 1.45,
    NIO: 37.0,
    NGN: 1600.0,
    KPW: 900.0,
    NOK: 10.5,
    OMR: 0.39,
    PKR: 280.0,
    PAB: 1.0,
    PGK: 3.8,
    PYG: 7500.0,
    PEN: 3.75,
    PHP: 58.0,
    PLN: 3.95,
    QAR: 3.65,
    RON: 4.1,
    RUB: 95.0,
    RWF: 1300.0,
    WST: 2.8,
    SAR: 3.75,
    RSD: 100.0,
    SCR: 14.0,
    SLL: 23000.0,
    SGD: 1.35,
    SBD: 8.5,
    SOS: 570.0,
    ZAR: 18.0,
    KRW: 1350.0,
    SSP: 1300.0,
    LKR: 300.0,
    SDG: 600.0,
    SRD: 30.0,
    SEK: 10.0,
    CHF: 0.85,
    SYP: 13000.0,
    TWD: 32.0,
    TJS: 11.0,
    TZS: 2600.0,
    THB: 33.0,
    TOP: 2.4,
    TTD: 6.8,
    TND: 3.1,
    TRY: 34.0,
    TMT: 3.5,
    UGX: 3800.0,
    UAH: 40.0,
    AED: 3.67,
    GBP: 0.73,
    UYU: 40.0,
    UZS: 12500.0,
    VUV: 120.0,
    VEF: 3600000.0,
    VND: 25000.0,
    YER: 250.0,
    ZMW: 27.0,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = allSubjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectSelect = (subject) => {
    if (!requirement.subjects.includes(subject)) {
      setRequirement({
        ...requirement,
        subjects: [...requirement.subjects, subject],
      });
    }
  };

  const handleSubjectRemove = (subjectToRemove) => {
    setRequirement({
      ...requirement,
      subjects: requirement.subjects.filter(
        (subject) => subject !== subjectToRemove
      ),
    });
  };

  const handleNewSubjectAdd = () => {
    if (requirement.newSubject.trim() !== "") {
      setRequirement({
        ...requirement,
        subjects: [...requirement.subjects, requirement.newSubject],
        newSubject: "",
        showNewSubjectInput: false,
      });
    }
  };

  const handleLanguageAdd = (e) => {
    if (e.target.value && !requirement.languages.includes(e.target.value)) {
      setRequirement({
        ...requirement,
        languages: [...requirement.languages, e.target.value],
      });
    }
  };

  const handleLanguageRemove = (languageToRemove) => {
    setRequirement({
      ...requirement,
      languages: requirement.languages.filter(
        (lang) => lang !== languageToRemove
      ),
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `requirements/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })
    );
    setRequirement({
      ...requirement,
      files: [...requirement.files, ...uploadedFiles],
    });
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setRequirement({ ...requirement, budget: value });
    }
  };

  const convertBudget = (amount, fromCurrency, toCurrency) => {
    if (!amount) return "";
    const usdAmount = amount / currencyRates[fromCurrency];
    return (usdAmount * currencyRates[toCurrency]).toFixed(2);
  };

  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const uid = user.uid;

      await setDoc(doc(db, "requirements", uid), {
        ...requirement,
        meetingOptions,
      });
      console.log("Requirement submitted:", requirement);
      navigate("/myRequirement");

      // Reset form
      setRequirement({
        location: "",
        phone: "",
        requirementDetails: "",
        subjects: [],
        newSubject: "",
        showNewSubjectInput: false,
        level: "",
        iWant: "",
        budget: "",
        budgetCurrency: "USD",
        genderPreference: "",
        languages: [],
        tutorLocation: "",
        files: [],
      });
      setMeetingOptions({
        online: false,
        atMyPlace: false,
        travelToTutor: false,
      });
    } catch (error) {
      console.error("Error submitting requirement:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container lg:mt-8 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto bg-gray-800 p-6 sm:p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2">
              Request Mentorship
            </h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-10">
              Fill out the details below to connect with a mentor.
            </p>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmitForm}
            >
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Location *
                  </label>
                  <LocationInput
                    value={requirement.location}
                    onChange={(value) =>
                      setRequirement({ ...requirement, location: value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone with country code *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={requirement.phone}
                    onChange={(e) =>
                      setRequirement({ ...requirement, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    placeholder="+1 1234567890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subjects *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                      placeholder="Type to search skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {searchTerm && (
                    <div className="mt-2 max-h-40 overflow-y-auto bg-gray-700 rounded-lg border border-gray-600 p-2">
                      {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject) => (
                          <div
                            key={subject}
                            className={`px-3 py-2 text-sm rounded-md cursor-pointer mb-1 last:mb-0 ${
                              requirement.subjects.includes(subject)
                                ? "bg-yellow-400 text-gray-900"
                                : "hover:bg-gray-600"
                            }`}
                            onClick={() => handleSubjectSelect(subject)}
                          >
                            {subject}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 text-sm italic px-3">
                          No matches found
                        </div>
                      )}
                    </div>
                  )}

                  {requirement.subjects.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {requirement.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {subject}
                          <button
                            type="button"
                            onClick={() => handleSubjectRemove(subject)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setRequirement({
                          ...requirement,
                          showNewSubjectInput: true,
                        })
                      }
                      className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {requirement.subjects.length === 0
                        ? "If not in options above, add a new subject"
                        : "Add another subject not listed"}
                    </button>
                  </div>

                  {requirement.showNewSubjectInput && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={requirement.newSubject}
                        onChange={(e) =>
                          setRequirement({
                            ...requirement,
                            newSubject: e.target.value,
                          })
                        }
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                        placeholder="Enter new subject"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleNewSubjectAdd}
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition duration-300"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your level *
                  </label>
                  <select
                    id="level"
                    value={requirement.level}
                    onChange={(e) =>
                      setRequirement({ ...requirement, level: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    required
                  >
                    <option value="" disabled>
                      Select your level
                    </option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="iWant"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    I want *
                  </label>
                  <select
                    id="iWant"
                    value={requirement.iWant}
                    onChange={(e) =>
                      setRequirement({ ...requirement, iWant: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="tutoring">Tutoring</option>
                    <option value="mentoring">Mentoring</option>
                    <option value="coaching">Coaching</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Budget *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={requirement.budgetCurrency}
                      onChange={(e) =>
                        setRequirement({
                          ...requirement,
                          budgetCurrency: e.target.value,
                        })
                      }
                      className="w-1/4 px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    >
                      <option value="USD">USD</option>
                      <option value="AFN">AFN</option>
                      <option value="ALL">ALL</option>
                      <option value="DZD">DZD</option>
                      <option value="EUR">EUR</option>
                      <option value="AOA">AOA</option>
                      <option value="XCD">XCD</option>
                      <option value="ARS">ARS</option>
                      <option value="AMD">AMD</option>
                      <option value="AUD">AUD</option>
                      <option value="AZN">AZN</option>
                      <option value="BSD">BSD</option>
                      <option value="BHD">BHD</option>
                      <option value="BDT">BDT</option>
                      <option value="BBD">BBD</option>
                      <option value="BYN">BYN</option>
                      <option value="BZD">BZD</option>
                      <option value="XOF">XOF</option>
                      <option value="BTN">BTN</option>
                      <option value="BOB">BOB</option>
                      <option value="BAM">BAM</option>
                      <option value="BWP">BWP</option>
                      <option value="BRL">BRL</option>
                      <option value="BND">BND</option>
                      <option value="BGN">BGN</option>
                      <option value="BIF">BIF</option>
                      <option value="CVE">CVE</option>
                      <option value="KHR">KHR</option>
                      <option value="XAF">XAF</option>
                      <option value="CAD">CAD</option>
                      <option value="CLP">CLP</option>
                      <option value="CNY">CNY</option>
                      <option value="COP">COP</option>
                      <option value="KMF">KMF</option>
                      <option value="CDF">CDF</option>
                      <option value="CRC">CRC</option>
                      <option value="CUP">CUP</option>
                      <option value="CZK">CZK</option>
                      <option value="DKK">DKK</option>
                      <option value="DJF">DJF</option>
                      <option value="DOP">DOP</option>
                      <option value="USD">USD</option>
                      <option value="EGP">EGP</option>
                      <option value="ERN">ERN</option>
                      <option value="SZL">SZL</option>
                      <option value="ETB">ETB</option>
                      <option value="FJD">FJD</option>
                      <option value="GMD">GMD</option>
                      <option value="GEL">GEL</option>
                      <option value="GHS">GHS</option>
                      <option value="GTQ">GTQ</option>
                      <option value="GNF">GNF</option>
                      <option value="GYD">GYD</option>
                      <option value="HTG">HTG</option>
                      <option value="HNL">HNL</option>
                      <option value="HUF">HUF</option>
                      <option value="ISK">ISK</option>
                      <option value="INR">INR</option>
                      <option value="IDR">IDR</option>
                      <option value="IRR">IRR</option>
                      <option value="IQD">IQD</option>
                      <option value="ILS">ILS</option>
                      <option value="JMD">JMD</option>
                      <option value="JPY">JPY</option>
                      <option value="JOD">JOD</option>
                      <option value="KZT">KZT</option>
                      <option value="KES">KES</option>
                      <option value="KWD">KWD</option>
                      <option value="KGS">KGS</option>
                      <option value="LAK">LAK</option>
                      <option value="LBP">LBP</option>
                      <option value="LSL">LSL</option>
                      <option value="LRD">LRD</option>
                      <option value="LYD">LYD</option>
                      <option value="MOP">MOP</option>
                      <option value="MKD">MKD</option>
                      <option value="MGA">MGA</option>
                      <option value="MWK">MWK</option>
                      <option value="MYR">MYR</option>
                      <option value="MVR">MVR</option>
                      <option value="MRU">MRU</option>
                      <option value="MUR">MUR</option>
                      <option value="MXN">MXN</option>
                      <option value="MDL">MDL</option>
                      <option value="MNT">MNT</option>
                      <option value="MAD">MAD</option>
                      <option value="MZN">MZN</option>
                      <option value="MMK">MMK</option>
                      <option value="NAD">NAD</option>
                      <option value="NPR">NPR</option>
                      <option value="NZD">NZD</option>
                      <option value="NIO">NIO</option>
                      <option value="NGN">NGN</option>
                      <option value="KPW">KPW</option>
                      <option value="NOK">NOK</option>
                      <option value="OMR">OMR</option>
                      <option value="PKR">PKR</option>
                      <option value="PAB">PAB</option>
                      <option value="PGK">PGK</option>
                      <option value="PYG">PYG</option>
                      <option value="PEN">PEN</option>
                      <option value="PHP">PHP</option>
                      <option value="PLN">PLN</option>
                      <option value="QAR">QAR</option>
                      <option value="RON">RON</option>
                      <option value="RUB">RUB</option>
                      <option value="RWF">RWF</option>
                      <option value="WST">WST</option>
                      <option value="SAR">SAR</option>
                      <option value="RSD">RSD</option>
                      <option value="SCR">SCR</option>
                      <option value="SLL">SLL</option>
                      <option value="SGD">SGD</option>
                      <option value="SBD">SBD</option>
                      <option value="SOS">SOS</option>
                      <option value="ZAR">ZAR</option>
                      <option value="KRW">KRW</option>
                      <option value="SSP">SSP</option>
                      <option value="LKR">LKR</option>
                      <option value="SDG">SDG</option>
                      <option value="SRD">SRD</option>
                      <option value="SEK">SEK</option>
                      <option value="CHF">CHF</option>
                      <option value="SYP">SYP</option>
                      <option value="TWD">TWD</option>
                      <option value="TJS">TJS</option>
                      <option value="TZS">TZS</option>
                      <option value="THB">THB</option>
                      <option value="TOP">TOP</option>
                      <option value="TTD">TTD</option>
                      <option value="TND">TND</option>
                      <option value="TRY">TRY</option>
                      <option value="TMT">TMT</option>
                      <option value="UGX">UGX</option>
                      <option value="UAH">UAH</option>
                      <option value="AED">AED</option>
                      <option value="GBP">GBP</option>
                      <option value="UYU">UYU</option>
                      <option value="UZS">UZS</option>
                      <option value="VUV">VUV</option>
                      <option value="VEF">VEF</option>
                      <option value="VND">VND</option>
                      <option value="YER">YER</option>
                      <option value="ZMW">ZMW</option>
                    </select>
                    <input
                      type="text"
                      id="budget"
                      value={requirement.budget}
                      onChange={handleBudgetChange}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                      placeholder="Amount"
                      required
                    />
                  </div>

                  {requirement.budget && (
                    <div className="mt-2 text-xs text-gray-400">
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(currencyRates)
                          .filter(
                            ([currency]) =>
                              currency !== requirement.budgetCurrency
                          )
                          .map(([currency, rate]) => (
                            <div key={currency}>
                              {currency}:{" "}
                              {convertBudget(
                                requirement.budget,
                                requirement.budgetCurrency,
                                currency
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="genderPreference"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Gender Preference
                  </label>
                  <select
                    id="genderPreference"
                    value={requirement.genderPreference}
                    onChange={(e) =>
                      setRequirement({
                        ...requirement,
                        genderPreference: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                  >
                    <option value="">No preference</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="languages"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    I can communicate with the tutor in *
                  </label>
                  <select
                    id="languages"
                    onChange={handleLanguageAdd}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select language
                    </option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                  {requirement.languages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {requirement.languages.map((language) => (
                        <span
                          key={language}
                          className="inline-flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {language}
                          <button
                            type="button"
                            onClick={() => handleLanguageRemove(language)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <label
                    htmlFor="requirementDetails"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Details of your requirement *
                  </label>
                  <textarea
                    id="requirementDetails"
                    value={requirement.requirementDetails}
                    onChange={(e) =>
                      setRequirement({
                        ...requirement,
                        requirementDetails: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    rows="5"
                    placeholder="Please describe your requirement in detail..."
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tutorLocation"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Get tutors from
                  </label>
                  <select
                    id="tutorLocation"
                    value={requirement.tutorLocation}
                    onChange={(e) =>
                      setRequirement({
                        ...requirement,
                        tutorLocation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                  >
                    <option value="">All Countries</option>
                    <option value="same-city">Same city</option>
                    <option value="same-country">Same country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meeting options *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={meetingOptions.online}
                        onChange={(e) =>
                          setMeetingOptions({
                            ...meetingOptions,
                            online: e.target.checked,
                          })
                        }
                        className="mt-1 h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400"
                      />
                      <span>Online (using Zoom etc)</span>
                    </label>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={meetingOptions.atMyPlace}
                        onChange={(e) =>
                          setMeetingOptions({
                            ...meetingOptions,
                            atMyPlace: e.target.checked,
                          })
                        }
                        className="mt-1 h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400"
                      />
                      <span>At my place (home/institute)</span>
                    </label>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={meetingOptions.travelToTutor}
                        onChange={(e) =>
                          setMeetingOptions({
                            ...meetingOptions,
                            travelToTutor: e.target.checked,
                          })
                        }
                        className="mt-1 h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400"
                      />
                      <span>Travel to tutor</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="files"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Upload files (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer">
                      <span className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-600 transition duration-300 inline-block">
                        Choose Files
                      </span>
                      <input
                        type="file"
                        id="files"
                        onChange={handleFileUpload}
                        multiple
                        className="hidden"
                      />
                    </label>
                    {requirement.files.length > 0 && (
                      <span className="text-sm text-gray-400">
                        {requirement.files.length} file
                        {requirement.files.length !== 1 ? "s" : ""} selected
                      </span>
                    )}
                  </div>
                  {requirement.files.length > 0 && (
                    <div className="mt-2">
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {requirement.files.map((file, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="truncate max-w-xs">
                              {file.split("/").pop()}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setRequirement({
                                  ...requirement,
                                  files: requirement.files.filter(
                                    (_, i) => i !== index
                                  ),
                                })
                              }
                              className="text-gray-400 hover:text-white ml-2"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300 w-full sm:w-auto text-center"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default RequestMentorship;
