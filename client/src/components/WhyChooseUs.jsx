import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Privacy Focused",
    description:
      "Your health information should be handled responsibly with privacy and security in mind.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "Answer a few easy questions and get understandable health guidance without complicated forms.",
  },
  {
    icon: HeartHandshake,
    title: "Emergency Support",
    description:
      "Potentially serious symptoms can trigger guidance to seek professional medical attention.",
  },
  {
    icon: Smartphone,
    title: "Accessible Anywhere",
    description:
      "Use MediGuide AI from your desktop, tablet, or mobile device whenever you need it.",
  },
];

function WhyChooseUs() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-white px-6 py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Why MediGuide AI
          </p>

          <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Designed to make
            <span className="text-blue-600"> health guidance</span>
            easier.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            MediGuide AI brings symptom assessment, general health
            guidance, and emergency support together in one simple
            experience.
          </p>

          {/* Trust List */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-emerald-500"
                size={21}
              />
              <span className="font-medium text-gray-700">
                Easy step-by-step assessment
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-emerald-500"
                size={21}
              />
              <span className="font-medium text-gray-700">
                Clear and understandable results
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-emerald-500"
                size={21}
              />
              <span className="font-medium text-gray-700">
                Quick access to nearby medical help
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Benefits */}
        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-gray-200 bg-slate-50 p-6 transition hover:bg-white hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;