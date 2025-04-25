import React from "react";

const Step8Terms = ({ data, setData }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800 p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
        <span className="text-yellow-400 mr-2">01.</span>
        Terms & Agreements
      </h3>

      <div className="space-y-4">
        {/* Terms of Service Agreement */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={data.agreedToTerms}
            onChange={(e) =>
              setData({ ...data, agreedToTerms: e.target.checked })
            }
            className="mt-1 h-5 w-5 text-yellow-400 bg-gray-800 border-gray-700 rounded focus:ring-yellow-400 focus:ring-offset-gray-900"
            required
          />
          <label
            htmlFor="terms-checkbox"
            className="ml-3 text-sm text-gray-300"
          >
            I agree to the{" "}
            <a
              href="/terms"
              className="text-yellow-400 hover:underline hover:text-yellow-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            and will adhere to all platform guidelines and community standards.
          </label>
        </div>

        {/* NDA Agreement */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="nda-checkbox"
            checked={data.agreedToNDA}
            onChange={(e) =>
              setData({ ...data, agreedToNDA: e.target.checked })
            }
            className="mt-1 h-5 w-5 text-yellow-400 bg-gray-800 border-gray-700 rounded focus:ring-yellow-400 focus:ring-offset-gray-900"
            required
          />
          <label htmlFor="nda-checkbox" className="ml-3 text-sm text-gray-300">
            I agree to the{" "}
            <a
              href="/nda"
              className="text-yellow-400 hover:underline hover:text-yellow-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Non-Disclosure Agreement (NDA)
            </a>{" "}
            and will maintain confidentiality of all sensitive information.
          </label>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <p className="text-xs text-gray-400">
          By checking these boxes, you acknowledge that you have read,
          understood, and agree to be bound by these agreements. You may review
          them at any time using the links provided above.
        </p>
      </div>
    </div>
  );
};

export default Step8Terms;
