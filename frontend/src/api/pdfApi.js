import axios from "axios";

const API =
  axios.create({
    baseURL:
      "http://localhost:5000/api/pdf",
  });

export const generatePdf =
  (
    documentId,
    token
  ) => {
    return API.post(
      "/generate",
      {
        documentId,
      },
      {
        responseType:
          "blob",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };