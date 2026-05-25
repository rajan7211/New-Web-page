import { FiLayers, FiUserPlus, FiZap } from "react-icons/fi";

const steps = [
  { icon: FiLayers, title: "Workspace", text: "Create your team hub." },
  { icon: FiUserPlus, title: "Invite", text: "Bring your team in." },
  { icon: FiZap, title: "Ship", text: "Start delivering projects." },
];

export default function Work() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 transition group-hover:bg-blue-600 group-hover:text-white">
                <s.icon />
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-slate-500">{s.text}</p>
              {i < 2 && <div className="hidden lg:block absolute top-8 left-full w-full border-t-2 border-dashed border-slate-100 -z-10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}