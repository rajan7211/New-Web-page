import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiUsers, FiPackage, FiCheck, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isAuthenticated, currentUser, getDashboardRoute, products = [], testimonials = [] } = useAuth();
  
  const welcomeLink = isAuthenticated ? getDashboardRoute(currentUser?.role) : "/register";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 text-slate-900">
      
      {/* Welcome Banner */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 text-center text-sm font-medium"
        >
          Welcome back, {currentUser?.name}! 
          <Link to={welcomeLink} className="ml-2 underline hover:text-blue-100 transition-colors">
            Go to Dashboard →
          </Link>
        </motion.div>
      )}

      {/* Hero Section */}
      <header className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Premium Platform</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Work smarter with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                secure role access.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The all-in-one workspace for teams. Manage users, track analytics, and handle orders with a polished, modern interface.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={welcomeLink} 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:shadow-2xl shadow-lg shadow-blue-500/30 transition flex items-center gap-2 w-fit"
                >
                  {isAuthenticated ? "My Account" : "Get Started Free"} <FiArrowRight />
                </Link>
              </motion.div>
              {!isAuthenticated && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/login" 
                    className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <Feature icon={<FiShield />} title="Secure Access" desc="Role-based routes keep your data protected." variants={itemVariants} />
          <Feature icon={<FiUsers />} title="Team Tools" desc="Manage users and permissions with ease." variants={itemVariants} />
          <Feature icon={<FiPackage />} title="Modern Design" desc="Built with the latest UI trends for speed." variants={itemVariants} />
        </motion.div>
      </section>
      
      {/* Products Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-slate-400 mt-2">Tools built for your growth stack</p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.length > 0 ? products.map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-blue-500 transition group h-full hover:shadow-2xl shadow-lg">
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
              </motion.div>
            )) : <p className="text-center col-span-3 opacity-50">No products found.</p>}
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Designed for teams that demand{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                clarity.
              </span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg">Launch workflows with seamless access control and beautiful dashboards.</p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3"><FiCheck className="text-blue-600 text-xl" /> Fast Delivery</div>
              <div className="flex items-center gap-3"><FiCheck className="text-blue-600 text-xl" /> Secure Payments</div>
              <div className="flex items-center gap-3"><FiCheck className="text-blue-600 text-xl" /> 24/7 Support</div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2rem] h-64 flex items-center justify-center text-white text-5xl font-black shadow-2xl"
          >
            Whitepace
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            Customer Stories
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-left"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={itemVariants}>
                <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-yellow-400 text-yellow-400 h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc, variants }) {
  return (
    <motion.div variants={variants} className="p-6">
      <div className="text-3xl text-blue-600 flex justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </motion.div>
  );
}

export default Home;