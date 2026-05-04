const API_URL = 'http://localhost:3000/api';

export const login = async (email, password) => {
  // Llama a POST /auth/login para autenticación 
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};