import { apiRequest, clearToken, setToken } from "./api";

export async function registerUser({ username, password }) {
  return apiRequest("/api/users/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

export async function loginUser({ username, password }) {
  const result = await apiRequest("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (result?.access_token) {
    setToken(result.access_token);
  }

  return result;
}

export async function getCurrentUser() {
  return apiRequest("/api/users/me", { method: "GET" });
}

export function logoutUser() {
  clearToken();
}
