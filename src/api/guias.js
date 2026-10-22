import api from "./axios";

//url con la cual hacemos cada peticion

// GET todas
export const getGuias = async () => api.get("/guias");

// GET una
export const getGuia = async (id) => api.get(`/guias/${id}`);

// POST crear
export const createGuia = async (data) => api.post("/guias", data);

// PUT actualizar
export const updateGuia = async (id, data) =>
  api.put(`/guias/${id}`, data);

// DELETE  eliminar
export const deleteGuia = async (id) => api.delete(`/guias/${id}`);
