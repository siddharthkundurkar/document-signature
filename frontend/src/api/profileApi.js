import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/profile",
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