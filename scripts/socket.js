import { ChallengeCard } from "./challenge/challenge-card.js";
import { postSkillRollCard } from "./rolling/skill-rollcard.js";

let skillChallengeSocket;

export function registerSocket() {
  if (!globalThis.socketlib) {
    console.error( "CPR Skill Challenge | socketlib missing" );
    return;
  }

  skillChallengeSocket = socketlib.registerModule( "cyberpunk-red-skill-challenge-system" );
  skillChallengeSocket.register( "receiveChallenge", receiveChallenge );
  skillChallengeSocket.register( "receiveSecretResult", receiveSecretResult );
}

async function receiveChallenge( challengeData ) {
  await ChallengeCard.create( challengeData );
}

async function receiveSecretResult( actorId, selection, result, gmIds ) {
  const actor = game.actors.get(actorId);
  if (!actor) {
    console.warn( `Actor ${actorId} not found` );
    return;
  }

  await postSkillRollCard( actor, selection, result, { 
    whisper: gmIds,
    private: true
  });
}

export function getSocket() {
  return skillChallengeSocket;
}