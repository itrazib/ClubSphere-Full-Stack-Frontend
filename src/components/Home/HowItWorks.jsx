import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      desc: "Sign up using your email and set up your ClubSphere profile to get started.",
    },
    {
      number: "02",
      title: "Join or Create a Club",
      desc: "Browse existing clubs or start your own community within seconds.",
    },
    {
      number: "03",
      title: "Engage With Members",
      desc: "Share posts, events, and updates to interact with your club members.",
    },
    {
      number: "04",
      title: "Grow Your Community",
      desc: "Invite friends, attract new members, and build a thriving club.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 -z-10  blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ===== Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            How ClubSphere Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and build meaningful communities effortlessly.
          </p>
        </motion.div>

        {/* ===== Steps ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="
                relative group
                rounded-3xl p-6
                bg-white/80 backdrop-blur-xl
                border border-white/40
                shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]
                transition-all
              "
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 opacity-30 blur-xl rounded-3xl" />
              </div>

              {/* Step Number */}
              <div className="relative z-10 mb-6">
                <span
                  className="
                    inline-flex items-center justify-center
                    w-14 h-14 rounded-2xl
                    text-xl font-extrabold
                    bg-gradient-to-br from-indigo-600 to-purple-600
                    text-white shadow-lg
                  "
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
