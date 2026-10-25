export class ChallengeCard {
  static async create(challengeData) {
  const skillsHtml =
    challengeData.skills.map(skill => `
      <button type="button" class="skill-challenge-button" data-skill="${skill.key}" data-dv="${skill.dv}" data-challenge="${challengeData.id}">
        ${skill.label}
        <span class="skill-dv"> (DV ${skill.dv}) </span>
      </button>
    `)
    .join("");

    const content = `
      <div class="skill-challenge-card" data-challenge-id="${challengeData.id}">
        <div class="challenge-header"> ${challengeData.title} </div>
        ${ challengeData.description ? ` <div class="challenge-description"> ${challengeData.description} </div> ` : "" }
        <hr>
        <div class="challenge-instructions"> Choose a Skill </div>
        <div class="challenge-skills"> ${skillsHtml} </div>
      </div>
    `;

    if (game.user.isGM) {
      await ChatMessage.create({ content });
    }
  }
}