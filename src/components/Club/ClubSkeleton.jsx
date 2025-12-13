import { motion } from "framer-motion";

export default function ClubSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-md border overflow-hidden"
    >
      {/* Image Skeleton */}
      <div className="h-44 w-full bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />

        <div className="flex justify-between items-center pt-4">
          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
