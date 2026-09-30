import api from "./axios";

//url con la cual hacemos cada peticion

// GET todas
export const getCuidadores = async () => api.get("/cuidadores");

// GET una
export const getCuidador = async (id) => api.get(`/cuidadores/${id}`);

// POST crear
export const createCuidador = async (data) => api.post("/cuidadores", data);

// PUT actualizar
export const updateCuidador = async (id, data) =>
  api.put(`/cuidadores/${id}`, data);

// DELETE  eliminar
export const deleteCuidador = async (id) => api.delete(`/cuidadores/${id}`);
