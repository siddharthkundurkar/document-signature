import React from "react";

const SignaturePanel = ({
  addSignature,
}) => {
  return (
    <div className="w-72 bg-white rounded-lg shadow p-5 h-fit">
      <h2 className="text-xl font-bold mb-4">
        Fields
      </h2>

      <div className="space-y-3">
        <button
          onClick={() =>
            addSignature(
              "signature"
            )
          }
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          ✍ Signature
        </button>

        <button
          onClick={() =>
            addSignature("name")
          }
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          👤 Name
        </button>

        <button
          onClick={() =>
            addSignature("date")
          }
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          📅 Date
        </button>

        <button
          onClick={() =>
            addSignature("email")
          }
          className="w-full bg-orange-600 text-white py-2 rounded"
        >
          📧 Email
        </button>
      </div>
    </div>
  );
};

export default SignaturePanel;