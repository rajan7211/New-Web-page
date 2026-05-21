import { useState } from "react";
import { FiEye, FiHeart, FiTarget } from "react-icons/fi";



const tabs = [
  {
    id : "mission",
    label : "Mission",
    icon : FiTarget,
    content : 
    "To empower every team on the planet to achieve more through intelligent workspace collaboration."
    
  },

   {
    id : "vision",
    label : "Vision",
    icon : FiEye,
    content : 
    "To empower every team on the planet to achieve more through intelligent workspace collaboration."
   },

   {
    id : "value",
    label : "Values",
    icon : FiHeart,
    content : 
    "To empower every team on the planet to achieve more through intelligent workspace collaboration."
   },
 
];

 export default function Company() {
  const [activeTab , setActiveTab] = useState("mission");

  return (
    <section className="py-20 bg-slate-50">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">our Company</h2>
      <p className="mt-4 text-lg text-slate-500">
        Building the furture of work, one feature at a time,
      </p>




      <div className="mt-8  flex justify-center gap-2">
        {tabs.map((tab)=>(
          <button
          key={tab.id}
          onClick={()=> setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab ===tab.id
            ?  "bg-blue-600 text-white shadow-md shadow-blue-500/20"
            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
          >
           <tab.icon className = "w-4 h-4"/>
           {tab.label}
           </button>
        ))}
      </div>

      <div className="mt-8 p-8 bg-white rounded-2xl border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          {tabs.find((t) => t.id === activeTab)?.icon({ className: "w-6 h-6 text-blue-600" })}
        </div>

        <p className="text-lg text-slate-700 leading-relaxed">
          {tabs.find((t) => t.id === activeTab)?.content}
        </p>
      </div>
    </div>
  </section>
  );

 }
























