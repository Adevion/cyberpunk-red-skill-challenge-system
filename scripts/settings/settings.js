export function registerSettings() {
  game.settings.register(
    "cyberpunk-red-skill-challenge-system",
    "debug",
    {
      name: "Debug Mode",
      hint: "Enable console logging.",
      scope: "world",
      config: true,
      type: Boolean,
      default: false
    }
  );

  game.settings.register(
    "cyberpunk-red-skill-challenge-system",
    "showDV",
    {
      name: "Show DV to Players",
      hint: "Display DV values on challenge cards.",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    }
  );

  game.settings.register(
    "cyberpunk-red-skill-challenge-system",
    "templates",
    {
      scope: "world",
      config: false,
      type: Object,
      default: {}
    }
  );
}