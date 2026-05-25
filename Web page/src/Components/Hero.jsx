import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 blur-3xl -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">New: AI Powered</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mt-6 leading-tight">
            Work smarter, <br /> <span className="text-blue-600">not harder.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-500 leading-relaxed">
            The all-in-one workspace that helps teams collaborate and ship faster.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 flex items-center gap-2">
              Get Started <FiArrowRight />
            </Link>
            <button className="px-8 py-4 bg-white border-2 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 flex items-center gap-2">
              <FiPlay /> Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

