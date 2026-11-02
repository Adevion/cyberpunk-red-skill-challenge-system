import { MODULE_ID, SETTINGS } from "../constants/constants.js";

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

  game.settings.register(
    "cyberpunk-red-skill-challenge-system",
    "themeColor",
    {
      name: "Theme Colour",
      hint: "Select the accent colour used by the Skill Challenge UI.",
      scope: "client",
      config: true,
      type: String,
      choices: {
        red: "Red",
        cyan: "Cyan",
        green: "Green",
        purple: "Purple"
      },
      default: "red",
      onChange: () => { applyTheme(); }
    }
  );

  game.settings.register(
      MODULE_ID,
      SETTINGS.ENABLE_RANDOM_WEATHER,
      {
          name: "Add Random Weather Option",
          hint: "Adds a Random Season entry to the Weather dialog.",
          scope: "world",
          config: true,
          type: Boolean,
          default: false
      }
  );

  game.settings.register(
    MODULE_ID,
    "currentWeather",
    {
        name: "Current Weather",
        scope: "world",
        config: false,
        type: Object,
        default: null
    }
  );
}

export function applyTheme() {
  const theme = game.settings.get( MODULE_ID, "themeColor" );

  const colours = { red: "#961f1f", cyan: "#396f79", green: "#456b2a", purple: "#74607d" };
  const colours_dark = { red: "#601010", cyan: "#274b52", green: "#334d1f", purple: "#584760" };
  const scrollbar_track = { red: "#5d142b", cyan: "#1f3f45", green: "#2d431c", purple: "#4d4053" };

  document.documentElement.style.setProperty( "--skill-challenge-accent", colours[theme] );
  document.documentElement.style.setProperty( "--skill-challenge-accent-dark", colours_dark[theme] );
  document.documentElement.style.setProperty( "--skill-challenge-scrollbar", scrollbar_track[theme] );
}