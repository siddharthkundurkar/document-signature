import axios from "axios";

const API =
  axios.create({
    baseURL:
      "https://document-signature-ual4.vercel.app/api/dashboard",
  });

export const getStats =
  (token) => {
    return API.get(
      "/stats",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };