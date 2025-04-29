// import React from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { LoginContext } from "../Context/LoginContext";
// import { auth } from "../BACKEND/firebase.js";
// import { signOut } from "firebase/auth";

// const ReApproveMentor = () => {
//   const { userType, reapprovalStatus, reapprovalFields, reapprovalReason } =
//     useContext(LoginContext);
//   if (
//     userType === "pendingMentor" &&
//     reapprovalStatus === "reapproval_pending"
//   ) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
//         <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md text-center">
//           <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
//             Re-approval Required 📝
//           </h2>
//           <p className="text-gray-300 text-base mb-2">
//             The MentorConnect Team has requested changes to your profile.
//           </p>
//           <p className="text-gray-300 text-base mb-4">
//             <strong>Status:</strong> Re-approval Pending
//           </p>
//           <ul className="text-left text-gray-300 list-disc list-inside mb-4">
//             {reapprovalFields.map((field) => (
//               <li key={field} className="capitalize">
//                 {field.replace(/([A-Z])/g, " $1").trim()}
//               </li>
//             ))}
//           </ul>
//           {reapprovalReason && (
//             <p className="text-gray-300 text-base mb-4">
//               <strong>Reason:</strong> {reapprovalReason}
//             </p>
//           )}
//           <Link
//             href={`/mentorProfileCreate/${auth.currentUser?.uid}`}
//             className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
//           >
//             Re-approve Profile
//           </Link>
//           <button
//             onClick={() => signOut(auth)}
//             className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     );
//   }
// };

// export default ReApproveMentor;
