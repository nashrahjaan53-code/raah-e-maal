import { apiRequest } from "./api";

export async function getFinancialProfile(userId) {
  return apiRequest(`/api/financial-profile/?user_id=${userId}`, { method: "GET" });
}

export async function createFinancialProfile(payload) {
  return apiRequest("/api/financial-profile/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateFinancialProfile(userId, payload) {
  return apiRequest(`/api/financial-profile/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function getLoans(userId) {
  return apiRequest(`/api/loans/?user_id=${userId}`, { method: "GET" });
}

export async function createLoan(payload) {
  return apiRequest("/api/loans/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateLoan(loanId, payload) {
  return apiRequest(`/api/loans/${loanId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteLoan(loanId) {
  return apiRequest(`/api/loans/${loanId}`, { method: "DELETE" });
}

export async function getLoanSummary(userId) {
  return apiRequest(`/api/loan-summary/?user_id=${userId}`, { method: "GET" });
}

export async function requestRecommendations(userId) {
  return apiRequest("/api/recommendations/request", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}

export async function runSimulation(userId) {
  return apiRequest("/api/simulation/run", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}
