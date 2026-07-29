import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

export async function getUser(userId) {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
}

export async function createUser(user) {
  const response = await axios.post(API_URL, user);
  return response.data;
}

export async function updateUser(userId, data) {
  const response = await axios.put(`${API_URL}/${userId}`, data);
  return response.data;
}

export async function deleteUser(userId) {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
}