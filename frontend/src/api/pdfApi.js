import axios from "axios";

const API =
  axios.create({
    baseURL:
      "http://localhost:5000/api/pdf",
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