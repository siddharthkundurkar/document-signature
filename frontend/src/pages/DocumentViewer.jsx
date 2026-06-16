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
  DndContext,
} from "@dnd-kit/core";

import {
  getDocumentById,
  
} from "../api/documentApi";
import { inviteSigner } from "../api/signerApi";
import  { saveSignature } from "../api/signatureApi";
import SignaturePanel from "../components/SignaturePanel";
import DraggableField from "../components/DraggableField";
import SignatureModal from "../components/SignatureModal";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

const DocumentViewer = () => {
  const { id } = useParams();

  const [documentData, setDocumentData] =
    useState(null);

  const [numPages, setNumPages] =
    useState(null);

  const [signatures, setSignatures] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);
  const [email, setEmail] =
  useState("");
  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await getDocumentById(
          id,
          token
        );

      setDocumentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDocumentLoadSuccess = ({
    numPages,
  }) => {
    setNumPages(numPages);
  };

  const addSignature = (
    type
  ) => {
    if (type === "signature") {
      setShowModal(true);
      return;
    }

    setSignatures((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type,
        x: 100,
        y: 100,
      },
    ]);
  };

  const handleSignatureSave = (image) => {
  console.log("SIGNATURE RECEIVED");
  console.log(image);

  setShowModal(false);

  setSignatures((prev) => [
    ...prev,
    {
      id: Date.now().toString(),
      type: "signature",
      image,
      x: 100,
      y: 100,
    },
  ]);
};
useEffect(() => {
  console.log("SIGNATURES STATE");
  console.log(signatures);
}, [signatures]);
  const handleDragEnd = (
    event
  ) => {
    const { active, delta } =
      event;

    setSignatures((prev) =>
      prev.map((sig) => {
        if (
          sig.id === active.id
        ) {
          return {
            ...sig,
            x:
              sig.x +
              delta.x,
            y:
              sig.y +
              delta.y,
          };
        }

        return sig;
      })
    );
  };

  const getLabel = (
    type
  ) => {
    switch (type) {
      case "signature":
        return "✍ Signature";

      case "name":
        return "👤 Name";

      case "date":
        return "📅 Date";

      case "email":
        return "📧 Email";

      default:
        return "Field";
    }
  };
  const handleInviteSigner =
  async (email) => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await inviteSigner(
          id,
          email,
          token
        );

      console.log(response.data);

      alert(
        "Signer invited successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to invite signer"
      );
    }
  };
const handleFinalizePdf = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("SIGNATURES:", signatures);

    for (const sig of signatures) {
      const response = await saveSignature(
        id,
        sig.x,
        sig.y,
        1,
        token,
        sig.type,
        sig.image || null
      );

      console.log("SAVE RESPONSE:", response.data);
    }

    alert("All signatures saved successfully");
  } catch (error) {
    console.error("SAVE ERROR:", error);

    console.log(
      "Backend Error:",
      error.response?.data
    );

    alert(
      error.response?.data?.error ||
      error.message ||
      "Failed to save signatures"
    );
  }
};
  if (!documentData) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Document Viewer
      </h1>

      <div className="flex gap-6">
        {/* PDF Viewer */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 relative overflow-auto">
          <Document
            file={
              documentData.file_url
            }
            onLoadSuccess={
              onDocumentLoadSuccess
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

          <DndContext
            onDragEnd={
              handleDragEnd
            }
          >
            {signatures.map(
              (
                signature
              ) => (
                <DraggableField
                  key={
                    signature.id
                  }
                  id={
                    signature.id
                  }
                  label={getLabel(
                    signature.type
                  )}
                  image={
                    signature.image
                  }
                  x={
                    signature.x
                  }
                  y={
                    signature.y
                  }
                />
              )
            )}
          </DndContext>

          <div className="mt-6">
            <button
  onClick={() => {
    alert("Button Clicked");
    handleFinalizePdf();
  }}
  className="bg-green-600 text-white px-5 py-2 rounded-lg"
>
  Finalize PDF
</button>
          </div>
        </div>

        {/* Right Side Panel */}
    <SignaturePanel
  addSignature={addSignature}
  inviteSigner={handleInviteSigner}
/>
      </div>

      {/* Signature Modal */}
      {showModal && (
        <SignatureModal
          onSave={
            handleSignatureSave
          }
          onClose={() =>
            setShowModal(false)
          }
        />
      )}
    </div>
  );
};

export default DocumentViewer;