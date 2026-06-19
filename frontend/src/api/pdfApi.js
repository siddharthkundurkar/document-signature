import axios from "axios";

const API =
  axios.create({
    baseURL:
      "https://document-signature-ual4.vercel.app/api/pdf",
  });

export const generateSignedPdf =
  (
    documentId,
    token
  ) => {
    return API.post(
      "/generate",
      { documentId },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };