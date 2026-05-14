import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Sponser.css";

function Sponser() {
  return (
    <section className="sponser">
      <div className="sponser-container">
        <div className="sponser-icon">
          <FiCheckCircle className="sponser-icon-svg" />
        </div>
        <h2 className="sponser-title">Sponser</h2>
        <p className="sponser-desc">
          This is the Sponser section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Sponser;