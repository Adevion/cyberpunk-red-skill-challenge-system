// Import CPR Core Rolls Function
import * as CPRRolls from "../../../../systems/cyberpunk-red-core/modules/rolls/cpr-rolls.js";

// Import Local Functions
import { SkillResolver } from "./skill-resolver.js";
import { ResultHandler } from "./result-handler.js";

export async function executeSkillRoll( actor, selection ) {
  const resolvedSkill = SkillResolver.resolve( actor, selection.skill );

  if (!resolvedSkill) {
    ui.notifications.warn( `${actor.name} does not have ${selection.skill}.` );
    return null;
  }

  const skillData = actor.system.skills[resolvedSkill];
  const roll = new CPRRolls.CPRSkillRoll( "Skill", skillData.stat, selection.skill, skillData.level );
  const keepRolling = await roll.handleRollDialog( { type: "manual" }, actor );

  if (!keepRolling) {
    return null;
  }

  const currentLuck = Number( actor.system.stats.luck.value ?? 0 );
  const requestedLuck = Number( roll.luck ?? 0 );
  const appliedLuck = Math.min( requestedLuck, currentLuck );

  roll.luck = appliedLuck;

  await roll.roll();

  //
  // Luck Anti-Cheat
  //
  const luckDifference = Math.max( 0, requestedLuck - appliedLuck );

  if (luckDifference > 0) {
    roll.resultTotal -= luckDifference;
    roll.luck = appliedLuck;
  }

  const remainingLuck = Math.max( 0, currentLuck - appliedLuck );

  if (appliedLuck > 0) {
    await actor.update({ "system.stats.luck.value": remainingLuck });
  }

  if (requestedLuck > currentLuck) {
    ui.notifications.warn( `Only ${currentLuck} Luck available.` );
  }

  const result = ResultHandler.evaluate( roll.resultTotal, selection.dv );
  const success = result.success;
  const skillBase = skillData.level + skillData.stat + skillData.mods;

  return { roll, skillData, skillBase, success, resolvedSkill };
}