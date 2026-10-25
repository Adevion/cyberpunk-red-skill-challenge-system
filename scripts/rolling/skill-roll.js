export class SkillRoll {
  static async roll(actor, skillName) {

    console.log(
      `Rolling ${skillName} for ${actor.name}`
    );

    // TODO:
    // CPR skill lookup
    // CPR skill roll
    // Return roll result

    return {
      skill: skillName,
      total: 0
    };
  }
}