import React from "react";
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
  Home,
} from "lucide-react";
import { useState } from "react";

const MedicalHelp = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "When should I seek emergency medical help?",
      answer:
        "Seek immediate medical help if you experience severe chest pain, difficulty breathing, unconsciousness, severe bleeding, stroke symptoms, or any life-threatening condition.",
    },
    {
      question: "Can MediGuideAI diagnose my disease?",
      answer:
        "MediGuideAI provides health guidance based on the information you provide. It does not replace a qualified doctor or professional medical diagnosis.",
    },
    {
      question: "What should I do before visiting a doctor?",
      answer:
        "Note your symptoms, how long they have been present, their severity, current medicines, allergies, and any existing health conditions.",
    },
    {
      question: "Can I use MediGuideAI for emergency situations?",
      answer:
        "For emergencies, contact your local emergency medical service immediately. Do not delay professional medical care while using an AI-based health guidance tool.",
    },
  ];

  const handleEmergency = () => {
    window.location.href = "tel:112";
  };

  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-2">
              <HeartPulse size={22} />
            </div>

            <span>
              MediGuide<span className="text-cyan-400">AI</span>
            </span>
          </button>

          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <Home size={17} />
            Dashboard
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/20">
            <Stethoscope size={40} />
          </div>

          <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
            MediGuideAI Medical Support
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            How Can We
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Help You Today?
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Get quick access to medical guidance, emergency support,
            hospitals, doctors and important health information.
          </p>

          <button
            onClick={handleEmergency}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-red-600 px-7 py-4 font-bold shadow-lg shadow-red-600/20 transition hover:bg-red-700 hover:scale-105"
          >
            <Ambulance size={22} />
            Emergency Help
            <ArrowRight size={20} />
          </button>

        </div>
      </section>

      {/* EMERGENCY ALERT */}
      <section className="mx-auto max-w-6xl px-6">

        <div className="flex flex-col gap-5 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 md:flex-row md:items-center md:justify-between">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
              <AlertTriangle />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Medical Emergency?
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                If someone is unconscious, having severe breathing
                difficulty, severe bleeding or another life-threatening
                emergency, seek professional medical help immediately.
              </p>
            </div>

          </div>

          <button
            onClick={handleEmergency}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
          >
            <Phone size={18} />
            Call 112
          </button>

        </div>

      </section>

      {/* HELP OPTIONS */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-10 text-center">

          <p className="font-semibold text-cyan-400">
            HEALTH SUPPORT
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Medical Help & Resources
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Choose the type of medical assistance or information you need.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Doctor */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
              <Stethoscope size={28} />
            </div>

            <h3 className="text-xl font-bold">
              Find a Doctor
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Consult a qualified healthcare professional for proper
              diagnosis and treatment.
            </p>

            <button
              onClick={() =>
                alert(
                  "Please consult a qualified doctor or visit your nearest clinic."
                )
              }
              className="mt-6 flex items-center gap-2 font-semibold text-cyan-400"
            >
              Get Medical Advice
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Hospital */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
              <Hospital size={28} />
            </div>

            <h3 className="text-xl font-bold">
              Nearby Hospitals
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Locate hospitals and healthcare facilities when you need
              professional medical assistance.
            </p>

            <button
              onClick={() => {
                window.location.href = "/hospitals";
              }}
              className="mt-6 flex items-center gap-2 font-semibold text-blue-400"
            >
              Find Hospitals
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Emergency */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:border-red-400/40 hover:bg-white/10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
              <Ambulance size={28} />
            </div>

            <h3 className="text-xl font-bold">
              Emergency Services
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Quickly access emergency support when facing a
              life-threatening situation.
            </p>

            <button
              onClick={handleEmergency}
              className="mt-6 flex items-center gap-2 font-semibold text-red-400"
            >
              Call Emergency
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Medicine */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
              <Pill size={28} />
            </div>

            <h3 className="text-xl font-bold">
              Medicine Information
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Learn about safe medicine practices and why professional
              medical advice matters.
            </p>

            <button
              onClick={() =>
                alert(
                  "Do not start, stop or change medicines without professional medical advice."
                )
              }
              className="mt-6 flex items-center gap-2 font-semibold text-purple-400"
            >
              Safety Information
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Mental Wellness */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:border-pink-400/40 hover:bg-white/10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-400">
              <Brain size={28} />
            </div>

            <h3 className="text-xl font-bold">
              Mental Wellness
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Take care of your emotional wellbeing and seek professional
              support when needed.
            </p>

            <button
              onClick={() => {
                window.location.href = "/mental-wellness";
              }}
              className="mt-6 flex items-center gap-2 font-semibold text-pink-400"
            >
              Explore Wellness
              <ArrowRight size={17} />
            </button>

          </div>

          {/* Assessment */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:border-emerald-400/40 hover:bg-white/10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <Activity size={28} />
            </div>

            <h3 className="text-xl font-bold">
              Health Assessment
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter your symptoms and receive general health guidance
              from MediGuideAI.
            </p>

            <button
              onClick={() => {
                window.location.href = "/assessment";
              }}
              className="mt-6 flex items-center gap-2 font-semibold text-emerald-400"
            >
              Start Assessment
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </section>

      {/* SAFETY */}
      <section className="mx-auto max-w-6xl px-6 pb-16">

        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
              <ShieldCheck size={34} />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Important Medical Safety Notice
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                MediGuideAI is designed to provide general health
                information and guidance. It is not a replacement for
                a qualified doctor, hospital or emergency medical service.
                Always seek professional medical care for serious or
                worsening symptoms.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-20">

        <div className="mb-10 text-center">

          <p className="font-semibold text-cyan-400">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >

              <button
                onClick={() =>
                  setOpenFaq(
                    openFaq === index ? null : index
                  )
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >

                <span className="pr-5 font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 transition ${
                    openFaq === index
                      ? "rotate-180 text-cyan-400"
                      : "text-slate-400"
                  }`}
                />

              </button>

              {openFaq === index && (

                <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20">

        <div className="mx-auto max-w-7xl px-6 py-8 text-center">

          <div className="flex items-center justify-center gap-2 font-bold">
            <HeartPulse className="text-cyan-400" size={22} />
            MediGuideAI
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Smart health guidance for a healthier tomorrow.
          </p>

          <p className="mt-5 text-xs text-slate-600">
            © {new Date().getFullYear()} MediGuideAI. For informational
            purposes only.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default MedicalHelp;