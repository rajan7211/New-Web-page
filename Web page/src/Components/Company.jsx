import { FiCheckCircle } from "react-icons/fi";
import "./Company.css";

function Company() {
  return (
    <section className="company-section">
      <div className="company-container">
        <div className="company-icon-wrapper">
          <FiCheckCircle className="company-icon" />
        </div>
        <h2 className="company-title">Company</h2>
        <p className="company-description">
          This is the Company section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Company;





