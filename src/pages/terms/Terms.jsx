import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="text-gray-600 mb-4">
        By accessing and using ClubSphere, you agree to the following terms and
        conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Responsibilities</h2>
      <p className="text-gray-600 mb-4">
        Users must provide accurate information and use the platform in a lawful
        manner.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Account Termination
      </h2>
      <p className="text-gray-600 mb-4">
        ClubSphere reserves the right to suspend or terminate accounts that
        violate our policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Changes to Terms
      </h2>
      <p className="text-gray-600">
        We may update these terms at any time. Continued use of the platform
        means acceptance of the updated terms.
      </p>
    </div>
  );
};

export default Terms;
