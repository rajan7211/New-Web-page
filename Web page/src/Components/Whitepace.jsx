import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Whitepace.css";

function Whitepace() {
  return (
    <section className="whitepace">
      <div className="whitepace-container">
        <div className="whitepace-icon">
          <FiCheckCircle className="whitepace-icon-svg" />
        </div>
        <h2 className="whitepace-title">Whitepace</h2>
        <p className="whitepace-desc">
          This is the Whitepace section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Whitepace;