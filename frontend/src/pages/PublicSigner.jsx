import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import {
  getDocumentByToken,
  completeSigning,
  rejectSigning,
} from "../api/signerApi";

import SignatureModal from "../components/SignatureModal";

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

const PublicSigner = () => {
  const { token } =
    useParams();

  const [
    documentData,
    setDocumentData,
  ] = useState(null);

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    signature,
    setSignature,
  ] = useState(null);

  const [
    numPages,
    setNumPages,
  ] = useState(null);

  const [
    rejectionReason,
    setRejectionReason,
  ] = useState("");

  useEffect(() => {
    loadDocument();
  }, []);

  const loadDocument =
    async () => {
      try {
        const response =
          await getDocumentByToken(
            token
          );

        setDocumentData(
          response.data.document
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSave =
    (image) => {
      console.log(
        "IMAGE GENERATED"
      );

      setSignature(image);

      setShowModal(false);
    };

  const handleComplete =
    async () => {
      try {
        if (!signature) {
          alert(
            "Please draw your signature first"
          );

          return;
        }

        const response =
          await completeSigning(
            token
          );

        console.log(
          response.data
        );

        alert(
          "Document signed successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.error ||
            "Failed to sign document"
        );
      }
    };

  const handleReject =
    async () => {
      try {
        if (
          !rejectionReason
        ) {
          alert(
            "Please enter rejection reason"
          );

          return;
        }

        const response =
          await rejectSigning(
            token,
            rejectionReason
          );

        console.log(
          response.data
        );

        alert(
          "Document rejected successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.error ||
            "Failed to reject document"
        );
      }
    };

  if (!documentData) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Sign Document
      </h1>

      <Document
        file={
          documentData.file_url
        }
        onLoadSuccess={({
          numPages,
        }) =>
          setNumPages(
            numPages
          )
        }
      >
        {Array.from(
          new Array(
            numPages || 0
          ),
          (_, index) => (
            <Page
              key={index}
              pageNumber={
                index + 1
              }
              className="mb-4"
            />
          )
        )}
      </Document>

      {signature && (
        <div className="mt-4">
          <p className="font-semibold">
            Signature Preview
          </p>

          <img
            src={signature}
            alt="signature"
            className="w-48 border mt-2"
          />
        </div>
      )}

      <div className="mt-6">
        <label className="block font-semibold mb-2">
          Rejection Reason
        </label>

        <textarea
          value={
            rejectionReason
          }
          onChange={(e) =>
            setRejectionReason(
              e.target.value
            )
          }
          placeholder="Enter reason if rejecting document"
          className="w-full border rounded p-2"
          rows={4}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Draw Signature
        </button>

        <button
          onClick={
            handleComplete
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Complete Signing
        </button>

        <button
          onClick={
            handleReject
          }
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reject Document
        </button>
      </div>

      {showModal && (
        <SignatureModal
          onSave={
            handleSave
          }
          onClose={() =>
            setShowModal(false)
          }
        />
      )}
    </div>
  );
};

export default PublicSigner;