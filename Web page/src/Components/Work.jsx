import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Work.css";

function Work() {
  return (
    <section className="work">
      <div className="work-container">
        <div className="work-icon">
          <FiCheckCircle className="work-icon-svg" />
        </div>
        <h2 className="work-title">Work</h2>
        <p className="work-desc">
          This is the Work section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Work;