import axios from "axios";

const API = axios.create({
  baseURL:
    "https://document-signature-ual4.vercel.app/api/profile",
});

export const getProfileFields =
  (token) => {
    return API.get(
      "/profile-fields",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  };