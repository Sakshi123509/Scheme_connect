import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import bgImage from "../assets/images/bg.jpg";
import loginImage from "../assets/images/loginimg.jpg";
import logoImage from "../assets/images/logo.png";

const inputClass =
  "w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await authAPI.login(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[780px] bg-white rounded-xl shadow-2xl flex overflow-hidden">
        {/* Left Image — hidden on small screens */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center min-h-[450px]"
          style={{ backgroundImage: `url(${loginImage})` }}
        />

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <img
            src={logoImage}
            alt="Logo"
            className="w-6 h-8 mx-auto object-contain mb-2"
          />

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-5 tracking-wide">
            LOGIN
          </h2>

          <label className="font-medium text-gray-700 text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={inputClass}
          />

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="********"
            className={inputClass}
          />

          <p className="text-right text-amber-600 text-sm mb-4 cursor-pointer hover:underline">
            Forgot password?
          </p>

          <button
            onClick={handleLogin}
            className="bg-amber-700 text-white w-full py-2.5 sm:py-3 rounded-md font-semibold
              transition-all duration-300 hover:bg-amber-600 hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base"
          >
            Log In
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-amber-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
