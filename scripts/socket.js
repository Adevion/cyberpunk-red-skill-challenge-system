import { ChallengeCard } from "./challenge/challenge-card.js";

let skillChallengeSocket;

export function registerSocket() {
  if (!globalThis.socketlib) {
    console.error("CPR Skill Challenge | socketlib missing");
    return;
  }

  skillChallengeSocket = socketlib.registerModule( "cyberpunk-red-skill-challenge-system" );
  skillChallengeSocket.register( "receiveChallenge", receiveChallenge );
}

async function receiveChallenge(challengeData) {
  await ChallengeCard.create( challengeData );
}

export function getSocket() {
  return skillChallengeSocket;
}