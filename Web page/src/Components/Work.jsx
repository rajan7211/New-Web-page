import { FiLayers, FiUserPlus, FiZap, FiTrendingUp } from "react-icons/fi";

const steps = [
  {
    num: "01",
    icon: FiLayers,
    title: "Create Workspace",
    desc: "Set up your team workspace in under 2 minutes with customizable templates.",
  },
  {
    num: "02",
    icon: FiUserPlus,
    title: "Invite Team",
    desc: "Add members via email or share a simple invite link with role-based permissions.",
  },
  {
    num: "03",
    icon: FiZap,
    title: "Start Collaborating",
    desc: "Begin assigning tasks, sharing files, and tracking progress in real-time.",
  },
  {
    num: "04",
    icon: FiTrendingUp,
    title: "Ship Faster",
    desc: "Use analytics and automation to identify bottlenecks and accelerate delivery.",
  },
];

export default function Work() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
        <p className="mt-4 text-lg text-slate-500">Get started in four simple steps.</p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <span className="text-4xl font-extrabold text-slate-100 absolute top-4 right-4 select-none">
                {step.num}
              </span>

              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-blue-600" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}








