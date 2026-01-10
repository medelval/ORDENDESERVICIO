import axios from 'axios';

export const API_URL = 'http://localhost:3001';

// 🔹 Aquí defines la instancia de Axios con tu baseURL
export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const obtenerDatosModulo = async (id) => {
  try {
    const res = await api.get(`/modulo/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener datos del módulo ${id}:`, error);
    throw new Error('No se pudieron cargar los datos del módulo.');
  }
};

export const enviarFormulario = async (datos) => {
  try {
    const res = await api.post('/modulo', datos);
    return res.data;
  } catch (error) {
    console.error(`Error al enviar formulario del módulo:`, error);
    throw new Error('No se pudo enviar el formulario.');
  }
};

