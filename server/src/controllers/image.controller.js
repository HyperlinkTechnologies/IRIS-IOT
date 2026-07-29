import { uploadProfileImage } from "../services/image.service.js";

export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const {
  userId,
  oldImage,
} = req.body;

    const result = await uploadProfileImage(
  req.file,
  userId,
  oldImage
);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}