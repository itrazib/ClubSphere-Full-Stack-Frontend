import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-50 min-h-screen mt-10 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <p className="text-gray-600 mb-6">
            ClubSphere values your privacy and is committed to protecting your
            personal data. This policy explains how we collect, use, and
            safeguard your information.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Information We Collect
              </h2>
              <p className="text-gray-600">
                We collect personal information such as name, email address,
                and account details when you register or interact with our
                platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Use of Information
              </h2>
              <p className="text-gray-600">
                Your data helps us provide better services, enhance platform
                functionality, and communicate important updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Data Protection
              </h2>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect
                your information from unauthorized access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
