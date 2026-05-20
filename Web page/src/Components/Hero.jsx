import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-white pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-blue-700">
              Now with AI-powered insights
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Work smarter, <span className="text-blue-600">not harder</span>
          </h1>

          <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
            Whitepace is the all-in-one workspace that helps teams collaborate,
            manage projects, and get more done in less time.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Get Started Free
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors">
              <FiPlay className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
        <p>Trusted by 10,000+ teams</p>
      </div>
    </section>
  );
}






