import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

// GET Profile
export async function getProfile(req, res) {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
}

// CREATE Profile
export async function createProfile(req, res) {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create profile",
    });
  }
}

// UPDATE Profile
export async function updateProfile(req, res) {
  try {
    const { userId } = req.params;

    await updateUser(userId, req.body);

    res.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
}

// DELETE Profile
export async function deleteProfile(req, res) {
  try {
    const { userId } = req.params;

    await deleteUser(userId);

    res.json({
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete profile",
    });
  }
}