import api from "./axios";

// Obtener todas las asignaciones Cuidador-Especie
export const getCuidadoresEspecies = () => api.get("/cuidador-especies");

// Crear una asignación Cuidador-Especie
export const crearCuidadorEspecie = (data) =>
  api.post("/cuidador-especies", data);

// Obtener mis especies como cuidador
export const getMisEspecies = () => api.get("/cuidador-especies/mis-especies");

// Obtener una asignación por ID
export const getCuidadorEspecieById = (id) =>
  api.get(`/cuidador-especies/${id}`);

// Eliminar una asignación
export const deleteCuidadorEspecie = (id) =>
  api.delete(`/cuidador-especies/${id}`);

// Actualizar una asignación
export const updateCuidadorEspecie = (id, data) =>
  api.put(`/cuidador-especies/${id}`, data);
