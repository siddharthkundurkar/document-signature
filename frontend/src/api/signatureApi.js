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