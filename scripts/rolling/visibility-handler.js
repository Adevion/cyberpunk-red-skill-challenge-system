import { getSocket } from "../socket.js";
import { postSkillRollCard } from "./skill-rollcard.js";

export async function handleResultVisibility( actor, selection, result ) {
  //
  // Serialize CPR data before
  // SocketLib transport.
  //

  const socketResult = {
    roll: {
      resultTotal: result.roll.resultTotal,
      initialRoll: result.roll.initialRoll,
      luck: result.roll.luck,
      faces: result.roll.faces ?? [],
      mods: result.roll.mods ?? [],
      criticalRoll: result.roll.criticalRoll ?? 0,
      wasCritSuccess: result.roll.wasCritSuccess(),
      wasCritFail: result.roll.wasCritFail(),
      totalMods: result.roll.totalMods()
    },
    skillData: {
      level: result.skillData.level,
      stat: result.skillData.stat,
      mods: result.skillData.mods
    },
    skillBase: result.skillBase,
    success: result.success,
    serialized: true
  };

  if ( selection.visibility === "secret" ) {
    await ChatMessage.create({
      content: "<div>Challenge Submitted</div>",
      whisper: [ selection.userId ]
    });

    const socket = getSocket();
    const gmIds = game.users.filter(u => u.isGM).map(u => u.id);
    await socket.executeAsGM( "receiveSecretResult", actor.id, selection, socketResult, gmIds );
    return;
    
  }

  await postSkillRollCard( actor, selection, result );
}