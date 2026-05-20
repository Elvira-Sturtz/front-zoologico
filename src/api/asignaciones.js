import api from "./axios";

// Crear asignación
export const crearAsignacion = (data) => api.post("/asignaciones", data);

// Listar asignaciones
export const getAsignaciones = () => api.get("/asignaciones");

// Eliminar asignación
export const deleteAsignacion = (id) => api.delete(`/asignaciones/${id}`);

// especies del cuidador logueado
export const getMisEspecies = (id) => api.get(`/asignaciones/cuidador/${id}`);
