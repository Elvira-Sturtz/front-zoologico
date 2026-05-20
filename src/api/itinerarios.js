import api from "./axios";

//url con la cual hacemos cada peticion

// GET todas
export const getItinerarios = async () => api.get("/itinerarios");

// GET una
export const getItinerario = async (id) => api.get(`/itinerarios/${id}`);

// POST crear
export const createItinerario = async (data) => api.post("/itinerarios", data);

// PUT actualizar
export const updateItinerario = async (id, data) =>
  api.put(`/itinerarios/${id}`, data);

// DELETE  eliminar
export const deleteItinerario = async (id) => api.delete(`/itinerarios/${id}`);
