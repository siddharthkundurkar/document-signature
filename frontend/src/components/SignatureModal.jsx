import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { saveMySignature } from "../api/signatureApi";

const SignatureModal = ({
  onSave,
  onClose,
}) => {
  const sigRef = useRef(null);

  const handleSave = async () => {
    try {
      if (!sigRef.current) return;

      if (sigRef.current.isEmpty()) {
        alert("Please draw a signature first");
        return;
      }

      const image =
        sigRef.current
          .getCanvas()
          .toDataURL("image/png");

      const token =
        localStorage.getItem("token");

      // Save permanently
      await saveMySignature(
        image,
        token
      );

      // Send back to parent
      onSave(image);

      alert(
        "Signature saved successfully"
      );
    } catch (error) {
      console.log(error);
      alert(
        "Failed to save signature"
      );
    }
  };

  const handleClear = () => {
    sigRef.current?.clear();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[700px]">
        <h2 className="text-xl font-bold mb-4">
          Draw Signature
        </h2>

        <div className="border rounded overflow-hidden">
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              width: 600,
              height: 250,
              className:
                "signature-canvas",
            }}
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;