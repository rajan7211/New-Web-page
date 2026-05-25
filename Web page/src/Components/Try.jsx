import { FiCheck, FiZap } from "react-icons/fi";

const plans = [
  { name: "Starter", price: "$0", desc: "For individuals", popular: false },
  { name: "Pro", price: "$12", desc: "For teams", popular: true },
  { name: "Enterprise", price: "$49", desc: "For companies", popular: false },
];

export default function Try() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Simple Pricing</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className={`p-8 rounded-3xl border transition ${p.popular ? "border-blue-600 bg-blue-50/20" : "bg-white"}`}>
              {p.popular && <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold">POPULAR</span>}
              <h3 className="text-xl font-bold mt-4">{p.name}</h3>
              <p className="text-4xl font-black my-4">{p.price}<span className="text-sm font-normal text-slate-400">/mo</span></p>
              <ul className="text-sm text-slate-500 space-y-3 mb-8">
                <li className="flex items-center gap-2 justify-center"><FiCheck className="text-blue-600"/> All Core Features</li>
                <li className="flex items-center gap-2 justify-center"><FiCheck className="text-blue-600"/> Priority Support</li>
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold ${p.popular ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}