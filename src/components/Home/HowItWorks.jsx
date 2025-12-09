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
      desc: "Invite friends, attract new members, and build a thriving club!",
    },
  ];

  return (
    <section className="py-20  text-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          How ClubSphere Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-5xl font-extrabold text-blue-500 mb-4">
                {step.number}
              </h3>
              <h4 className="text-xl text-black font-semibold mb-2">{step.title}</h4>
              <p className="text-black">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
