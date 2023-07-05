import React from "react";
import "../assets/css/spinner.css";

const Spinner: React.FC = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
