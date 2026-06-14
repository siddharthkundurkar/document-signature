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
  async (
    documentId,
    x,
    y,
    page,
    token
  ) => {
    return API.post(
      "/save",
      {
        documentId,
        x,
        y,
        page,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };