import { useState } from "react";
import { FiHelpCircle, FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    q: "What is Whitepace?",
    a: "Whitepace is an all-in-one workspace platform that combines project management, real-time collaboration, and team communication into a single intuitive interface.",
  },
  {
    q: "Is there a free plan available?",
    a: "Yes! Our Starter plan is completely free for individuals and small teams, with core features like task management and file sharing included.",
  },
  {
    q: "Can I import data from other tools?",
    a: "Absolutely. We support one-click imports from Trello, Asana, Monday.com, and Jira. Our API also allows custom migrations.",
  },
  {
    q: "How secure is my data?",
    a: "We use AES-256 encryption at rest and TLS 1.3 in transit. We're SOC 2 Type II certified and GDPR compliant.",
  },
  {
    q: "Do you offer mobile apps?",
    a: "Yes, Whitepace is available on iOS and Android with full offline support and real-time sync when you reconnect.",
  },
];

export default function Whitepace() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
            <FiHelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-500">Everything you need to know about Whitepace.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border transition-all duration-300 ${
                openIndex === i ? "border-blue-200 shadow-md shadow-blue-500/5" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-slate-800">{faq.q}</span>
                {openIndex === i ? (
                  <FiMinus className="w-5 h-5 text-blue-600 shrink-0" />
                ) : (
                  <FiPlus className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

