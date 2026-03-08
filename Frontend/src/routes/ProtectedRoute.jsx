import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get("http://localhost:3000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsAuthenticated(true);
        setIsAdmin(res.data.role === "admin");
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
