export function isAuthenticated() {
  return !!localStorage.getItem("iris_user");
}

export function getUser() {
  const user = localStorage.getItem("iris_user");

  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("iris_user");
}