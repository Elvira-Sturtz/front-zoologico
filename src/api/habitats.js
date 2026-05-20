import api from "./axios";

//url con la cual hacemos cada peticion

// GET todas
export const getHabitats = async () => api.get("/habitats");

// GET una
export const getHabitat = async (id) => api.get(`/habitats/${id}`);

// POST crear
export const createHabitat = async (data) => api.post("/habitats", data);

// PUT actualizar
export const updateHabitat = async (id, data) =>
  api.put(`/habitats/${id}`, data);

// DELETE  eliminar
export const deleteHabitat = async (id) => api.delete(`/habitats/${id}`);
