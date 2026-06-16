import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/signers",
});

export const inviteSigner =
  (
    documentId,
    email,
    token
  ) => {
    return API.post(
      "/invite",
      {
        documentId,
        email,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };