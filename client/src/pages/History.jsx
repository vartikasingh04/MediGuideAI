import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  HeartPulse,
  Loader2,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import API_URL from "../api";
function History() {
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
      const user = localStorage.getItem("mediGuideUser");

      if (user) {
        return JSON.parse(user);
      }
    } catch (error) {
      console.error("User parse error:", error);
    }

    return null;
  };

  const user = getUser();

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // GET SEVERITY
  // ==========================================

  const getSeverity = (assessment) => {
    return (
      assessment?.symptomDetails?.severity ||
      assessment?.severity ||
      "Not provided"
    );
  };

  // ==========================================
  // GET SYMPTOMS
  // ==========================================

  const getSymptoms = (assessment) => {
    if (Array.isArray(assessment?.symptoms)) {
      return assessment.symptoms;
    }

    if (Array.isArray(assessment?.symptomDetails?.symptoms)) {
      return assessment.symptomDetails.symptoms;
    }

    return [];
  };

  // ==========================================
  // FETCH HISTORY
  // ==========================================

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          window.location.href = "/login";
          return;
        }

       const response = await fetch(
  `${API_URL}/api/assessments`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

        const responseText = await response.text();

        let data;

        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Invalid backend response:",
            responseText
          );

          throw new Error(
            "Server returned an invalid response."
          );
        }

        // ======================================
        // SESSION EXPIRED
        // ======================================

        if (response.status === 401) {
          localStorage.removeItem("mediGuideToken");
          localStorage.removeItem("token");
          localStorage.removeItem("mediGuideUser");

          alert("Your session has expired. Please login again.");

          window.location.href = "/login";
          return;
        }

        // ======================================
        // OTHER ERROR
        // ======================================

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load health history."
          );
        }

        // ======================================
        // SAVE DATA
        // ======================================

        const records = Array.isArray(data.assessments)
          ? data.assessments
          : [];

        setAssessments(records);
      } catch (error) {
        console.error(
          "History fetch error:",
          error
        );

        setError(
          error.message ||
            "Unable to load health history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("mediGuideToken");
    localStorage.removeItem("token");
    localStorage.removeItem("mediGuideUser");
    localStorage.removeItem("mediGuideAssessmentId");

    window.location.href = "/login";
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

          {/* USER */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-gray-900">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                Health History
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={20} />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* BACK */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-7 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* ====================================
            PAGE HEADER
        ==================================== */}

        <section className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Health Records
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Assessment History
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            View your previous health assessments and
            the symptom information you provided.
          </p>

        </section>


        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (

          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <Loader2
              size={35}
              className="mx-auto animate-spin text-blue-600"
            />

            <p className="mt-4 font-medium text-gray-700">
              Loading your health history...
            </p>

          </div>

        )}


        {/* ====================================
            ERROR
        ==================================== */}

        {!loading && error && (

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <ShieldAlert size={23} />
              </div>

              <div>

                <h3 className="font-bold text-red-900">
                  Unable to load history
                </h3>

                <p className="mt-2 text-sm text-red-700">
                  {error}
                </p>

              </div>

            </div>

          </div>

        )}


        {/* ====================================
            EMPTY STATE
        ==================================== */}

        {!loading &&
          !error &&
          assessments.length === 0 && (

            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                <HeartPulse size={30} />

              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                No assessments yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                You haven't completed any health assessments.
                Start your first assessment to create a health
                record.
              </p>

              <a
                href="/assessment"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Start Assessment
                <ArrowRight size={18} />
              </a>

            </div>
          )}


        {/* ====================================
            ASSESSMENT LIST
        ==================================== */}

        {!loading &&
          !error &&
          assessments.length > 0 && (

            <section className="space-y-5">

              {/* SUMMARY */}

              <div className="mb-6 grid gap-5 sm:grid-cols-3">

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                  <p className="text-sm text-gray-500">
                    Total Assessments
                  </p>

                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {assessments.length}
                  </p>

                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                  <p className="text-sm text-gray-500">
                    Latest Assessment
                  </p>

                  <p className="mt-2 font-bold text-gray-900">
                    {formatDate(
                      assessments[0]?.createdAt
                    )}
                  </p>

                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                  <p className="text-sm text-gray-500">
                    Health Records
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <CheckCircle
                      size={20}
                      className="text-green-500"
                    />

                    <span className="font-bold text-green-700">
                      Active
                    </span>

                  </div>

                </div>

              </div>


              {/* RECORDS */}

              {assessments.map((assessment, index) => {

                const symptoms =
                  getSymptoms(assessment);

                const severity =
                  getSeverity(assessment);

                return (

                  <div
                    key={
                      assessment._id ||
                      assessment.id ||
                      index
                    }
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >

                    {/* TOP */}

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                          <HeartPulse size={24} />

                        </div>

                        <div>

                          <h3 className="text-lg font-bold text-gray-900">
                            Health Assessment #{index + 1}
                          </h3>

                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                            <CalendarDays size={16} />

                            {formatDate(
                              assessment.createdAt
                            )}

                          </div>

                        </div>

                      </div>


                      {/* STATUS */}

                      <div className="flex items-center gap-2">

                        <CheckCircle
                          size={17}
                          className="text-green-500"
                        />

                        <span className="text-sm font-semibold text-green-700">
                          Completed
                        </span>

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">

                      {/* SYMPTOMS */}

                      <div className="rounded-xl bg-gray-50 p-4">

                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Symptoms
                        </p>

                        <p className="mt-2 text-lg font-bold text-gray-900">
                          {symptoms.length}
                        </p>

                        {symptoms.length > 0 && (

                          <div className="mt-2 flex flex-wrap gap-1.5">

                            {symptoms
                              .slice(0, 3)
                              .map((symptom) => (

                                <span
                                  key={symptom}
                                  className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                                >
                                  {symptom}
                                </span>

                              ))}

                            {symptoms.length > 3 && (

                              <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600">
                                +{symptoms.length - 3}
                              </span>

                            )}

                          </div>

                        )}

                      </div>


                      {/* SEVERITY */}

                      <div className="rounded-xl bg-gray-50 p-4">

                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Severity
                        </p>

                        <p className="mt-2 text-lg font-bold text-gray-900">
                          {severity}
                        </p>

                      </div>


                      {/* DURATION */}

                      <div className="rounded-xl bg-gray-50 p-4">

                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Duration
                        </p>

                        <p className="mt-2 text-lg font-bold text-gray-900">

                          {assessment
                            ?.symptomDetails
                            ?.duration ||
                            assessment?.duration ||
                            "Not provided"}

                        </p>

                      </div>

                    </div>


                    {/* EMERGENCY STATUS */}

                    {(assessment?.symptomDetails
                      ?.breathingDifficulty === "Yes" ||
                      assessment?.symptomDetails
                        ?.unconsciousness === "Yes" ||
                      assessment?.symptomDetails
                        ?.severeBleeding === "Yes") && (

                      <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">

                        <div className="flex items-start gap-3">

                          <ShieldAlert
                            size={20}
                            className="mt-0.5 shrink-0 text-red-600"
                          />

                          <div>

                            <p className="font-semibold text-red-900">
                              Emergency warning detected
                            </p>

                            <p className="mt-1 text-sm text-red-700">
                              This assessment included an
                              emergency-related response.
                              Professional medical attention
                              may be required.
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                );
              })}

            </section>
          )}


        {/* ====================================
            DISCLAIMER
        ==================================== */}

        <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-center text-xs leading-5 text-amber-800">

          <strong>Important:</strong> Your assessment history
          is for general health information only and does not
          represent a medical diagnosis. Consult a qualified
          healthcare professional for medical advice.

        </div>

      </main>

    </div>
  );
}

export default History;
