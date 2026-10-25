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
}