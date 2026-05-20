import api from "./axios";

//url con la cual hacemos cada peticion

// GET todas
export const getEspecies = async () => api.get("/especies");

// GET una
export const getEspecie = async (id) => api.get(`/especies/${id}`);

// POST crear
export const createEspecie = async (data) => api.post("/especies", data);

// PUT actualizar
export const updateEspecie = async (id, data) =>
  api.put(`/especies/${id}`, data);

// DELETE  eliminar
export const deleteEspecie = async (id) => api.delete(`/especies/${id}`);
