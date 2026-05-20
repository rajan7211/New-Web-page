import { FiStar } from "react-icons/fi";

const sponsors = [
  "Spotify", "Slack", "Notion", "Figma", "Vercel", "Stripe", "Linear", "Raycast"
];

export default function Sponser() {
  return (
    <section className="py-16 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <FiStar className="w-5 h-5 text-amber-500" />
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-6">
          {[...sponsors, ...sponsors].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-default"
            >
              <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">
                {name[0]}
              </div>
              <span className="text-lg font-bold text-slate-400">{name}</span>
            </div>
          ))}
        </div>
        <div className="animate-marquee2 whitespace-nowrap flex items-center gap-12 px-6 absolute top-0">
          {[...sponsors, ...sponsors].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-default"
            >
              <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">
                {name[0]}
              </div>
              <span className="text-lg font-bold text-slate-400">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


