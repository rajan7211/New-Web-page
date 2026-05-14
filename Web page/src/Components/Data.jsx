import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Data.css";

function Data() {
  return (
    <section className="data-section">
      <div className="data-container">
        <div className="data-icon-wrapper">
          <FiCheckCircle className="data-icon" />
        </div>
        <h2 className="data-title">Data</h2>
        <p className="data-description">
          This is the Data section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Data;