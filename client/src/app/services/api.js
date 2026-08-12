import { fetchAuthSession } from "aws-amplify/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(endpoint, options = {}) {
  let headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const session = await fetchAuthSession();

    const token = session.tokens?.accessToken?.toString();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // User may not be authenticated yet.
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
  ...options,
  headers,
});

const contentType = response.headers.get("content-type");

if (contentType?.includes("application/json")) {
  const data = await response.json();

 if (!response.ok) {

  const error = new Error(data.message || "Request failed");

  error.status = response.status;

  error.code = data.code;

  error.details = data.details;

  error.response = data;

  throw error;

}

  return data;
}

const data = await response.blob();

if (!response.ok) {
  throw new Error("Request failed");
}

return data;
}

export { request };
export default request;