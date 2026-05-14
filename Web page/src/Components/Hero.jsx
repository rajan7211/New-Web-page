import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
          </div>
          <h1 className="hero-title">
            Work smarter,{" "}
            <span className="hero-title-highlight">not harder</span>
          </h1>
          <p className="hero-subtitle">
            Whitepace is the all-in-one workspace that helps teams collaborate, 
            manage projects, and get more done in less time.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="hero-btn-primary">
              Get Started Free
              <FiArrowRight className="hero-btn-icon" />
            </Link>
            <Link to="/resources" className="hero-btn-secondary">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;





