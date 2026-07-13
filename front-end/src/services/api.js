const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const TOKEN_KEY = "loanpilot_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }


  let response;

try {
  response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
} catch {
  //  network error (server down, no internet, etc.)
  throw new Error("Network error. Please try again.");
}

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }



  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
      window.location.href = "/auth";
      throw new Error("Session expired. Please login again.");
    }
    const message = data?.detail || data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

export { API_BASE_URL };


