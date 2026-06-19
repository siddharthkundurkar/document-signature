import axios from "axios";

const API =
  axios.create({
    baseURL:
      "http://localhost:5000/api/dashboard",
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