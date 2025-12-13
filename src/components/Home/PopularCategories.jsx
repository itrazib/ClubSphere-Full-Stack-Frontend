import { motion } from "framer-motion";
import {
  Cpu,
  Camera,
  Music,
  Trophy,
  Bot,
  Palette,
  MessageSquare,
  Code2,
} from "lucide-react";

export default function PopularCategories() {
  const categories = [
    { name: "Technology", icon: Cpu },
    { name: "Photography", icon: Camera },
    { name: "Music & Band", icon: Music },
    { name: "Sports", icon: Trophy },
    { name: "Robotics", icon: Bot },
    { name: "Drama & Arts", icon: Palette },
    { name: "Debate Club", icon: MessageSquare },
    { name: "Programming", icon: Code2 },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ===== Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Popular Categories
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover the most popular club categories and find where you belong.
          </p>
        </motion.div>

        {/* ===== Categories Grid ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="
                  relative group cursor-pointer
                  rounded-3xl p-6
                  bg-white/80 backdrop-blur-xl
                  border border-white/40
                  shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]
                  transition-all
                "
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 opacity-30 blur-xl rounded-3xl" />
                </div>

                {/* Icon */}
                <div
                  className="
                    relative z-10 mb-4
                    w-14 h-14 mx-auto rounded-2xl
                    flex items-center justify-center
                    bg-gradient-to-br from-indigo-600 to-purple-600
                    text-white shadow-lg
                  "
                >
                  <Icon size={26} />
                </div>

                {/* Text */}
                <p className="relative z-10 text-center text-lg font-semibold text-gray-900">
                  {cat.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
