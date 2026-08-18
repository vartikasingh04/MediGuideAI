import { useEffect, useState } from "react";

import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  HeartPulse,
  Hospital,
  ShieldAlert,
  Stethoscope,
  UserRound,
} from "lucide-react";
import API_URL from "../api";
function Dashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    return (
      localStorage.getItem("mediGuideToken") ||
      localStorage.getItem("token")
    );
  };

  // ==========================================
  // GET USER
  // ==========================================

  const getUser = () => {
    try {
      const savedUser =
        localStorage.getItem("mediGuideUser");

      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("User parse error:", error);
    }

    return null;
  };

  const user = getUser();

  // ==========================================
  // FETCH ASSESSMENTS
  // ==========================================

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          setError("Authentication required.");

          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/assessments",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // ======================================
        // SAFE RESPONSE
        // ======================================

        const contentType =
          response.headers.get("content-type") || "";

        let data;

        if (
          contentType.includes("application/json")
        ) {
          data = await response.json();
        } else {
          const text = await response.text();

          console.error(
            "Invalid server response:",
            text
          );

          throw new Error(
            "Server returned an invalid response."
          );
        }

        console.log(
          "Dashboard assessments:",
          data
        );

        // ======================================
        // UNAUTHORIZED
        // ======================================

        if (response.status === 401) {
          localStorage.removeItem(
            "mediGuideToken"
          );

          localStorage.removeItem("token");

          localStorage.removeItem(
            "mediGuideUser"
          );

          alert(
            "Your login session has expired. Please login again."
          );

          window.location.href = "/login";

          return;
        }

        // ======================================
        // OTHER ERROR
        // ======================================

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load assessments."
          );
        }

        // ======================================
        // SAVE ASSESSMENTS
        // ======================================

        setAssessments(
          Array.isArray(data.assessments)
            ? data.assessments
            : []
        );
      } catch (error) {
        console.error(
          "Dashboard assessment error:",
          error
        );

        setError(
          error.message ||
            "Unable to load assessment data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem(
      "mediGuideToken"
    );

    localStorage.removeItem("token");

    localStorage.removeItem(
      "mediGuideUser"
    );

    localStorage.removeItem(
      "mediGuideAssessmentId"
    );

    window.location.href = "/login";
  };

  // ==========================================
  // LATEST ASSESSMENT
  // ==========================================

  const latestAssessment =
    assessments.length > 0
      ? assessments[0]
      : null;

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "No assessment yet";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}

          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <HeartPulse size={24} />
            </div>

            <div>

              <h1 className="font-bold text-gray-900">
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

          {/* PROFILE */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-gray-900">
                Welcome{" "}
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                Health Dashboard
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={20} />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* WELCOME */}

        <section className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            How are you feeling today?
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Start a quick health assessment and get
            general guidance based on the symptoms
            you provide.
          </p>

        </section>


        {/* ====================================
            DATABASE STATS
        ==================================== */}

        <section className="mb-10">

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* TOTAL ASSESSMENTS */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Assessments
                  </p>

                  {loading ? (

                    <div className="mt-2 h-9 w-16 animate-pulse rounded-lg bg-gray-200" />

                  ) : (

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {assessments.length}
                    </p>

                  )}

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                  <Activity size={24} />

                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                <CheckCircle
                  size={16}
                  className="text-green-500"
                />

                Saved in your health history

              </div>

            </div>


            {/* LATEST ASSESSMENT */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Latest Assessment
                  </p>

                  <p className="mt-2 text-xl font-bold text-gray-900">

                    {loading
                      ? "Loading..."
                      : formatDate(
                          latestAssessment?.createdAt
                        )}

                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">

                  <CalendarDays size={24} />

                </div>

              </div>

              <p className="mt-4 text-sm text-gray-500">

                {latestAssessment
                  ? "Most recent health assessment"
                  : "Complete your first assessment"}

              </p>

            </div>


            {/* STATUS */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Health Records
                  </p>

                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {loading
                      ? "Loading..."
                      : assessments.length > 0
                      ? "Active"
                      : "No Records"}
                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                  <HeartPulse size={24} />

                </div>

              </div>

              <p className="mt-4 text-sm text-gray-500">

                Your assessment records are stored
                securely.

              </p>

            </div>

          </div>

        </section>


        {/* ====================================
            ERROR
        ==================================== */}

        {error && (

          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex gap-3">

              <ShieldAlert
                size={22}
                className="shrink-0 text-red-600"
              />

              <div>

                <h3 className="font-semibold text-red-900">
                  Unable to load health records
                </h3>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

              </div>

            </div>

          </div>

        )}


        {/* ====================================
            ASSESSMENT CARD
        ==================================== */}

        <section className="mb-10">

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-xl md:p-10">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />

            <div className="relative max-w-3xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">

                <Stethoscope size={30} />

              </div>

              <h3 className="text-3xl font-bold">
                Start Health Assessment
              </h3>

              <p className="mt-4 max-w-2xl leading-7 text-blue-50">
                Answer a few simple questions about
                your symptoms. MediGuide AI can then
                provide general information about
                possible conditions, precautions, and
                when professional medical care may be
                appropriate.
              </p>

              <a
                href="/assessment"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Begin Assessment

                <ArrowRight size={18} />

              </a>

            </div>

          </div>

        </section>


        {/* ====================================
            QUICK ACTIONS
        ==================================== */}

        <section>

          <div className="mb-5">

            <h3 className="text-xl font-bold text-gray-900">
              Quick Actions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Access useful health tools
            </p>

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


            {/* ASSESSMENT */}

            <a
              href="/assessment"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                <Activity size={23} />

              </div>

              <h4 className="mt-5 font-bold text-gray-900">
                Health Assessment
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Answer guided questions about your
                symptoms.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600">

                Start

                <ArrowRight size={15} />

              </div>

            </a>


            {/* HISTORY */}

            <a
              href="/history"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">

                <CalendarDays size={23} />

              </div>

              <h4 className="mt-5 font-bold text-gray-900">
                Health History
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                View your previous assessment
                records.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-purple-600">

                View History

                <ArrowRight size={15} />

              </div>

            </a>


            {/* MEDICAL HELP */}

            <a
              href="/hospitals"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                <Hospital size={23} />

              </div>

              <h4 className="mt-5 font-bold text-gray-900">
                Medical Help
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find doctors and hospitals when
                needed.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">

                Find Help

                <ArrowRight size={15} />

              </div>

            </a>


            {/* EMERGENCY */}

            <a
              href="/emergency"
              className="group rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">

                <ShieldAlert size={23} />

              </div>

              <h4 className="mt-5 font-bold text-red-900">
                Emergency Help
              </h4>

              <p className="mt-2 text-sm leading-6 text-red-700">
                Get immediate guidance when
                symptoms appear serious.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-red-600">

                Emergency

                <ArrowRight size={15} />

              </div>

            </a>

          </div>

        </section>


        {/* ====================================
            LATEST ASSESSMENT
        ==================================== */}

        {latestAssessment && (

          <section className="mt-10">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Latest Assessment
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your most recent assessment
                  </p>

                </div>

                <a
                  href="/history"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All
                </a>

              </div>

              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {formatDate(
                      latestAssessment.createdAt
                    )}
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs text-gray-500">
                    Symptoms
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">

                    {Array.isArray(
                      latestAssessment.symptoms
                    )
                      ? latestAssessment.symptoms
                          .length
                      : 0}

                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs text-gray-500">
                    Severity
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">

                    {latestAssessment
                      .symptomDetails
                      ?.severity ||
                      latestAssessment.severity ||
                      "Not provided"}

                  </p>

                </div>

              </div>

            </div>

          </section>

        )}


        {/* ====================================
            HEALTH REMINDER
        ==================================== */}

        <section className="mt-10">

          <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

              <HeartPulse size={22} />

            </div>

            <div>

              <h3 className="font-bold text-blue-900">
                Health Reminder
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                MediGuide AI provides general health
                information and does not replace
                professional medical diagnosis or
                treatment. If symptoms are severe or
                rapidly worsening, seek professional
                medical help.
              </p>

            </div>

          </div>

        </section>


        {/* DATE */}

        <div className="mt-8 flex items-center justify-end gap-2 text-sm text-gray-500">

          <CalendarDays size={16} />

          Health Dashboard

        </div>

      </main>

    </div>
  );
}

export default Dashboard;