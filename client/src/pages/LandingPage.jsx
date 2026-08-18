import { ArrowRight, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import API_URL from "../api";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden pt-32 pb-20"
      >
        {/* Background decoration */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Sparkles size={16} />
              Smart Health Assistance
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Understand your
              <span className="text-blue-600"> symptoms.</span>
              <br />
              Take better care of your health.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              MediGuide AI helps you understand your symptoms,
              discover possible health conditions, follow basic
              precautions, and find nearby medical help when needed.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Start Assessment

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100">
                Learn More
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle size={17} className="text-emerald-500" />
                Easy to use
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-500" />
                Privacy focused
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="mx-auto flex aspect-square max-w-lg items-center justify-center rounded-[3rem] bg-gradient-to-br from-blue-600 to-cyan-500 p-8 shadow-2xl shadow-blue-600/20">

              <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] bg-white/15 backdrop-blur-sm">

                <div className="text-center text-white">
                  <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-xl">
                    <span className="text-6xl">🩺</span>
                  </div>

                  <h2 className="text-2xl font-bold">
                    Your Health Companion
                  </h2>

                  <p className="mt-2 text-sm text-blue-50">
                    Smart guidance when you need it.
                  </p>
                </div>

              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="text-emerald-600" size={21} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Health Check
                  </p>
                  <p className="text-xs text-slate-500">
                    Simple & guided
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-y border-amber-100 bg-amber-50">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-amber-800">
          <strong>Important:</strong> MediGuide AI provides general health
          information and is not a substitute for professional medical advice.
        </div>
      </section>
<Features />
<HowItWorks />
<WhyChooseUs />
<CTASection />
<Footer />

    </div>
  );
}

export default LandingPage;