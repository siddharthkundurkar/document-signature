
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureModal = ({
  onSave,
  onClose,
}) => {
  const sigRef = useRef(null);

  const handleSave = () => {
    console.log("SAVE CLICKED");

    if (!sigRef.current) return;

    if (sigRef.current.isEmpty()) {
      alert("Please draw a signature first");
      return;
    }

    const image =
      sigRef.current
        .getCanvas()
        .toDataURL("image/png");

    console.log("IMAGE GENERATED");

    onSave(image);
  };

  const handleClear = () => {
    console.log("CLEAR CLICKED");

    if (sigRef.current) {
      sigRef.current.clear();
    }
  };

  const handleClose = () => {
    console.log("CLOSE CLICKED");
    onClose();
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
            }}
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleClose}
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
