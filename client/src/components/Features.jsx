import {
  BrainCircuit,
  MapPin,
  Siren,
  History,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Analysis",
    description:
      "Answer simple health questions and receive possible health conditions based on your reported symptoms.",
    iconClass: "bg-blue-100 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Nearby Hospitals",
    description:
      "Find nearby hospitals and healthcare facilities using your current location.",
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Siren,
    title: "Emergency Support",
    description:
      "Identify potentially serious symptoms and quickly access nearby emergency medical help.",
    iconClass: "bg-red-100 text-red-600",
  },
  {
    icon: History,
    title: "Health History",
    description:
      "Keep track of your previous assessments and review your health information anytime.",
    iconClass: "bg-purple-100 text-purple-600",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Powerful Features
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Healthcare made
            <span className="text-blue-600"> simpler.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Everything you need to understand your symptoms,
            manage your health information, and find help when
            you need it.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconClass={feature.iconClass}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;