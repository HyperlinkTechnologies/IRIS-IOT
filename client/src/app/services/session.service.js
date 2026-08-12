import request from "./api";

const API = "/sessions";

export async function createSession(data) {
  const response = await request(API, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.session;
}

export async function deleteSession(sessionId) {
  await request(`${API}/${sessionId}`, {
    method: "DELETE",
  });
}

export async function getUserSessions() {
  const response = await request("/sessions");
  return response.sessions;
}

export async function deleteOtherSessions(currentSessionId) {
  await request(`${API}/others`, {
    method: "DELETE",
    body: JSON.stringify({
      currentSessionId,
    }),
  });
}

export async function updateSessionActivity(sessionId) {
  await request(`${API}/${sessionId}/activity`, {
    method: "PUT",
  });
}