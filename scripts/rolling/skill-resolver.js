export class SkillResolver {
  static resolve(actor, skillKey) {

    // Standard CPR skill
    if (actor.system.skills[skillKey]) {
      return skillKey;
    }

    // Specialized CPR skill
    const specializedSkill = Object.keys(actor.system.skills).find(key => key.startsWith( `${skillKey}(` ) );

    // Future:
    // science(History)
    // science(Chemistry)
    // science(Physics)

    return specializedSkill ?? null;
  }

}