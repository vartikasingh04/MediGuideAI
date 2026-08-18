import { ArrowRight, HeartPulse, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import API_URL from "../api";
function CTASection() {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 px-8 py-16 text-center shadow-2xl shadow-blue-600/20 md:px-16"
      >
        {/* Decorative circles */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/10" />

        <div className="relative">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
            <HeartPulse size={32} />
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold text-white md:text-5xl">
            Take the first step toward
            <span className="text-blue-100"> better health awareness.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-50">
            Answer a few simple questions and explore general health
            guidance designed to help you make informed next steps.
          </p>

          <button className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50">
            Start Free Assessment

            <ArrowRight
              size={19}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-100">
            <ShieldCheck size={17} />
            General health information • Not a medical diagnosis
          </div>

        </div>
      </motion.div>
    </section>
  );
}

export default CTASection;