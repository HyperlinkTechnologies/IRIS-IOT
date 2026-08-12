import * as sessionRepository from "../repositories/session.repository.js";

export const createSession =
  sessionRepository.createSession;

export const getUserSessions =
  sessionRepository.getUserSessions;

export const updateSessionActivity =
  sessionRepository.updateSessionActivity;

export const deleteSession =
  sessionRepository.deleteSession;

export const deleteAllOtherSessions =
  sessionRepository.deleteAllOtherSessions;