const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function sendLoginAlert(data) {
  const response = await fetch(`${API}/email/login-alert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send login alert");
  }

  return response.json();
}