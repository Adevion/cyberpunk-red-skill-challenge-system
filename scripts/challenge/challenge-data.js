export class ChallengeData {
  constructor({
    title = "",
    description = "",
    visibility = "open",
    skills = []
  } = {}) {
    this.id = foundry.utils.randomID();

    this.title = title;
    this.description = description;
    this.visibility = visibility;

    this.skills = skills;
  }
}