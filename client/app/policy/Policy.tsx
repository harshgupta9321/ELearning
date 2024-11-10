import React from "react";
import { styles } from "../Style/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className=" dark:text-white text-black">
      <div className="w-[95%] 800px:w-[92%] m-auto py-2 px-3">
      <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use <strong>ELearning</strong>.
        </p>
      </section>

      <section className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6">Introduction</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          At <strong>ELearning</strong>, we are committed to safeguarding your personal information. This Privacy Policy outlines our practices regarding data collection, usage, and protection. By using our platform, you agree to the collection and use of your data in accordance with this policy.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Information We Collect</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We collect information to provide you with the best possible service and experience. Here’s what we may collect:
          </p>
          <ul className="list-inside list-disc text-lg text-gray-600 dark:text-gray-300">
            <li><strong>Personal Information:</strong> Name, email, and other details when you sign up or use our services.</li>
            <li><strong>Usage Data:</strong> Information on how you interact with our platform, including pages visited and time spent.</li>
            <li><strong>Device Information:</strong> Your device’s operating system, browser type, and IP address.</li>
            <li><strong>Payment Information:</strong> Payment details for transactions, securely processed by third-party services.</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">How We Use Your Information</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Your data helps us provide a seamless and personalized experience. We use your information in the following ways:
          </p>
          <ul className="list-inside list-disc text-lg text-gray-600 dark:text-gray-300">
            <li><strong>Improvement of Services:</strong> We analyze usage data to enhance features and performance.</li>
            <li><strong>Payment Processing:</strong> Your payment information is used solely for processing transactions.</li>
            <li><strong>Communication:</strong> We use your contact details to send updates, support messages, and account-related notifications.</li>
            <li><strong>Marketing:</strong> We may send promotional messages, but you can opt-out at any time.</li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-700 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6">Data Protection</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          We take extensive measures to protect your data. This includes using encryption, firewalls, and secure servers to prevent unauthorized access and breaches. However, no method of data transmission is 100% secure, and we cannot guarantee complete security.
        </p>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
  <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6">Your Rights</h2>
  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
    You have the right to control your personal information. Below are the key rights you have over your data:
  </p>
  <div className="grid md:grid-cols-2 gap-8">
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
          <span className="font-semibold">1</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Access</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            You can request to view the data we have on you at any time.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center">
          <span className="font-semibold">2</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Correction</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            You can request updates or corrections to your personal information if it is incorrect or incomplete.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
          <span className="font-semibold">3</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deletion</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            You can request the deletion of your data at any time, subject to legal requirements.
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
          <span className="font-semibold">4</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Restriction</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            You can request to limit the processing of your data under certain circumstances.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center">
          <span className="font-semibold">5</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Data Portability</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            You have the right to receive your personal data in a structured, commonly used format for transfer to another service.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center">
          <span className="font-semibold">6</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Withdraw Consent</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            If you've given us consent for processing your data, you can withdraw it at any time.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Changes to Privacy Policy</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and we encourage you to review it periodically.
        </p>
      </section>
    </div>
      </div>
    </div>
  );
};

export default Policy;
