import { Routes, Route } from "react-router-dom";
import About from "./pages/AboutUs";
import LoginForm from "./pages/login";
import HeroSection from "./components/Home/HeroSection";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Blog from "./pages/Blogs";
import FAQ from "./pages/FAQ";
import Contact from "./pages/contact.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Schemes from "./pages/Scheme.jsx";
import SchemeDetail from "./pages/SchemeDetail.jsx";
import ApplyScheme from "./pages/ApplyScheme.jsx"; // ✅ FIXED: Uncommented
import Dashboard from "./pages/Dashboard.jsx"; // ✅ ADDED: Dashboard import
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Scheme Routes - Public */}
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/schemes/:id" element={<SchemeDetail />} />

        {/* Protected Routes - Require Login */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        {/* ✅ FIXED: Apply route now properly protected */}
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute>
              <ApplyScheme />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADDED: Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;