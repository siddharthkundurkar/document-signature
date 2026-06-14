import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Document, Page, pdfjs } from "react-pdf";

import {
  getDocumentById,
} from "../api/documentApi";

import {
  saveSignature,
} from "../api/signatureApi";

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

  const [position, setPosition] =
    useState(null);

  useEffect(() => {
    fetchDocument();
  }, []);

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

  const handleClick = async (e) => {
    try {
      const rect =
        e.currentTarget.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      setPosition({ x, y });

      const token =
        localStorage.getItem("token");

      await saveSignature(
        id,
        x,
        y,
        1,
        token
      );

      console.log(
        "Signature Position Saved"
      );
    } catch (error) {
      console.log(error);
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Document Viewer
      </h1>

      <p className="mb-6 text-gray-600">
        {documentData.file_name}
      </p>

      <div
        onClick={handleClick}
        className="relative bg-white p-4 rounded shadow"
      >
        <Document
          file={documentData.file_url}
          onLoadSuccess={
            onDocumentLoadSuccess
          }
        >
          {Array.from(
            new Array(numPages || 0),
            (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
              />
            )
          )}
        </Document>

        {position && (
          <div
            className="absolute bg-blue-600 text-white px-3 py-1 rounded shadow"
            style={{
              left: position.x,
              top: position.y,
              transform:
                "translate(-50%, -50%)",
            }}
          >
            Sign Here
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;