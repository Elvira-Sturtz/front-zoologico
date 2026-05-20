import api from "./axios";

export const loginRequest = (user) => api.post("/login", user);
//   axios.post("http://localhost:4000/api/login", data);

export const profileRequest = () => api.get("/profile");

export const logoutRequest = () => api.post("/logout");
