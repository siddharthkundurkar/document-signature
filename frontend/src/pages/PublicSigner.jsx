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

  const [documentData,
    setDocumentData] =
    useState(null);

  const [showModal,
    setShowModal] =
    useState(false);

  const [signature,
    setSignature] =
    useState(null);

  const [numPages,
    setNumPages] =
    useState(null);

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
      setSignature(image);
      setShowModal(false);
    };

  const handleComplete =
    async () => {
      try {
        await completeSigning(
          token
        );

        alert(
          "Document signed successfully"
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!documentData) {
    return <div>Loading...</div>;
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
            />
          )
        )}
      </Document>

      {signature && (
        <img
          src={signature}
          alt="signature"
          className="w-48 mt-4 border"
        />
      )}

      <div className="mt-4 flex gap-3">
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