import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  HeartPulse,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT:
      // Correct backend registration endpoint
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
          "Unable to register. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <HeartPulse size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                MediGuide{" "}
                <span className="text-blue-600">
                  AI
                </span>
              </h1>

              <p className="text-xs text-gray-500">
                Smart Health Guidance
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Already have an account?
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <UserRound size={28} />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>

              <p className="mt-3 leading-6 text-gray-600">
                Create an account to access your MediGuide AI
                health dashboard and assessments.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>

            {/* Login */}
            <div className="mt-7 border-t border-gray-100 pt-6 text-center">

              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            MediGuide AI provides general health information
            and does not replace professional medical advice.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Register;