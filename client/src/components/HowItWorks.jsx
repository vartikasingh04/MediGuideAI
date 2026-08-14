import {
  ClipboardList,
  BrainCircuit,
  Lightbulb,
  MapPinned,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Answer Questions",
    description:
      "Tell us about your symptoms by answering a few simple health questions.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Smart Analysis",
    description:
      "Our analysis engine reviews your answers and identifies possible health conditions.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Get Guidance",
    description:
      "View possible conditions, risk level, and general precautions based on your answers.",
  },
  {
    number: "04",
    icon: MapPinned,
    title: "Find Medical Help",
    description:
      "If you need professional care, find nearby hospitals and healthcare facilities.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-50 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            How It Works
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Healthcare guidance in
            <span className="text-blue-600"> four simple steps.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            From symptoms to guidance, MediGuide AI keeps the
            process simple and easy to understand.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Connecting line */}
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-blue-200 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="relative text-center"
              >

                {/* Icon */}
                <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-slate-50 bg-white shadow-lg">

                  <Icon
                    size={30}
                    className="text-blue-600"
                  />

                </div>

                {/* Number */}
                <span className="mt-5 block text-sm font-bold text-blue-600">
                  STEP {step.number}
                </span>

                {/* Title */}
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-xs leading-7 text-gray-600">
                  {step.description}
                </p>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <ArrowRight
                    className="absolute right-[-24px] top-10 hidden text-blue-300 lg:block"
                    size={20}
                  />
                )}

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;