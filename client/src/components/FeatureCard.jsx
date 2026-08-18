import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import API_URL from "../api";
function FeatureCard({ icon: Icon, title, description, iconClass }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-xl"
    >
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${iconClass}`}
      >
        <Icon size={27} />
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          {title}
        </h3>

        <ArrowUpRight
          size={20}
          className="text-gray-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600"
        />
      </div>

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;