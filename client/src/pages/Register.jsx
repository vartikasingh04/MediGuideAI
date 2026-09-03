import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text || `Server returned status ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      console.log("Registration successful:", data);

      // Save token if backend returns one
      if (data.token) {
        localStorage.setItem("mediGuideToken", data.token);
        localStorage.setItem("token", data.token);
      }

      // Save user if backend returns user
      if (data.user) {
        localStorage.setItem(
          "mediGuideUser",
          JSON.stringify(data.user)
        );
      }

      setSuccess(
        data.message || "Registration successful!"
      );

      // Go to login/dashboard
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message || "Failed to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4">

      <div className="w-full max-w-md">

        <div className="bg-white shadow-xl rounded-2xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-blue-600">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join MediGuideAI today
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister}>

            {/* Name */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-gray-600 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;