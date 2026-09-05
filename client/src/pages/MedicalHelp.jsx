import React, { useState } from "react";
import {
  HeartPulse,
  Stethoscope,
  Hospital,
  Ambulance,
  Phone,
  ShieldCheck,
  Pill,
  Brain,
  ChevronDown,
  ArrowRight,
  Activity,
  AlertTriangle,
  Apple,
  Droplets,
  Thermometer,
  Clock,
  CheckCircle,
  Info,
  Wind,
} from "lucide-react";

const MedicalHelp = () => {
  const [activeTab, setActiveTab] = useState("Emergency");
  const [openFaq, setOpenFaq] = useState(null);

  const tabs = ["Emergency", "First Aid", "Medicine Safety", "Healthy Lifestyle"];

  const faqs = [
    {
      q: "When should I call emergency services?",
      a: "Call emergency services immediately for severe breathing difficulty, chest pain, unconsciousness, heavy bleeding, seizures, stroke symptoms, or other life-threatening conditions.",
    },
    {
      q: "Can MediGuideAI replace a doctor?",
      a: "No. MediGuideAI provides general health guidance and educational information. It does not replace professional medical diagnosis or treatment.",
    },
    {
      q: "Can I take medicine based only on online information?",
      a: "No. Always follow the prescription or advice of a qualified healthcare professional and check the medicine label carefully.",
    },
    {
      q: "What should I do during a medical emergency?",
      a: "Stay calm, call emergency services, keep the person safe, and follow instructions from emergency professionals.",
    },
  ];

  const emergencySigns = [
    "Severe chest pain",
    "Difficulty breathing",
    "Unconsciousness",
    "Heavy bleeding",
    "Seizure",
    "Possible stroke symptoms",
  ];

  const firstAid = [
    {
      icon: Activity,
      title: "Minor Cuts",
      text: "Wash the wound gently with clean water, apply pressure if bleeding, and cover it with a clean dressing.",
    },
    {
      icon: Thermometer,
      title: "Fever",
      text: "Rest, drink adequate fluids, monitor temperature, and seek medical advice if symptoms are severe or persistent.",
    },
    {
      icon: Wind,
      title: "Breathing Difficulty",
      text: "Help the person sit upright, keep the surroundings calm, and seek emergency medical help if breathing is severely affected.",
    },
    {
      icon: AlertTriangle,
      title: "Burns",
      text: "Cool a minor burn under clean running water. Do not apply ice, toothpaste, or household remedies.",
    },
  ];

  const medicineRules = [
    "Take medicines only as directed.",
    "Never share prescription medicines.",
    "Check the expiry date before use.",
    "Follow the prescribed dose and timing.",
    "Tell your doctor about allergies and other medicines.",
    "Do not stop prescribed medicines without medical advice.",
  ];

  const healthyHabits = [
    {
      icon: Apple,
      title: "Balanced Diet",
      text: "Include fruits, vegetables, proteins, whole grains, and other nutritious foods.",
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      text: "Drink enough water throughout the day according to your activity and environment.",
    },
    {
      icon: Activity,
      title: "Stay Active",
      text: "Regular physical activity can support cardiovascular health, strength, and overall wellbeing.",
    },
    {
      icon: Clock,
      title: "Good Sleep",
      text: "Maintain a consistent sleep schedule and create a comfortable sleep environment.",
    },
  ];

  const renderTabContent = () => {
    if (activeTab === "Emergency") {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <div className="flex gap-4">
              <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-red-400" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Emergency Warning Signs
                </h3>
                <p className="mt-2 text-slate-300">
                  Seek immediate professional medical help if someone has:
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {emergencySigns.map((sign) => (
                    <div
                      key={sign}
                      className="flex items-center gap-3 rounded-xl bg-slate-950/50 p-3"
                    >
                      <CheckCircle className="h-5 w-5 text-red-400" />
                      <span className="text-sm text-slate-200">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a
            href="tel:112"
            className="flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700"
          >
            <Phone className="h-6 w-6" />
            Call Emergency Services — 112
          </a>
        </div>
      );
    }

    if (activeTab === "First Aid") {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          {firstAid.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"
              >
                <Icon className="h-8 w-8 text-cyan-400" />
                <h3 className="mt-4 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-400">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeTab === "Medicine Safety") {
      return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
          <div className="flex items-center gap-4">
            <Pill className="h-10 w-10 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white">
                Medicine Safety Rules
              </h3>
              <p className="text-slate-400">
                Follow professional medical advice when using medicines.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {medicineRules.map((rule) => (
              <div
                key={rule}
                className="flex items-start gap-3 rounded-xl bg-slate-950/60 p-4"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <span className="text-slate-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-5 md:grid-cols-2">
        {healthyHabits.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"
            >
              <Icon className="h-8 w-8 text-green-400" />
              <h3 className="mt-4 text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-400">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-2">
              <HeartPulse className="h-7 w-7 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-lg font-bold">MediGuideAI</h1>
              <p className="text-xs text-slate-500">Medical Help Center</p>
            </div>
          </a>

          <a
            href="/dashboard"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Dashboard
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
              Reliable Medical Information
            </div>

            <h2 className="text-4xl font-extrabold leading-tight sm:text-6xl">
              Medical Help When
              <span className="text-cyan-400"> You Need It</span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              Access useful health information, emergency guidance, first-aid
              tips, medicine safety information, and healthy lifestyle advice
              in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Start Health Assessment
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="tel:112"
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-3 font-bold text-red-300 transition hover:bg-red-500/20"
              >
                <Phone className="h-5 w-5" />
                Emergency 112
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY BANNER */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="rounded-2xl bg-red-500/10 p-3">
                <Ambulance className="h-8 w-8 text-red-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Medical Emergency?
                </h3>

                <p className="mt-1 text-slate-400">
                  Do not wait for online guidance during a life-threatening
                  emergency.
                </p>
              </div>
            </div>

            <a
              href="tel:112"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
            >
              <Phone className="h-5 w-5" />
              Call 112
            </a>
          </div>
        </div>
      </section>

      {/* INFORMATION TABS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Health Information
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Useful Medical Information
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Explore general medical information and safety guidance.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-cyan-500 text-slate-950"
                  : "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </section>

      {/* QUICK HELP */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10">
            <h2 className="text-3xl font-bold">Quick Medical Help</h2>
            <p className="mt-3 text-slate-400">
              Choose the service you need.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/assessment"
              className="group rounded-2xl border border-slate-700 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50"
            >
              <Activity className="h-9 w-9 text-cyan-400" />
              <h3 className="mt-5 text-xl font-bold">Health Assessment</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Answer health-related questions and review general guidance.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                Start Assessment
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>

            <a
              href="/hospitals"
              className="group rounded-2xl border border-slate-700 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50"
            >
              <Hospital className="h-9 w-9 text-green-400" />
              <h3 className="mt-5 text-xl font-bold">Nearby Hospitals</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Find healthcare facilities and hospitals when professional
                care is needed.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                Find Hospitals
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>

            <a
              href="/mental-wellness"
              className="group rounded-2xl border border-slate-700 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50"
            >
              <Brain className="h-9 w-9 text-purple-400" />
              <h3 className="mt-5 text-xl font-bold">Mental Wellness</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore general mental wellness and self-care resources.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* WHEN TO SEE DOCTOR */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="flex items-start gap-4">
            <Stethoscope className="mt-1 h-9 w-9 shrink-0 text-cyan-400" />

            <div>
              <h2 className="text-2xl font-bold">
                When Should You Consult a Doctor?
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                Consult a qualified healthcare professional if symptoms are
                severe, persistent, getting worse, repeatedly returning, or
                affecting your daily activities.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Symptoms are severe or rapidly worsening",
                  "Pain is persistent or unusual",
                  "You have difficulty breathing",
                  "You experience repeated fainting",
                  "You notice unexplained bleeding",
                  "You are concerned about a new symptom",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-slate-950 p-4"
                  >
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold">{faq.q}</span>

                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === index && (
                <div className="border-t border-slate-800 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
          <Info className="mt-1 h-6 w-6 shrink-0 text-yellow-400" />

          <div>
            <h3 className="font-bold text-yellow-300">
              Important Medical Disclaimer
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              The information provided by MediGuideAI is for general
              educational purposes only. It should not be considered a
              diagnosis, prescription, or substitute for professional medical
              advice. In an emergency, contact emergency services or a
              qualified healthcare professional immediately.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-cyan-400" />
            <span>MediGuideAI</span>
          </div>

          <p>
            AI-powered health guidance platform
          </p>

          <a
            href="/"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Home
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MedicalHelp;