import React from "react";
import MentorHome from "./MentorHomePage";
import StudentHomePage from "./StudentHomePage";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
const Home = () => {
  const { userType } = useContext(LoginContext);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {userType === "mentor" ? <MentorHome /> : <StudentHomePage />}
    </div>
  );
};

export default Home;
