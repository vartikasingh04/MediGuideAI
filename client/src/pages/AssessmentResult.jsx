import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  HeartPulse,
  Hospital,
  Info,
  ShieldAlert,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { matchDiseases } from "../utils/diseaseMatcher";

function AssessmentResult() {
  // ==========================================
  // STATE
  // ==========================================

  const [assessment, setAssessment] =
    useState(null);

  const [possibleConditions, setPossibleConditions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

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
  // GET ASSESSMENT ID
  // ==========================================

  const getAssessmentId = () => {
    return localStorage.getItem(
      "mediGuideAssessmentId"
    );
  };

  // ==========================================
  // FETCH ASSESSMENT
  // ==========================================

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------------
        // TOKEN
        // --------------------------------------

        const token = getToken();

        if (!token) {
          setError(
            "Authentication required. Please login again."
          );

          window.location.href = "/login";
          return;
        }

        // --------------------------------------
        // ASSESSMENT ID
        // --------------------------------------

        const assessmentId =
          getAssessmentId();

        if (!assessmentId) {
          setError(
            "Assessment ID not found."
          );

          return;
        }

        // --------------------------------------
        // API
        // --------------------------------------

        const response = await fetch(
          `http://localhost:5000/api/assessments/${assessmentId}`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },
          }
        );

        // --------------------------------------
        // SAFE RESPONSE
        // --------------------------------------

        const contentType =
          response.headers.get(
            "content-type"
          ) || "";

        let data;

        if (
          contentType.includes(
            "application/json"
          )
        ) {
          data =
            await response.json();
        } else {
          const text =
            await response.text();

          console.error(
            "Invalid server response:",
            text
          );

          throw new Error(
            "Server returned an invalid response."
          );
        }

        console.log(
          "Assessment result:",
          data
        );

        // --------------------------------------
        // 401
        // --------------------------------------

        if (
          response.status === 401
        ) {
          localStorage.removeItem(
            "mediGuideToken"
          );

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "mediGuideUser"
          );

          alert(
            "Your login session has expired. Please login again."
          );

          window.location.href =
            "/login";

          return;
        }

        // --------------------------------------
        // ERROR
        // --------------------------------------

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load assessment."
          );
        }

        // --------------------------------------
        // SAVE DATA
        // --------------------------------------

        if (!data.assessment) {
          throw new Error(
            "Assessment data not found."
          );
        }

        setAssessment(
          data.assessment
        );

        // --------------------------------------
        // MATCH DISEASES
        // --------------------------------------

        try {
          const symptoms =
            Array.isArray(
              data.assessment.symptoms
            )
              ? data.assessment.symptoms
              : [];

          if (symptoms.length > 0) {
            const matches =
              matchDiseases(symptoms);

            if (Array.isArray(matches)) {
              setPossibleConditions(
                matches
              );
            } else if (matches) {
              setPossibleConditions(
                [matches]
              );
            }
          }
        } catch (matchError) {
          console.error(
            "Disease matching error:",
            matchError
          );

          setPossibleConditions([]);
        }
      } catch (err) {
        console.error(
          "Assessment result error:",
          err
        );

        setError(
          err.message ||
            "Unable to load assessment result."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  // ==========================================
  // NEW ASSESSMENT
  // ==========================================

  const handleNewAssessment = () => {
    localStorage.removeItem(
      "mediGuideBasicInfo"
    );

    localStorage.removeItem(
      "mediGuideSymptoms"
    );

    localStorage.removeItem(
      "mediGuideSymptomDetails"
    );

    localStorage.removeItem(
      "mediGuideAssessmentId"
    );

    localStorage.removeItem(
      "mediGuideAssessment"
    );

    window.location.href =
      "/assessment";
  };

  // ==========================================
  // DASHBOARD
  // ==========================================

  const handleDashboard = () => {
    window.location.href =
      "/dashboard";
  };

  // ==========================================
  // EMERGENCY
  // ==========================================

  const handleEmergency = () => {
    window.location.href =
      "/emergency";
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <HeartPulse size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Preparing your result...
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load your
            assessment.
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">

        <header className="border-b border-gray-200 bg-white">

          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

            <button
              type="button"
              onClick={handleDashboard}
              className="flex items-center gap-3"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <HeartPulse size={22} />
              </div>

              <div className="text-left">

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

            </button>

          </div>

        </header>

        <main className="mx-auto max-w-xl px-6 py-16">

          <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">

              <AlertTriangle size={30} />

            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Unable to load result
            </h2>

            <p className="mt-3 text-gray-600">
              {error}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <button
                type="button"
                onClick={handleDashboard}
                className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleNewAssessment}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Start Assessment
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // ==========================================
  // SAFETY CHECK
  // ==========================================

  if (!assessment) {
    return null;
  }

  // ==========================================
  // DATA
  // ==========================================

  const symptoms =
    Array.isArray(
      assessment.symptoms
    )
      ? assessment.symptoms
      : [];

  const details =
    assessment.symptomDetails || {};

  const duration =
    details.duration ||
    assessment.duration ||
    "Not provided";

  const severity =
    details.severity ||
    assessment.severity ||
    "Not provided";

  const breathingDifficulty =
    details.breathingDifficulty ||
    "Not provided";

  const unconsciousness =
    details.unconsciousness ||
    "Not provided";

  const severeBleeding =
    details.severeBleeding ||
    "Not provided";

  // ==========================================
  // EMERGENCY CHECK
  // ==========================================

  const isEmergency =
    breathingDifficulty === "Yes" ||
    unconsciousness === "Yes" ||
    severeBleeding === "Yes" ||
    severity === "Severe";

  // ==========================================
  // RESULT
  // ==========================================

  const resultText =
    assessment.result ||
    "Based on the symptoms provided, this assessment can only provide general health information. A healthcare professional should evaluate persistent, severe, or concerning symptoms.";

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <button
            type="button"
            onClick={handleDashboard}
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">

              <HeartPulse size={24} />

            </div>

            <div className="text-left">

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

          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">

            <UserRound size={20} />

          </div>

        </div>

      </header>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* ====================================
            TITLE
        ==================================== */}

        <section className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Assessment Complete
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Health Assessment
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Here is a summary of the information
            you provided.
          </p>

        </section>

        {/* ====================================
            EMERGENCY ALERT
        ==================================== */}

        {isEmergency && (

          <section className="mb-8">

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">

                  <ShieldAlert size={25} />

                </div>

                <div>

                  <h3 className="font-bold text-red-900">
                    Urgent Medical Attention
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-red-800">

                    Some of the information you
                    provided may indicate symptoms
                    requiring prompt professional
                    medical evaluation.

                  </p>

                  <button
                    type="button"
                    onClick={
                      handleEmergency
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                  >

                    <Hospital size={17} />

                    Emergency Help

                  </button>

                </div>

              </div>

            </div>

          </section>

        )}

        {/* ====================================
            BASIC INFORMATION
        ==================================== */}

        <section className="mb-6">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                <UserRound size={22} />

              </div>

              <div>

                <h3 className="font-bold text-gray-900">
                  Basic Information
                </h3>

                <p className="text-sm text-gray-500">
                  Information provided during
                  assessment
                </p>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Age
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {assessment.age}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Gender
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {assessment.gender}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Existing Condition
                </p>

                <p className="mt-1 font-bold text-gray-900">
                  {assessment.existingCondition}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            SYMPTOMS
        ==================================== */}

        <section className="mb-6">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">

                <Stethoscope size={22} />

              </div>

              <div>

                <h3 className="font-bold text-gray-900">
                  Reported Symptoms
                </h3>

                <p className="text-sm text-gray-500">
                  Symptoms selected during
                  assessment
                </p>

              </div>

            </div>

            {symptoms.length > 0 ? (

              <div className="flex flex-wrap gap-2">

                {symptoms.map(
                  (symptom, index) => (

                    <span
                      key={`${symptom}-${index}`}
                      className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700"
                    >
                      {symptom}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="text-sm text-gray-500">
                No symptoms were selected.
              </p>

            )}

          </div>

        </section>

        {/* ====================================
            SYMPTOM DETAILS
        ==================================== */}

        <section className="mb-6">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">

                <Info size={22} />

              </div>

              <div>

                <h3 className="font-bold text-gray-900">
                  Symptom Details
                </h3>

                <p className="text-sm text-gray-500">
                  Additional information
                </p>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Duration
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {duration}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Severity
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {severity}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Breathing Difficulty
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {breathingDifficulty}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Unconsciousness
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {unconsciousness}
                </p>

              </div>

              <div className="rounded-xl bg-gray-50 p-4">

                <p className="text-xs text-gray-500">
                  Severe Bleeding
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {severeBleeding}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            POSSIBLE CONDITIONS
        ==================================== */}

        <section className="mb-6">

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                <HeartPulse size={22} />

              </div>

              <div>

                <h3 className="font-bold text-gray-900">
                  Possible Conditions
                </h3>

                <p className="text-sm text-gray-500">
                  Based on the symptoms you
                  selected
                </p>

              </div>

            </div>

            {possibleConditions.length > 0 ? (

              <div className="space-y-3">

                {possibleConditions.map(
                  (condition, index) => {

                    const name =
                      typeof condition ===
                      "string"
                        ? condition
                        : condition?.name ||
                          condition?.disease ||
                          "Possible condition";

                    const description =
                      typeof condition ===
                      "object"
                        ? condition?.description
                        : "";

                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-blue-100 bg-blue-50 p-4"
                      >

                        <div className="flex items-start gap-3">

                          <CheckCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-blue-600"
                          />

                          <div>

                            <h4 className="font-semibold text-blue-900">
                              {name}
                            </h4>

                            {description && (

                              <p className="mt-1 text-sm leading-6 text-blue-800">
                                {description}
                              </p>

                            )}

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              <div className="rounded-xl bg-gray-50 p-5">

                <p className="text-sm leading-6 text-gray-600">
                  No specific condition could be
                  identified from the selected
                  symptoms. This does not rule out
                  any medical condition.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* ====================================
            GENERAL RESULT
        ==================================== */}

        <section className="mb-6">

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                <CheckCircle size={22} />

              </div>

              <div>

                <h3 className="font-bold text-emerald-900">
                  General Guidance
                </h3>

                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  {resultText}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            MEDICAL DISCLAIMER
        ==================================== */}

        <section className="mb-8">

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">

            <div className="flex items-start gap-4">

              <AlertTriangle
                size={22}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>

                <h3 className="font-bold text-amber-900">
                  Important Medical Disclaimer
                </h3>

                <p className="mt-2 text-sm leading-6 text-amber-800">

                  MediGuide AI provides general
                  health information and is not a
                  substitute for professional
                  medical diagnosis or treatment.
                  Do not use this result to make
                  medical decisions without consulting
                  a qualified healthcare professional.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            ACTIONS
        ==================================== */}

        <section>

          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleDashboard}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >

              <ArrowLeft size={18} />

              Dashboard

            </button>

            <button
              type="button"
              onClick={
                handleNewAssessment
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >

              Start New Assessment

              <ArrowRight size={18} />

            </button>

          </div>

        </section>

        {/* ====================================
            DATE
        ==================================== */}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">

          <CalendarDays size={16} />

          Assessment completed

        </div>

      </main>

    </div>
  );
}

export default AssessmentResult;