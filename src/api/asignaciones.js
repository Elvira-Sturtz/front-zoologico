import api from "./axios";




// Relación Cuidador - Especie
// Crear asignación
export const crearAsignacionCuidador = (data) => api.post("/asignaciones-cuidadores", data);

// Listar asignaciones
export const getAsignacionesCuidador = () => api.get("/asignaciones-cuidadores");

// Eliminar asignación
export const deleteAsignacionCuidador = (id) => api.delete(`/asignaciones-cuidadores/${id}`);



// Relación Guía - Itinerario
// Crear asignación
export const crearAsignacionGuia = (data) => api.post("/asignaciones-guias", data);

// Listar asignaciones
export const getAsignacionesGuia = () => api.get("/asignaciones-guias");

// Eliminar asignación
export const deleteAsignacionGuia = (id) => api.delete(`/asignaciones-guias/${id}`);



// especies del cuidador logueado
export const getMisEspecies = (id) => api.get(`/asignaciones/cuidador/${id}`);

// especies del guia logueado
export const getMisItinerarios = (id) => api.get(`/asignaciones/guia/${id}`);
