// import React from "react";

// import {
//   AiOutlineCheckCircle,
//   AiOutlineCloseCircle,
//   AiOutlineLoading3Quarters,
// } from "react-icons/ai";

// const AlertMessage = ({ type, message }) => {
//   let icon;
//   let bgColor;
//   let textColor;
//   let borderLeftColor;

//   switch (type) {
//     case "error":
//       icon = <AiOutlineCloseCircle className="text-red-600 text-2xl" />;
//       bgColor = "bg-red-100";
//       textColor = "text-red-800";
//       borderLeftColor = "border-l-4 border-red-600";
//       break;
//     case "success":
//       icon = <AiOutlineCheckCircle className="text-green-600 text-2xl" />;
//       bgColor = "bg-green-100";
//       textColor = "text-green-800";
//       borderLeftColor = "border-l-4 border-green-600";
//       break;
//     case "loading":
//       icon = (
//         <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-2xl" />
//       );
//       bgColor = "bg-blue-100";
//       textColor = "text-blue-800";
//       borderLeftColor = "border-l-4 border-blue-600";
//       break;
//     default:
//       icon = null;
//       bgColor = "";
//       textColor = "";
//       borderLeftColor = "";
//   }

//   return (
//     <div
//       className={`flex items-center p-4 rounded-lg shadow-md ${bgColor} ${textColor} ${borderLeftColor} space-x-3`}
//     >
//       {icon}
//       <span className="text-sm font-medium">{message}</span>
//     </div>
//   );
// };

// export default AlertMessage;


import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import './Alert.css';

const AlertMessage = ({ type, message }) => {
  let icon;
  let containerClass;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="icon error-icon" />;
      containerClass = "alert-container error";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="icon success-icon" />;
      containerClass = "alert-container success";
      break;
    case "loading":
      icon = <AiOutlineLoading3Quarters className="icon loading-icon spin" />;
      containerClass = "alert-container loading";
      break;
    default:
      icon = null;
      containerClass = "alert-container";
  }

  return (
    <div className={containerClass}>
      {icon}
      <span className="message">{message}</span>
    </div>
  );
};

export default AlertMessage;
