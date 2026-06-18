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
  export const getDocumentByToken = (
  token
) => {
  return API.get(`/${token}`);
};

export const completeSigning = (
  token
) => {
  return API.post(
    `/${token}/complete`
  );
};