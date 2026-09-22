import api from "./axios";

// Obtener todas las asignaciones Guía-Itinerario
export const getGuiasItinerarios = () => api.get("/guia-itinerarios");

// Crear una asignación Guía-Itinerario
export const crearGuiaItinerario = (data) =>
  api.post("/guia-itinerarios", data);

// Obtener mis itinerarios como guía
export const getMisItinerarios = () =>
  api.get("/guia-itinerarios/mis-itinerarios");

// Obtener una asignación por ID
export const getGuiaItinerarioById = (id) => api.get(`/guia-itinerarios/${id}`);

// Eliminar una asignación
export const deleteGuiaItinerario = (id) =>
  api.delete(`/guia-itinerarios/${id}`);

// Actualizar una asignación
export const updateGuiaItinerario = (id, data) =>
  api.put(`/guia-itinerarios/${id}`, data);
