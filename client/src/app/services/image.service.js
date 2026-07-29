const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function uploadProfileImage(userId, file, oldImage) {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("oldImage", oldImage);
  formData.append("image", file);

  const response = await fetch(
    `${API_BASE_URL}/images/upload-profile-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}