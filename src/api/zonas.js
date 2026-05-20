import api from "./axios";

//url con la cual hacemos cada peticion

// GET todas
export const getZonas = async () => api.get("/zonas");

// GET una
export const getZona = async (id) => api.get(`/zonas/${id}`);

// POST crear
export const createZona = async (data) => api.post("/zonas", data);

// PUT actualizar
export const updateZona = async (id, data) => api.put(`/zonas/${id}`, data);

// DELETE  eliminar
export const deleteZona = async (id) => api.delete(`/zonas/${id}`);
