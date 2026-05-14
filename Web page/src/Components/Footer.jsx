import React from "react";
import { FiHeart } from "react-icons/fi";

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-800">whitepace</span>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Crafted with <FiHeart className="text-red-400 w-4 h-4" /> for modern teams
          </p>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Whitepace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;



