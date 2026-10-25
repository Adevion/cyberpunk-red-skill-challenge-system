import { getSocket } from "../socket.js";

export class ChallengeManager {
  static async send(challengeData) {
    const socket = getSocket();

    if (!socket) return;

    await socket.executeForEveryone(
      "receiveChallenge",
      challengeData
    );
  }
}