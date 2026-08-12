import request from "./api";

const API_URL = "/users";

export async function getUser() {
  return request(API_URL);
}

export async function createUser(user) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function updateUser(data) {
  return request(API_URL, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUser() {
  return request(API_URL, {
    method: "DELETE",
  });
}