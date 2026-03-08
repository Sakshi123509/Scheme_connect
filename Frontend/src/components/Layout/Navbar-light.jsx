import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, Shield, Menu, X } from "lucide-react";
import { authAPI } from "../../services/api";
import flag from "../../assets/images/flag.png";
import logo from "../../assets/images/dark-logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const navbarBg = isHomePage ? "bg-transparent" : "bg-white shadow-md";
  const textColor = isHomePage ? "text-white" : "text-gray-900";
  const hoverColor = isHomePage ? "hover:text-amber-400" : "hover:text-amber-600";

  useEffect(() => {
    if (isLoggedIn) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const loadUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Top Bar - Government Header */}
      <div className="bg-gradient-to-r from-orange-200 via-white to-green-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-1">
          <div className="flex justify-between items-center text-xs">
            <div className="flex gap-2 items-center">
              <img src={flag} className="w-4 h-5" alt="India Flag" />
              <div className="text-gray-700 font-medium">
                भारत सरकार | Government of India
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 font-bold hover:text-blue-600">हिंदी</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-gray-700 font-bold hover:text-blue-600">English</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full ${isHomePage ? 'absolute top-10' : 'sticky top-8'} px-4 py-4 flex items-center justify-between ${navbarBg} ${textColor} z-40 transition-all duration-300`}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            className={`w-16 h-16 rounded-full object-cover ${isHomePage ? 'drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]' : ''}`}
            alt="SchemeConnect Logo"
          />
          <div>
            <div className={`text-2xl font-bold ${isHomePage ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400' : 'text-green-700'}`}>
              SchemeConnect
            </div>
            <div className={`text-xs ${isHomePage ? 'text-gray-200' : 'text-gray-600'}`}>
              Government Schemes Portal
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6 font-medium cursor-pointer">
            {["Home", "Schemes", "About", "Blogs", "Contact"].map((item) => (
              <li key={item} className={`relative ${hoverColor} transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-lg`}>
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop User Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/dashboard"
                className={`${textColor} ${hoverColor} transition-all duration-300 flex items-center gap-2 font-medium`}
              >
                <User size={20} />
                {user?.role !== "admin" && (
                  <span>{user ? user.name.split(" ")[0] : "Profile"}</span>
                )}
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-4 py-2 font-medium flex items-center gap-2 transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:scale-110 hover:shadow-lg active:scale-95"
                >
                  <Shield size={18} />
                  <span>Admin</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-amber-600 text-white rounded-full px-5 py-2 font-medium flex items-center gap-2 transition-all duration-300 hover:bg-amber-700 hover:scale-110 hover:shadow-lg active:scale-95"
              >
                <span>Logout</span>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden lg:flex bg-amber-700 text-white rounded-full px-6 py-2 font-medium items-center gap-2 transition-all duration-300 hover:bg-amber-600 hover:scale-110 hover:shadow-lg active:scale-95"
            >
              Login
              <User size={18} />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${textColor}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 top-[88px]" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-4 text-gray-800">
              <li><Link to="/" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/schemes" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Schemes</Link></li>
              <li><Link to="/about" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              <li><Link to="/blogs" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Blogs</Link></li>
              <li><Link to="/contact" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>

              {isLoggedIn ? (
                <>
                  <li><Link to="/dashboard" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
                  {user?.role === "admin" && (
                    <li><Link to="/admin" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link></li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="w-full text-left py-2 hover:text-red-600">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li><Link to="/login" className="block py-2 hover:text-amber-600" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;