import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiUsers, FiPackage, FiCheck } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isAuthenticated, currentUser, getDashboardRoute, products = [], testimonials = [] } = useAuth();
  
  const welcomeLink = isAuthenticated ? getDashboardRoute(currentUser?.role) : "/register";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {isAuthenticated && (
        <div className="bg-slate-900 text-white py-3 px-4 text-center text-sm font-medium">
          Welcome back, {currentUser?.name}! 
          <Link to={welcomeLink} className="ml-2 underline text-blue-400">Go to Dashboard →</Link>
        </div>
      )}
      <header className="py-20 px-6 bg-slate-50 border-b">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Premium Platform</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Work smarter with <span className="text-blue-600">secure role access.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The all-in-one workspace for teams. Manage users, track analytics, and handle orders with a polished, modern interface.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to={welcomeLink} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center gap-2">
              {isAuthenticated ? "My Account" : "Get Started Free"} <FiArrowRight />
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="px-8 py-4 bg-white border text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Feature icon={<FiShield />} title="Secure Access" desc="Role-based routes keep your data protected." />
          <Feature icon={<FiUsers />} title="Team Tools" desc="Manage users and permissions with ease." />
          <Feature icon={<FiPackage />} title="Modern Design" desc="Built with the latest UI trends for speed." />
        </div>
      </section>
      
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-slate-400 mt-2">Tools built for your growth stack</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? products.map((p) => (
              <div key={p.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-blue-500 transition group">
                <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition duration-300" />
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl">{p.title}</h3>
                  <span className="text-blue-400 font-bold">{p.price}</span>
                </div>
                <p className="text-slate-400 text-sm mb-6">{p.description}</p>
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-400 transition">
                  Add to cart
                </button>
              </div>
            )) : <p className="text-center col-span-3 opacity-50">No products found.</p>}
          </div>
        </div>
      </section>

      {/* 5. Why Us Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold leading-tight">Designed for teams that demand <span className="text-blue-600">clarity.</span></h2>
            <p className="mt-4 text-slate-500 text-lg">Launch workflows with seamless access control and beautiful dashboards.</p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3"><FiCheck className="text-blue-600"/> Fast Delivery</div>
              <div className="flex items-center gap-3"><FiCheck className="text-blue-600"/> Secure Payments</div>
              <div className="flex items-center gap-3"><FiCheck className="text-blue-600"/> 24/7 Support</div>
            </div>
          </div>
          <div className="bg-blue-600 rounded-[2rem] h-64 flex items-center justify-center text-white text-5xl font-black">
            Whitepace
          </div>
        </div>
      </section>

      {/* 6. Simple Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Customer Stories</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">{t.name[0]}</div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable Helper for Features
function Feature({ icon, title, desc }) {
  return (
    <div className="p-6">
      <div className="text-3xl text-blue-600 flex justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  );
}

export default Home;