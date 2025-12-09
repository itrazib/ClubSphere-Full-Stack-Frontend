export default function PopularCategories() {
  const categories = [
    "Technology",
    "Photography",
    "Music & Band",
    "Sports",
    "Robotics",
    "Drama & Arts",
    "Debate Club",
    "Programming",
  ];

  return (
    <section className="py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl text-gradient font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="b shadow-xl text-black p-4 rounded-xl text-center bg-white transition"
            >
              <p className="text-lg font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
