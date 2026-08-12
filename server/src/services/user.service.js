import * as userRepository from "../repositories/user.repository.js";

export const createUser =
  userRepository.createUser;

export const getUserById =
  userRepository.getUserById;

export const updateUser =
  userRepository.updateUser;

export const deleteUser =
  userRepository.deleteUser;