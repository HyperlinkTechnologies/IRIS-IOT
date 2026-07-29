import axios from "axios";

const API = "http://localhost:4000/api";

export async function createSession(data) {
  const response = await axios.post(
    `${API}/sessions`,
    data
  );
   return response.data.session;
}

export async function deleteSession(sessionId) {
  await axios.delete(
    `${API}/sessions/${sessionId}`
  );
}

export async function getUserSessions(userId) {
  const response = await axios.get(
    `${API}/sessions/${userId}`
  );

  return response.data.sessions;
}

export async function deleteOtherSessions(
  userId,
  currentSessionId
) {
  await axios.delete(
    `${API}/sessions/others`,
    {
      data: {
        userId,
        currentSessionId,
      },
    }
  );
}

export async function updateSessionActivity(sessionId) {
  await axios.put(
    `${API}/sessions/${sessionId}/activity`
  );
}
 