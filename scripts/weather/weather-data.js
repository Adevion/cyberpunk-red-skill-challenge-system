// scripts/weather/weather-data.js

export const WEATHER_TABLES = {
  winter: {
    name: "December-February",
    temperatures: [
      "Cold (Around 35°F / 2°C)",
      "Cold (Around 40°F / 4°C)",
      "Cold (Around 40°F / 4°C)",
      "Cool (Around 50°F / 10°C)",
      "Cool (Around 50°F / 10°C)",
      "Cool (Around 60°F / 15°C)"
    ],
    conditions: [
      "Clear",
      "Light Rain/Sleet",
      "Overcast",
      "Overcast",
      "Heavy Rain/Sleet",
      "Strange"
    ]
  },

  spring: {
    name: "March-May",
    temperatures: [
      "Cold (Around 40°F / 4°C)",
      "Cool (Around 50°F / 10°C)",
      "Cool (Around 50°F / 10°C)",
      "Cool (Around 50°F / 10°C)",
      "Warm (Around 60°F / 15°C)",
      "Warm (Around 70°F / 21°C)"
    ],
    conditions: [
      "Clear",
      "Light Rain",
      "Overcast",
      "Light Rain",
      "Heavy Rain",
      "Strange"
    ]
  },

  summer: {
    name: "June-August",
    temperatures: [
      "Warm (Around 60°F / 15°C)",
      "Warm (Around 70°F / 21°C)",
      "Warm (Around 70°F / 21°C)",
      "Hot (Around 80°F / 27°C)",
      "Hot (Around 80°F / 27°C)",
      "Hot (Around 90°F / 32°C)"
    ],
    conditions: [
      "Light Rain",
      "Clear",
      "Overcast",
      "Overcast",
      "Clear",
      "Strange"
    ]
  },

  autumn: {
    name: "September-November",
    temperatures: [
      "Cool (Around 40°F / 4°C)",
      "Warm (Around 60°F / 15°C)",
      "Warm (Around 60°F / 15°C)",
      "Warm (Around 60°F / 15°C)",
      "Warm (Around 70°F / 21°C)",
      "Hot (Around 80°F / 27°C)"
    ],
    conditions: [
      "Light Rain/Sleet",
      "Clear",
      "Overcast",
      "Overcast",
      "Clear",
      "Strange"
    ]
  }
};

export const STRANGE_WEATHER = [
  {
    condition: "Radioactive Windstorm",
    duration: { type: "minutes", multiplier: 10 }
  },
  {
    condition: "Ash Storm",
    duration: { type: "minutes", multiplier: 10 }
  },
  {
    condition: "Flooding",
    duration: { type: "days" }
  },
  {
    condition: "Blood Rain",
    duration: { type: "hours" }
  },
  {
    condition: "Acid Rain",
    duration: { type: "hours" }
  },
  {
    condition: "Deadly Thunderstorm",
    duration: { type: "minutes", multiplier: 10 }
  },
  {
    condition: "Inversion Smog",
    duration: { type: "days" }
  },
  {
    condition: "Temperature Extreme",
    duration: { type: "days" }
  },
  {
    condition: "Dust Storm",
    duration: { type: "minutes", multiplier: 10 }
  },
  {
    condition: "Blackout",
    duration: { type: "days" }
  }
];

export const SEASONAL_DEFAULTS = {
    winter: {
        season: "December-February",
        temperature: "Cool (Around 50°F / 10°C)",
        condition: "Overcast",
        severity: "low",
        source: "seasonal"
    },

    spring: {
        season: "March-May",
        temperature: "Cool (Around 50°F / 10°C)",
        condition: "Overcast",
        severity: "low",
        source: "seasonal"
    },

    summer: {
        season: "June-August",
        temperature: "Warm (Around 70°F / 21°C)",
        condition: "Clear",
        severity: "low",
        source: "seasonal"
    },

    autumn: {
        season: "September-November",
        temperature: "Warm (Around 60°F / 15°C)",
        condition: "Overcast",
        severity: "low",
        source: "seasonal"
    }
};