import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Try.css";

function Try() {
  return (
    <section className="try">
      <div className="try-container">
        <div className="try-icon">
          <FiCheckCircle className="try-icon-svg" />
        </div>
        <h2 className="try-title">Try</h2>
        <p className="try-desc">
          This is the Try section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Try;



