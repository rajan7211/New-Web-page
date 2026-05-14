import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./Client.css";

function Client() {
  return (
    <section className="client-section">
      <div className="client-container">
        <div className="client-icon-wrapper">
          <FiCheckCircle className="client-icon" />
        </div>
        <h2 className="client-title">Client</h2>
        <p className="client-description">
          This is the Client section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Client;