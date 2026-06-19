import axios from "axios";

const API =
  axios.create({
    baseURL:
      "https://document-signature-ual4.vercel.app/api/audit",
  });

export const getAuditHistory =
  (
    documentId,
    token
  ) => {
    return API.get(
      `/${documentId}/history`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };