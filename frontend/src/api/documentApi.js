import axios from "axios";

const API = axios.create({
  baseURL: "https://document-signature-ual4.vercel.app/api/docs",
});

export const uploadDocument = async (
  file,
  token
) => {
  const formData = new FormData();

  formData.append("pdf", file);

  return API.post(
    "/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const getDocuments = (
  token
) => {
  return API.get(
    "/my-documents",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDocumentById = (
  id,
  token
) => {
  return API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};