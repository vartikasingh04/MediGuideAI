import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  HeartPulse,
  Hospital,
  LifeBuoy,
  MapPin,
  Phone,
  Pill,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
  UserRound,
  XCircle,
} from "lucide-react";

const MedicalHelp = () => {
  const [activeTab, setActiveTab] = useState("first-aid");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "When should I visit a doctor?",
      answer:
        "Consult a doctor when symptoms are severe, persistent, getting worse, or affecting your daily activities. For serious or sudden symptoms, seek medical help immediately.",
    },
    {
      question: "What should I do in a medical emergency?",
      answer:
        "Stay calm, call 112 for emergency assistance, and avoid giving medicines or food unless advised by a qualified professional.",
    },
    {
      question: "Can I take medicine without consulting a doctor?",
      answer:
        "Avoid taking prescription medicines without professional advice. Even common medicines can cause side effects or interact with other medicines.",
    },
    {
      question: "How can I find a nearby hospital?",
      answer:
        "Use the Medical Help section to find healthcare facilities and use the Emergency page when immediate assistance is required.",
    },
  ];

  const tabs = [
    {
      id: "first-aid",
      label: "First Aid",
      icon: LifeBuoy,
    },
    {
      id: "medicine",
      label: "Medicine Safety",
      icon: Pill,
    },
    {
      id: "healthy",
      label: "Healthy Lifestyle",
      icon: HeartPulse,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">

      {/* ================= HEADER ================= */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <HeartPulse size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                MediGuide<span className="text-blue-600">AI</span>
              </h1>
              <p className="text-xs text-gray-500">
                Smart Health Guidance
              </p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:block"
            >
              Dashboard
            </a>

            <a
              href="/assessment"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:block"
            >
              New Assessment
            </a>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-xl md:p-12">

          <div className="relative z-10 max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Stethoscope size={17} />
              Medical Support & Guidance
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Get the Right Medical Help
              <span className="block text-blue-100">
                When You Need It
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
              Find useful information about first aid, medicine safety,
              healthy habits and when professional medical assistance
              may be necessary.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="/hospitals"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
              >
                <Hospital size={19} />
                Find Medical Help
                <ArrowRight size={17} />
              </a>

              <a
                href="/emergency"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <ShieldAlert size={19} />
                Emergency Help
              </a>

            </div>
          </div>

          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-white/10" />

          <div className="absolute bottom-8 right-10 hidden rounded-3xl bg-white/15 p-6 backdrop-blur-md lg:block">
            <HeartPulse size={75} className="text-white" />
          </div>

        </section>

        {/* ================= EMERGENCY WARNING ================= */}
        <section className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <ShieldAlert size={25} />
              </div>

              <div>
                <h3 className="font-bold text-red-700">
                  Medical Emergency?
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-600">
                  For life-threatening situations such as severe breathing
                  difficulty, unconsciousness, chest pain or heavy bleeding,
                  seek emergency medical assistance immediately.
                </p>
              </div>
            </div>

            <a
              href="tel:112"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <Phone size={18} />
              Call 112
            </a>

          </div>
        </section>

        {/* ================= QUICK INFO ================= */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Clock size={24} />
            </div>

            <h3 className="font-bold text-gray-900">
              Act Early
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Getting professional help early can be important when
              symptoms are severe or getting worse.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <ShieldCheck size={24} />
            </div>

            <h3 className="font-bold text-gray-900">
              Stay Safe
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Avoid self-medication and always follow instructions from
              qualified healthcare professionals.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Activity size={24} />
            </div>

            <h3 className="font-bold text-gray-900">
              Monitor Symptoms
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Keep track of symptoms and changes so you can explain them
              clearly to a healthcare professional.
            </p>
          </div>

        </section>

        {/* ================= INFORMATION TABS ================= */}
        <section className="mt-12">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Health & Safety Information
            </h2>

            <p className="mt-2 text-gray-500">
              Simple guidance for common healthcare situations.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">

            {tabs.map((tab) => {
              const Icon = tab.icon;

              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}

          </div>

          {/* First Aid */}
          {activeTab === "first-aid" && (
            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <LifeBuoy size={22} />
                  </div>

                  <h3 className="text-xl font-bold">
                    Basic First Aid
                  </h3>
                </div>

                <div className="space-y-4">

                  {[
                    "Stay calm and check whether the person is responsive.",
                    "For minor cuts, clean the wound and apply gentle pressure.",
                    "For minor burns, cool the area with clean running water.",
                    "Do not apply unknown substances directly to serious wounds.",
                    "For serious injuries, contact emergency medical services.",
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      <p className="text-sm leading-6 text-gray-600">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <XCircle size={22} />
                  </div>

                  <h3 className="text-xl font-bold">
                    Avoid These Mistakes
                  </h3>
                </div>

                <div className="space-y-4">

                  {[
                    "Do not ignore severe or rapidly worsening symptoms.",
                    "Do not move someone with a suspected serious spinal injury unnecessarily.",
                    "Do not give food or drink to an unconscious person.",
                    "Do not take prescription medicines without professional advice.",
                    "Do not delay emergency care while trying home remedies.",
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <XCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-500"
                      />
                      <p className="text-sm leading-6 text-gray-600">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          )}

          {/* Medicine Safety */}
          {activeTab === "medicine" && (
            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <Pill size={22} />
                  </div>

                  <h3 className="text-xl font-bold">
                    Medicine Safety Rules
                  </h3>
                </div>

                <div className="space-y-4">

                  {[
                    "Take medicines only according to professional instructions.",
                    "Read the medicine label and follow the recommended dosage.",
                    "Check expiry dates before using medicines.",
                    "Tell your doctor about allergies and other medicines you take.",
                    "Keep medicines away from children.",
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      <p className="text-sm leading-6 text-gray-600">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-purple-50 p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Remember
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Medicines that are safe for one person may not be
                      suitable for another. Always consider your age,
                      medical history, allergies and other medicines.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Healthy Lifestyle */}
          {activeTab === "healthy" && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {[
                {
                  icon: HeartPulse,
                  title: "Stay Active",
                  text: "Include regular physical activity in your routine.",
                  bg: "bg-emerald-100",
                  textColor: "text-emerald-600",
                },
                {
                  icon: Syringe,
                  title: "Preventive Care",
                  text: "Keep up with recommended health checkups and vaccinations.",
                  bg: "bg-blue-100",
                  textColor: "text-blue-600",
                },
                {
                  icon: Activity,
                  title: "Manage Stress",
                  text: "Take breaks, sleep well and practice healthy stress management.",
                  bg: "bg-purple-100",
                  textColor: "text-purple-600",
                },
                {
                  icon: ShieldCheck,
                  title: "Healthy Habits",
                  text: "Maintain balanced nutrition, hydration and personal hygiene.",
                  bg: "bg-cyan-100",
                  textColor: "text-cyan-600",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.textColor}`}
                    >
                      <Icon size={24} />
                    </div>

                    <h3 className="font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* ================= FIND MEDICAL HELP ================= */}
        <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-9">

          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">

            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Hospital size={25} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Need a Doctor or Hospital?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                If your symptoms require professional medical attention,
                use our medical help section to find appropriate healthcare
                support.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <a
                  href="/hospitals"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <MapPin size={18} />
                  Find Medical Help
                </a>

                <a
                  href="/assessment"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Activity size={18} />
                  Take Assessment
                </a>

              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-emerald-50">
                <Stethoscope
                  size={70}
                  className="text-emerald-600"
                />
              </div>
            </div>

          </div>

        </section>

        {/* ================= FAQ ================= */}
        <section className="mt-12">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-gray-500">
              Common questions about getting medical help.
            </p>
          </div>

          <div className="space-y-3">

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >

                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >

                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-gray-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />

                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                      <p className="text-sm leading-6 text-gray-500">
                        {faq.answer}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>

        {/* ================= DISCLAIMER ================= */}
        <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Important Disclaimer
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                MediGuideAI provides general health information and
                educational guidance. It is not a replacement for a
                qualified doctor, diagnosis or emergency medical care.
                Always consult a healthcare professional for medical
                decisions.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-12 border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 text-sm text-gray-500 md:flex-row">

          <div>
            © 2026{" "}
            <span className="font-semibold text-gray-700">
              MediGuide<span className="text-blue-600">AI</span>
            </span>
            . All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a
              href="/dashboard"
              className="transition hover:text-blue-600"
            >
              Dashboard
            </a>

            <a
              href="/assessment"
              className="transition hover:text-blue-600"
            >
              Assessment
            </a>

            <a
              href="/emergency"
              className="transition hover:text-red-600"
            >
              Emergency
            </a>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default MedicalHelp;