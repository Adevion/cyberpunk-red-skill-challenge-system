export async function postSkillRollCard( actor, selection, result ) {
  const { roll, skillData, skillBase, success } = result;
  const totalModsDisplay = roll.totalMods() >= 0 ? `+${roll.totalMods()}` : `${roll.totalMods()}`;
  const faces = roll.faces ?? [];
  const content =
    await renderTemplate(
      "modules/cyberpunk-red-skill-challenge-system/templates/skill-rollcard.hbs",
      {
        rollTitle: selection.skillLabel,
        subTitle: actor.name,
        faces,
        diceClass: "d10",
        resultTotal: roll.resultTotal,
        initialRoll: roll.initialRoll,
        skillLevel: skillData.level,
        statValue: skillData.stat,
        skillMods: skillData.mods,
        skillBase,
        dv: selection.dv,
        luck: roll.luck,
        modifiers: roll.mods,
        totalMods: totalModsDisplay,
        criticalRoll: roll.criticalRoll,
        wasCritSuccess: roll.wasCritSuccess(),
        wasCritFail: roll.wasCritFail(),
        success
      }
    );

  await ChatMessage.create({
    speaker:
      ChatMessage.getSpeaker({ actor }),
    content
  });

}