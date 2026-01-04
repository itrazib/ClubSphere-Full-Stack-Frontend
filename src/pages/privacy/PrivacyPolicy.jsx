import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-600 mb-4">
        At ClubSphere, we respect your privacy and are committed to protecting
        your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="text-gray-600 mb-4">
        We may collect your name, email address, and other relevant information
        when you register or use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <p className="text-gray-600 mb-4">
        Your information is used to provide services, improve user experience,
        and communicate important updates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="text-gray-600">
        We take appropriate security measures to protect your data from
        unauthorized access.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
