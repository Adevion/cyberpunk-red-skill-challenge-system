export async function postSkillRollCard( actor, selection, result, options = {} ) {
  const { roll = {}, skillData = {}, skillBase = 0, success = false } = result ?? {};

  //
  // Compatible with both:
  // - Live CPRSkillRoll objects
  // - Serialized SocketLib DTOs
  //

  const isSerialized = result.serialized ?? false;
  
  //
  // Socket-safe CPRRoll access
  //

  const resultTotal = roll.resultTotal ?? 0;
  const initialRoll = roll.initialRoll ?? 0;
  const luck = roll.luck ?? 0;
  const faces = Array.isArray(roll.faces) ? roll.faces : [];
  const modifiers = Array.isArray(roll.mods) ? roll.mods : [];
  const wasCritSuccess = typeof roll.wasCritSuccess === "function" ? roll.wasCritSuccess() : (roll.wasCritSuccess ?? false);
  const wasCritFail = typeof roll.wasCritFail === "function" ? roll.wasCritFail() : (roll.wasCritFail ?? false);
  const criticalRoll = roll.criticalRoll ?? 0;
  const totalMods = typeof roll.totalMods === "function" ? roll.totalMods() : (roll.totalMods ?? 0);
  const totalModsDisplay = totalMods >= 0 ? `+${totalMods}` : `${totalMods}`;
  const skillLevel = skillData.level ?? 0;
  const statValue = skillData.stat ?? 0;
  const skillMods = skillData.mods ?? 0;
  const dv = selection.dv ?? 0;
    
  const content =
    await renderTemplate(
      "modules/cyberpunk-red-skill-challenge-system/templates/skill-rollcard.hbs",
      {
        rollTitle: selection.skillLabel ?? "Unknown Skill",
        subTitle: actor?.name ?? "Unknown Actor",
        faces,
        diceClass: "d10",
        resultTotal,
        initialRoll,
        skillLevel,
        statValue,
        skillMods,
        skillBase,
        dv,
        luck,
        modifiers,
        totalMods: totalModsDisplay,
        criticalRoll,
        wasCritSuccess,
        wasCritFail,
        success
      }
    );

  const whisper = options.whisper ?? [];
  const isPrivate = options.private ?? false;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    whisper,
    rollMode: isPrivate ? CONST.DICE_ROLL_MODES.PRIVATE : CONST.DICE_ROLL_MODES.PUBLIC
  });
}