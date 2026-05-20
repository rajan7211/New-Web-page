import { useState } from "react";
import { FiDownload, FiChrome, FiGitlab, FiCheck, FiLoader } from "react-icons/fi";

const integrations = [
  { icon: FiChrome, name: "Chrome Extension", desc: "Browser integration" },
  { icon: FiGitlab, name: "GitLab", desc: "Code repository sync" },
  { icon: FiDownload, name: "Desktop App", desc: "Mac, Windows, Linux" },
  { icon: FiChrome, name: "VS Code", desc: "Editor plugin" },
  { icon: FiGitlab, name: "Slack", desc: "Team messaging" },
  { icon: FiDownload, name: "Mobile App", desc: "iOS & Android" },
];

export default function Extension() {
  const [installed, setInstalled] = useState({});
  const [loading, setLoading] = useState({});

  const handleInstall = (name) => {
    if (installed[name]) return;
    setLoading((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [name]: false }));
      setInstalled((prev) => ({ ...prev, [name]: true }));
    }, 1200);
  };

  return (
    <section id="extension" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Powerful <span className="text-blue-600">Integrations</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Connect with your favorite tools and streamline your workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleInstall(item.name)}
                disabled={loading[item.name] || installed[item.name]}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  installed[item.name]
                    ? "bg-emerald-100 text-emerald-700 flex items-center gap-1"
                    : loading[item.name]
                    ? "bg-slate-200 text-slate-400 cursor-wait"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm"
                }`}
              >
                {loading[item.name] ? (
                  <FiLoader className="w-3.5 h-3.5 animate-spin" />
                ) : installed[item.name] ? (
                  <>
                    <FiCheck className="w-3.5 h-3.5" />
                    Connected
                  </>
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




