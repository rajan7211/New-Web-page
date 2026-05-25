import { useState } from "react";
import { FiChrome, FiGitlab, FiCheck, FiLoader } from "react-icons/fi";

const items = [
  { icon: FiChrome, name: "Chrome" }, { icon: FiGitlab, name: "GitLab" }, { icon: FiChrome, name: "VS Code" }
];

export default function Extension() {
  const [status, setStatus] = useState({}); // { name: 'loading' | 'connected' }

  const connect = (name) => {
    setStatus(prev => ({ ...prev, [name]: 'loading' }));
    setTimeout(() => setStatus(prev => ({ ...prev, [name]: 'connected' })), 1000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Integrations</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
              <div className="flex items-center gap-3">
                <item.icon className="text-blue-600 text-xl" />
                <span className="font-bold text-slate-800">{item.name}</span>
              </div>
              <button onClick={() => connect(item.name)} disabled={!!status[item.name]} className="px-4 py-1.5 rounded-lg text-xs font-bold border bg-white">
                {status[item.name] === 'loading' ? <FiLoader className="animate-spin" /> : 
                 status[item.name] === 'connected' ? <span className="text-emerald-600">Connected</span> : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}