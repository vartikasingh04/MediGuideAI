import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  HeartPulse,
  Hospital,
  Info,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";

function AssessmentResult() {
  const [assessment, setAssessment] = useState(null);
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
  // LOAD LOCAL DATA
  // ==========================================

  const getLocalAssessment = () => {
    try {
      const symptoms = JSON.parse(
        localStorage.getItem("mediGuideSymptoms") || "[]"
      );

      const symptomDetails = JSON.parse(
        localStorage.getItem(
          "mediGuideSymptomDetails"
        ) || "{}"
      );

      const assessmentId = localStorage.getItem(
        "mediGuideAssessmentId"
      );

      return {
        _id: assessmentId,
        symptoms,
        symptomDetails,
      };
    } catch (error) {
      console.error(
        "Local assessment error:",
        error
      );

      return null;
    }
  };

  // ==========================================
  // FETCH ASSESSMENT
  // ==========================================

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        setLoading(true);
        setError("");

        const assessmentId =
          localStorage.getItem(
            "mediGuideAssessmentId"
          );

        // ======================================
        // NO ID
        // ======================================

        if (!assessmentId) {
          const localData =
            getLocalAssessment();

          if (localData) {
            setAssessment(localData);
            return;
          }

          throw new Error(
            "Assessment information not found."
          );
        }

        const token = getToken();

        // ======================================
        // NO TOKEN
        // ======================================

        if (!token) {
          const localData =
            getLocalAssessment();

          if (localData) {
            setAssessment(localData);
            return;
          }

          window.location.href = "/login";
          return;
        }

        // ======================================
        // BACKEND REQUEST
        // ======================================

        const response = await fetch(
          `http://localhost:5000/api/assessments/${assessmentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const responseText =
          await response.text();

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

        // ======================================
        // SESSION EXPIRED
        // ======================================

        if (response.status === 401) {
          localStorage.removeItem(
            "mediGuideToken"
          );

          localStorage.removeItem("token");

          localStorage.removeItem(
            "mediGuideUser"
          );

          window.location.href = "/login";
          return;
        }

        // ======================================
        // BACKEND ERROR
        // ======================================

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load assessment."
          );
        }

        // ======================================
        // SAVE ASSESSMENT
        // ======================================

        const result =
          data.assessment || data.data || data;

        setAssessment(result);
      } catch (error) {
        console.error(
          "Assessment result error:",
          error
        );

        // ======================================
        // FALLBACK LOCAL DATA
        // ======================================

        const localData =
          getLocalAssessment();

        if (localData) {
          setAssessment(localData);
          setError(
            "Showing saved assessment information."
          );
        } else {
          setError(
            error.message ||
              "Unable to load assessment."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, []);

  // ==========================================
  // EXTRACT DATA
  // ==========================================

  const symptoms = Array.isArray(
    assessment?.symptoms
  )
    ? assessment.symptoms
    : Array.isArray(
        assessment?.symptomDetails?.symptoms
      )
    ? assessment.symptomDetails.symptoms
    : [];

  const details =
    assessment?.symptomDetails || {};

  const duration =
    details.duration ||
    assessment?.duration ||
    "Not provided";

  const severity =
    details.severity ||
    assessment?.severity ||
    "Not provided";

  const breathingDifficulty =
    details.breathingDifficulty || "";

  const unconsciousness =
    details.unconsciousness || "";

  const severeBleeding =
    details.severeBleeding || "";

  // ==========================================
  // EMERGENCY
  // ==========================================

  const emergencyDetected =
    breathingDifficulty === "Yes" ||
    unconsciousness === "Yes" ||
    severeBleeding === "Yes";

  // ==========================================
  // GUIDANCE
  // ==========================================

  const getGuidance = () => {
    if (emergencyDetected) {
      return {
        title:
          "Urgent medical attention may be needed",
        text:
          "Your answers include an emergency warning sign. Please seek urgent professional medical care. If the situation is life-threatening, contact emergency services or go to the nearest emergency facility.",
        type: "emergency",
      };
    }

    if (severity === "Severe") {
      return {
        title:
          "Professional medical advice is recommended",
        text:
          "Because your symptoms are marked as severe, consider contacting a qualified healthcare professional for appropriate evaluation.",
        type: "warning",
      };
    }

    if (severity === "Moderate") {
      return {
        title:
          "Monitor your symptoms carefully",
        text:
          "Consider speaking with a healthcare professional if symptoms continue, worsen, or interfere significantly with your daily activities.",
        type: "info",
      };
    }

    return {
      title:
        "General health guidance",
      text:
        "Your answers do not indicate an emergency based on this screening. Continue monitoring your symptoms and seek professional advice if they persist or worsen.",
      type: "normal",
    };
  };

  const guidance = getGuidance();

  // ==========================================
  // RESTART
  // ==========================================

  const handleNewAssessment = () => {
    localStorage.removeItem(
      "mediGuideAssessmentId"
    );

    localStorage.removeItem(
      "mediGuideSymptoms"
    );

    localStorage.removeItem(
      "mediGuideSymptomDetails"
    );

    window.location.href =
      "/assessment";
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <HeartPulse
            size={42}
            className="mx-auto animate-pulse text-blue-600"
          />

          <p className="mt-4 font-semibold text-gray-700">
            Preparing your assessment result...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (!assessment && error) {
    return (
      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-xl px-6 py-20">

          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <AlertTriangle
              size={42}
              className="mx-auto text-red-600"
            />

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Unable to load result
            </h2>

            <p className="mt-3 text-gray-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

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
                Assessment Result
              </p>

            </div>

          </a>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserRound size={20} />
          </div>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-4xl px-6 py-10">

        {/* BACK */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-7 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* ====================================
            RESULT HEADER
        ==================================== */}

        <section className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Assessment Complete
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Health Assessment Result
          </h2>

          <p className="mt-3 max-w-2xl leading-6 text-gray-600">
            Here is a summary of the information you
            provided during your assessment.
          </p>

        </section>


        {/* ====================================
            STATUS
        ==================================== */}

        <section
          className={`rounded-3xl border p-7 shadow-sm ${
            emergencyDetected
              ? "border-red-200 bg-red-50"
              : guidance.type === "warning"
              ? "border-amber-200 bg-amber-50"
              : "border-green-200 bg-green-50"
          }`}
        >

          <div className="flex items-start gap-4">

            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                emergencyDetected
                  ? "bg-red-100 text-red-600"
                  : guidance.type === "warning"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-green-100 text-green-600"
              }`}
            >

              {emergencyDetected ? (
                <AlertTriangle size={28} />
              ) : guidance.type === "warning" ? (
                <Info size={28} />
              ) : (
                <CheckCircle size={28} />
              )}

            </div>

            <div>

              <h3
                className={`text-xl font-bold ${
                  emergencyDetected
                    ? "text-red-900"
                    : guidance.type === "warning"
                    ? "text-amber-900"
                    : "text-green-900"
                }`}
              >
                {guidance.title}
              </h3>

              <p
                className={`mt-2 leading-6 ${
                  emergencyDetected
                    ? "text-red-800"
                    : guidance.type === "warning"
                    ? "text-amber-800"
                    : "text-green-800"
                }`}
              >
                {guidance.text}
              </p>

            </div>

          </div>

        </section>


        {/* ====================================
            SYMPTOM SUMMARY
        ==================================== */}

        <section className="mt-7 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <HeartPulse size={23} />
            </div>

            <div>

              <h3 className="text-xl font-bold text-gray-900">
                Symptom Summary
              </h3>

              <p className="text-sm text-gray-500">
                Information provided by you
              </p>

            </div>

          </div>


          {/* SYMPTOMS */}

          <div className="mt-7">

            <p className="mb-3 text-sm font-semibold text-gray-700">
              Selected Symptoms
            </p>

            {symptoms.length > 0 ? (

              <div className="flex flex-wrap gap-2">

                {symptoms.map((symptom) => (

                  <span
                    key={symptom}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {symptom}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-sm text-gray-500">
                No symptoms recorded.
              </p>

            )}

          </div>


          {/* DETAILS */}

          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-xs uppercase tracking-wide text-gray-500">
                Duration
              </p>

              <p className="mt-2 font-bold text-gray-900">
                {duration}
              </p>

            </div>


            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-xs uppercase tracking-wide text-gray-500">
                Severity
              </p>

              <p className="mt-2 font-bold text-gray-900">
                {severity}
              </p>

            </div>

          </div>

        </section>


        {/* ====================================
            EMERGENCY CHECK
        ==================================== */}

        <section className="mt-7 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

          <h3 className="text-xl font-bold text-gray-900">
            Emergency Safety Check
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Responses to emergency screening questions.
          </p>


          <div className="mt-6 space-y-3">

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

              <span className="text-sm font-medium text-gray-700">
                Severe difficulty breathing
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  breathingDifficulty === "Yes"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {breathingDifficulty || "Not answered"}
              </span>

            </div>


            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

              <span className="text-sm font-medium text-gray-700">
                Unconsciousness / difficult to wake
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  unconsciousness === "Yes"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {unconsciousness || "Not answered"}
              </span>

            </div>


            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

              <span className="text-sm font-medium text-gray-700">
                Severe or uncontrolled bleeding
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  severeBleeding === "Yes"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {severeBleeding || "Not answered"}
              </span>

            </div>

          </div>

        </section>


        {/* ====================================
            EMERGENCY BUTTON
        ==================================== */}

        {emergencyDetected && (

          <section className="mt-7 rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 p-7 text-white shadow-xl">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h3 className="text-xl font-bold">
                  Emergency assistance may be required
                </h3>

                <p className="mt-2 text-sm leading-6 text-red-50">
                  Please seek urgent professional medical
                  attention.
                </p>

              </div>

              <a
                href="/emergency"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-red-600 transition hover:bg-red-50"
              >
                <Hospital size={19} />
                Emergency Help
              </a>

            </div>

          </section>

        )}


        {/* ====================================
            GENERAL GUIDANCE
        ==================================== */}

        {!emergencyDetected && (

          <section className="mt-7 rounded-3xl border border-blue-100 bg-blue-50 p-7">

            <div className="flex items-start gap-4">

              <ShieldCheck
                size={25}
                className="mt-1 shrink-0 text-blue-600"
              />

              <div>

                <h3 className="font-bold text-blue-900">
                  General Health Guidance
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-800">

                  <li>
                    • Monitor your symptoms regularly.
                  </li>

                  <li>
                    • Stay hydrated and get adequate rest.
                  </li>

                  <li>
                    • If symptoms worsen or persist, consult
                    a qualified healthcare professional.
                  </li>

                  <li>
                    • Do not use this assessment as a
                    substitute for medical diagnosis.
                  </li>

                </ul>

              </div>

            </div>

          </section>

        )}


        {/* ====================================
            ACTIONS
        ==================================== */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <a
            href="/dashboard"
            className="flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Dashboard
          </a>

          <a
            href="/history"
            className="flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            View History
          </a>

          <button
            type="button"
            onClick={handleNewAssessment}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            New Assessment
            <ArrowLeft
              size={17}
              className="rotate-180"
            />
          </button>

        </section>


        {/* ====================================
            DISCLAIMER
        ==================================== */}

        <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-center text-xs leading-5 text-amber-800">

          <strong>Important:</strong> MediGuide AI provides
          general health information and is not a medical
          diagnosis. If symptoms are severe, rapidly worsening,
          or you are concerned about your safety, seek
          professional medical care.

        </div>

      </main>

    </div>
  );
}

export default AssessmentResult;