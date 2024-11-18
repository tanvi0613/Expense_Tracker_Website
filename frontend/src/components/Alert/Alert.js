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
