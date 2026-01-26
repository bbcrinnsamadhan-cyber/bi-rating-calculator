import axios from "axios";

// 🔹 Local backend (development)
const LOCAL_API = "http://localhost:5000";

// 🔹 Production backend (Render)
const PROD_API = "https://bi-rating-calculator.onrender.com";

// 🔹 Auto select
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? LOCAL_API
    : PROD_API;

export const submitLead = (data) => {
  return axios.post(`${API_BASE_URL}/api/leads`, data);
};
