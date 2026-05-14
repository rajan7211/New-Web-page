import React from "react";
import { FiLayers, FiZap, FiShield } from "react-icons/fi";
import "./Project.css";
function Project() {
  const features = [
    {
      icon: FiLayers,
      title: "Project Management",
      desc: "Organize tasks, set deadlines, and track progress with intuitive boards and timelines.",
    },
    {
      icon: FiZap,
      title: "Real-time Collaboration",
      desc: "Work together seamlessly with live editing, comments, and instant notifications.",
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      desc: "Bank-level encryption and compliance standards to keep your data safe.",
    },
  ];

  return (
    <section className="project">
      <div className="project-container">
        <div className="project-header">
          <h2 className="project-title">
            Everything you need to{" "}
            <span className="project-title-highlight">succeed</span>
          </h2>
        </div>
        <div className="project-grid">
          {features.map((f, i) => (
            <div key={i} className="project-card">
              <div className="project-card-icon">
                <f.icon className="project-card-icon-svg" />
              </div>
              <h3 className="project-card-title">{f.title}</h3>
              <p className="project-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;




