import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureModal = ({
  onSave,
  onClose,
}) => {
  const sigRef = useRef();
const saveSignature = () => {
  if (
    sigRef.current.isEmpty()
  ) {
    alert(
      "Please draw a signature first"
    );
    return;
  }

  const image =
    sigRef.current
      .getCanvas()
      .toDataURL("image/png");

  onSave(image);
};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-[700px]">
        <h2 className="text-xl font-bold mb-4">
          Draw Signature
        </h2>

     <SignatureCanvas
  ref={sigRef}
  penColor="black"
  canvasProps={{
    width: 600,
    height: 250,
    className:
      "border border-gray-300 rounded w-full",
  }}
/>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() =>
              sigRef.current.clear()
            }
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>

          <button
            onClick={
              saveSignature
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={
              onClose
            }
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