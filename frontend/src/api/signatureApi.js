import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/signatures",
});

export const createSignature =
  (data, token) => {
    return API.post(
      "/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  

export const saveSignature =
  (
    documentId,
    x,
    y,
    page,
    token,
    type,
    signatureImage
  ) => {
    return API.post(
      "/save",
      {
        documentId,
        x,
        y,
        page,
        type,
        signatureImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  export const saveMySignature = (
  signatureImage,
  token
) => {
  return API.post(
    "/save-my-signature",
    {
      signatureImage,
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};
  export const getMySignatures =
  (token) => {
    return API.get(
      "/my-signatures",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };