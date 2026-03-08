import Navbar from "../Layout/Navbar";
import bg from "../../assets/images/bg.jpg";
import {
  ArrowRight,
  Search,
  Shield,
  Zap,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { schemeAPI } from "../../services/api";

// ── Mini SchemeCard for homepage preview ──
const MiniSchemeCard = ({ scheme }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700 mb-3 w-fit">
      {scheme.category}
    </span>
    <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
      {scheme.name}
    </h3>
    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">
      {scheme.description}
    </p>
    <Link
      to={`/schemes/${scheme._id}`}
      className="mt-4 flex items-center gap-1 text-amber-600 font-semibold text-sm hover:gap-2 transition-all"
    >
      View Details <ArrowRight size={14} />
    </Link>
  </div>
);

export default function HeroSection() {
  const [schemes, setSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    schemeAPI
      .getAll()
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.schemes || [];
        setSchemes(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/schemes?search=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = "/schemes";
    }
  };

  const stats = [
    { number: "500+", label: "Government Schemes" },
    { number: "28", label: "States Covered" },
    { number: "10L+", label: "Citizens Helped" },
    { number: "15+", label: "Categories" },
  ];

  const features = [
    {
      icon: <Search size={28} className="text-amber-600" />,
      title: "Smart Search",
      desc: "Find schemes matching your age, income, category and location instantly.",
    },
    {
      icon: <Shield size={28} className="text-green-600" />,
      title: "Verified Info",
      desc: "All scheme information is sourced directly from official government portals.",
    },
    {
      icon: <Zap size={28} className="text-blue-600" />,
      title: "Easy Apply",
      desc: "Apply directly through official portals with step-by-step guidance.",
    },
    {
      icon: <Users size={28} className="text-purple-600" />,
      title: "For Everyone",
      desc: "Schemes for farmers, women, students, seniors, and entrepreneurs.",
    },
  ];

  const categories = [
    {
      name: "Housing",
      emoji: "🏠",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      name: "Health",
      emoji: "🏥",
      color: "bg-red-50 text-red-700 border-red-200",
    },
    {
      name: "Education",
      emoji: "📚",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    {
      name: "Employment",
      emoji: "💼",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      name: "Women",
      emoji: "👩",
      color: "bg-pink-50 text-pink-700 border-pink-200",
    },
    {
      name: "Agriculture",
      emoji: "🌾",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Profile",
      desc: "Register and fill in your basic details — age, income, category, state.",
    },
    {
      step: "02",
      title: "Discover Schemes",
      desc: "Browse schemes filtered to your eligibility automatically.",
    },
    {
      step: "03",
      title: "Apply Online",
      desc: "Click Apply and get redirected to the official government portal.",
    },
    {
      step: "04",
      title: "Track Status",
      desc: "Monitor your application status from your personal dashboard.",
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* //overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div> */}
          <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <Navbar />
          <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 pb-20">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-blue/30 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full mb-6">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              India's Unified Government Schemes Portal
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
              UNIFIED GOVERNMENT
              <span className="block text-yellow-400">SCHEMES </span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              Discover hundreds of central and state government schemes based on
              your eligibility — housing, health, education, employment and
              more.
            </p>

    

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/schemes">
                <button className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg hover:scale-105 flex items-center gap-2 group">
                  Browse All Schemes
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </button>
              </Link>
              <Link to="/register">
                <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2">
                  Create Free Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="bg-linear-to-r from-gray-900 to-gray-800 py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold text-yellow-400">
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ── CATEGORIES ── */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Browse by Category
            </h2>
            <p className="text-gray-500 mt-2">
              Find schemes relevant to your needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link to={`/schemes`} key={i}>
                <div
                  className={`border rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer ${cat.color}`}
                >
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <p className="font-semibold text-sm">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED SCHEMES ── */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Schemes
              </h2>
              <p className="text-gray-500 mt-2">
                Popular government schemes right now
              </p>
            </div>
            <Link
              to="/schemes"
              className="flex items-center gap-1 text-amber-600 font-semibold hover:gap-2 transition-all text-sm"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          {schemes.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <MiniSchemeCard key={scheme._id} scheme={scheme} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Pradhan Mantri Awas Yojana",
                "Ayushman Bharat",
                "PM Kisan Samman Nidhi",
              ].map((name, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 animate-pulse h-48"
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">Get started in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 text-gray-300 text-2xl z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why SchemConnect?
            </h2>
            <p className="text-gray-500 mt-2">
              Everything you need in one place
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl text-amber-300 mb-4">🇮🇳</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Rights. Your Benefits.
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join lakhs of citizens who discovered schemes they never knew they
            qualified for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:scale-105 transition-all shadow-lg">
                Get Started Free
              </button>
            </Link>
            <Link to="/schemes">
              <button className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:border-gray-400 transition-all">
                Browse Schemes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
