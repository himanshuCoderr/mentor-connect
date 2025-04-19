import React from "react";
import MentorHome from "./MentorHomePage";
import StudentHomePage from "./StudentHomePage";
import { useState, useEffect } from "react";
const Home = () => {
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const type = localStorage.getItem("userType");
    setUserType(type);
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {userType === "mentor" ? <MentorHome /> : <StudentHomePage />}
    </div>
  );
};

export default Home;
