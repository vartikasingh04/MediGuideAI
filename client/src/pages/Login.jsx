import { useState } from "react";
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Login() {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ==========================================
  // UI STATE
  // ==========================================

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // SEND LOGIN REQUEST
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      // ==========================================
      // READ RESPONSE
      // ==========================================

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error(
          "Invalid server response:",
          responseText
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      // ==========================================
      // LOGIN ERROR
      // ==========================================

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      // ==========================================
      // CHECK TOKEN
      // ==========================================

      if (!data.token) {
        throw new Error(
          "Login successful, but authentication token was not received."
        );
      }

      // ==========================================
      // SAVE JWT TOKEN
      // ==========================================

      localStorage.setItem(
        "mediGuideToken",
        data.token
      );

      // ==========================================
      // SAVE USER INFORMATION
      // ==========================================

      if (data.user) {
        localStorage.setItem(
          "mediGuideUser",
          JSON.stringify(data.user)
        );
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      setSuccess(
        "Login successful! Opening dashboard..."
      );

      // ==========================================
      // GO TO DASHBOARD
      // ==========================================

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 700);

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <HeartPulse size={25} />
            </div>

            <div>

              <h1 className="text-lg font-bold text-gray-900">
                MediGuide{" "}
                <span className="text-blue-600">
                  AI
                </span>
              </h1>

              <p className="text-xs text-gray-500">
                Smart Health Assistant
              </p>

            </div>

          </a>

        </div>

      </header>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-6 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">

          {/* ==================================
              LEFT SECTION
          ================================== */}

          <div className="hidden bg-gradient-to-br from-blue-600 to-cyan-600 p-12 text-white lg:block">

            <div className="flex h-full flex-col justify-between">

              <div>

                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <HeartPulse size={30} />
                </div>

                <h2 className="text-4xl font-bold leading-tight">
                  Welcome back
                  <br />
                  to MediGuide AI.
                </h2>

                <p className="mt-6 max-w-md leading-7 text-blue-50">
                  Sign in to access your health
                  dashboard, assessments, and
                  personalized health history.
                </p>

              </div>

              {/* Features */}

              <div className="mt-12 space-y-5">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    className="mt-1"
                    size={20}
                  />

                  <div>

                    <p className="font-semibold">
                      Secure access
                    </p>

                    <p className="mt-1 text-sm text-blue-100">
                      Your account is protected
                      with secure authentication.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <HeartPulse
                    className="mt-1"
                    size={20}
                  />

                  <div>

                    <p className="font-semibold">
                      Health dashboard
                    </p>

                    <p className="mt-1 text-sm text-blue-100">
                      Access your health assessments
                      in one place.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================
              LOGIN FORM
          ================================== */}

          <div className="p-8 sm:p-10 lg:p-12">

            <div className="mx-auto max-w-md">

              {/* Heading */}

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Welcome Back
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Login to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Enter your credentials to access
                your MediGuide AI dashboard.
              </p>

              {/* ==================================
                  FORM
              ================================== */}

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >

                {/* ERROR */}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* SUCCESS */}

                {success && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {/* ==================================
                    EMAIL
                ================================== */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
                    />

                  </div>

                </div>

                {/* ==================================
                    PASSWORD
                ================================== */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <a
                      href="/forgot-password"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </a>

                  </div>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      disabled={loading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* ==================================
                    LOGIN BUTTON
                ================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading
                    ? "Signing In..."
                    : "Login"}

                  {!loading && (
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  )}

                </button>

              </form>

              {/* ==================================
                  REGISTER LINK
              ================================== */}

              <p className="mt-7 text-center text-sm text-gray-600">

                Don't have an account?

                <a
                  href="/register"
                  className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create Account
                </a>

              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;