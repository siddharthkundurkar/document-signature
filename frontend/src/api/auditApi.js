import axios from "axios";

const API =
  axios.create({
    baseURL:
      "http://localhost:5000/api/audit",
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