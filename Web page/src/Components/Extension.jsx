import React from "react";
import { FiDownload, FiChrome, FiGitlab } from "react-icons/fi";
import "./Extension.css";

function Extension() {
  return (
    <section className="extension-section">
      <div className="extension-container">
        <div className="extension-header">
          <h2 className="extension-title">
            Powerful <span className="extension-title-highlight">Integrations</span>
          </h2>
          <p className="extension-subtitle">
            Connect with your favorite tools and streamline your workflow.
          </p>
        </div>
        <div className="extension-list">
          {[
            { icon: FiChrome, name: "Chrome Extension" },
            { icon: FiGitlab, name: "GitLab" },
            { icon: FiDownload, name: "Desktop App" },
          ].map((item, i) => (
            <div key={i} className="extension-item">
              <item.icon className="extension-item-icon" />
              <span className="extension-item-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Extension;



