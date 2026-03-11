import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/images/bg.jpg";
import sideImage from "../assets/images/unnamed.jpg";
import logoImage from "../assets/images/signup-logo.jpg";

const inputClass =
  "w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      await axios.post(
        "https://scheme-connect-w48p.onrender.com/api/auth/register",
        {
          name: name.trim(),
          email: email.toLowerCase(),
          password,
        },
      );

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
      console.log("Register Error:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[880px] bg-white rounded-xl shadow-2xl flex overflow-hidden">
        {/* Left Image — hidden on small screens */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center min-h-[550px]"
          style={{ backgroundImage: `url(${sideImage})` }}
        />

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <img
            src={logoImage}
            alt="Signup"
            className="w-3/5 sm:w-4/6 mx-auto mb-4"
          />

          <h3 className="text-xl sm:text-2xl font-bold text-center mb-5">
            CREATE YOUR ACCOUNT
          </h3>

          <label className="font-medium text-gray-700 text-sm">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={inputClass}
          />

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

          <label className="font-medium text-gray-700 text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className={inputClass}
          />

          <button
            onClick={handleRegister}
            className="bg-amber-700 text-white w-full py-2.5 sm:py-3 rounded-md font-semibold cursor-pointer
              transition-all duration-300 hover:bg-amber-600 hover:scale-[1.02] text-sm sm:text-base"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="text-center text-xs text-gray-500 mt-4">
            Your data is secured with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}
