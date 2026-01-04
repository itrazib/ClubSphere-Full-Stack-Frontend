import React from "react";

const Terms = () => {
  return (
    <section className="bg-gray-50 min-h-screen mt-10 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

          <p className="text-gray-600 mb-6">
            By using ClubSphere, you agree to comply with the following terms
            and conditions. Please read them carefully.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                User Responsibilities
              </h2>
              <p className="text-gray-600">
                Users are responsible for maintaining account security and
                providing accurate information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Account Suspension
              </h2>
              <p className="text-gray-600">
                ClubSphere may suspend or terminate accounts that violate
                platform rules or misuse services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Policy Updates
              </h2>
              <p className="text-gray-600">
                These terms may be updated periodically. Continued use of the
                platform indicates acceptance of revised terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
