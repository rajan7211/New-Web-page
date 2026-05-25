import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  { q: "What is Whitepace?", a: "An all-in-one workspace for teams." },
  { q: "Is it free?", a: "Yes, we have a generous free forever plan." },
];

export default function Whitepace() {
  const [idx, setIdx] = useState(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border overflow-hidden">
              <button onClick={() => setIdx(idx === i ? null : i)} className="w-full flex justify-between p-5 font-bold text-slate-800">
                {f.q} {idx === i ? <FiMinus/> : <FiPlus/>}
              </button>
              {idx === i && <p className="px-5 pb-5 text-slate-500 text-sm">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}