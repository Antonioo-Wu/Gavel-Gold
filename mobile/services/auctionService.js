const API_URL = 'http://localhost:3000/api';

export const getSubastas = async () => {
  // Llama a GET /subastas para listar subastas disponibles
  const response = await fetch(`${API_URL}/subastas`);
  return response.json();
};

export const pujar = async (subastaId, monto, medioPagoId, token) => {
  // Llama a POST /subastas/{id}/pujar para registrar una oferta 
  const response = await fetch(`${API_URL}/subastas/${subastaId}/pujar`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ monto, medioPagoId })
  });
  return response.json();
};