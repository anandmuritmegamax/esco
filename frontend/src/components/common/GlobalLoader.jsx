import React from "react";
import "./globalLoader.css";

const GlobalLoader = () => {
  return (
    <div className="global-loader-backdrop">
      <div className="global-loader-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default GlobalLoader;
