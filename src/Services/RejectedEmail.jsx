// import emailjs from "emailjs-com";

// const SERVICE_ID = "service_pj38ic4";
// const REJECTION_TEMPLATE_ID = "template_km87him";
// const PUBLIC_KEY = "I0V8D80ZeFRR4AnJ0";

// const RejectedEmail = async (toEmail, toName, toReason) => {
//   try {
//     const templateParams = {
//       to_name: toName,
//       to_email: toEmail,
//       to_reason: toReason,
//     };

//     await emailjs.send(
//       SERVICE_ID,
//       REJECTION_TEMPLATE_ID,
//       templateParams,
//       PUBLIC_KEY
//     );
//     console.log("Rejection Email Sent to:", toEmail);
//   } catch (error) {
//     console.error("Error sending rejection email:", error.text || error);
//   }
// };

// export default RejectedEmail;
