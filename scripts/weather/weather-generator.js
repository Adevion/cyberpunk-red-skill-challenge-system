import { WEATHER_TABLES, STRANGE_WEATHER } from "./weather-data.js";

export async function generateWeather(season = "auto") {
    let resolvedSeason;

    if (season === "auto") {
        resolvedSeason = getCurrentSeason();
    }
    else if (season === "random") {
        resolvedSeason = getRandomSeason();
    }
    else {
        resolvedSeason = season;
    }

    const table = WEATHER_TABLES[resolvedSeason];

    // Roll temperature
    const tempRoll = await rollDie(6);
    const temperature = table.temperatures[tempRoll - 1];

    // Roll condition
    const conditionRoll = await rollDie(6);
    let condition = table.conditions[conditionRoll - 1];
    //let condition = "Strange"; // Force "Strange" condition for testing

    let strange = false;
    let duration = null;

    if (condition === "Strange") {
        strange = true;

        const strangeRoll = await rollDie(10);
        const strangeResult = STRANGE_WEATHER[strangeRoll - 1];

        condition = strangeResult.condition;
        duration = await resolveDuration( strangeResult.duration );

        // Cold Snap / Heat Wave logic
        if (condition === "Temperature Extreme") {
            condition = isColdTemperature(temperature) ? "Cold Snap" : "Heat Wave";
        }
    }

    return {
        season: table.name,
        temperature,
        condition,
        duration,
        strange,

        icon: getWeatherIcon(condition),
        weatherClass: getWeatherClass(condition),
        effects: getWeatherEffects(condition),
        severity: getWeatherSeverity(condition)
    };
}

async function rollDie(sides) {
    const roll = await new Roll(`1d${sides}`).evaluate();
    return roll.total;
}

export function getCurrentSeason() {
    return getSeasonFromMonth(
        new Date().getMonth() + 1
    );
}

export function getSeasonFromMonth(month) {
    if ([12, 1, 2].includes(month)) {
        return "winter";
    }

    if ([3, 4, 5].includes(month)) {
        return "spring";
    }

    if ([6, 7, 8].includes(month)) {
        return "summer";
    }

    return "autumn";
}

function isColdTemperature(temperature) {
    return ( temperature.includes("Cold") || temperature.includes("Cool") );
}

async function resolveDuration(duration) {
    
    if (!duration) {
        console.error("Invalid duration:", duration);
        return "Unknown";
    }

    const roll = await rollDie(6);

    switch (duration.type) {
        case "minutes": return `${roll * duration.multiplier} Minutes`;
        case "hours": return `${roll} Hour${roll === 1 ? "" : "s"}`;
        case "days": return `${roll} Day${roll === 1 ? "" : "s"}`;
        default: return "Unknown";
    }
}

function getRandomSeason() {
    const seasons = [ "winter", "spring", "summer", "autumn" ];

    return seasons[Math.floor(
        Math.random() * seasons.length
    )];
}

function getWeatherIcon(condition) {
    switch (condition) {
        case "Clear": return "fa-sun";
        case "Overcast": return "fa-cloud";
        case "Light Rain":
        case "Light Rain/Sleet": return "fa-cloud-rain";
        case "Heavy Rain":
        case "Heavy Rain/Sleet": return "fa-cloud-showers-heavy";
        case "Blood Rain": return "fa-droplet";
        case "Acid Rain": return "fa-flask";
        case "Dust Storm":
        case "Ash Storm": return "fa-wind";
        case "Deadly Thunderstorm": return "fa-bolt";
        case "Radioactive Windstorm": return "fa-radiation";
        case "Inversion Smog": return "fa-smog";
        case "Flooding": return "fa-water";
        case "Blackout": return "fa-power-off";
        case "Heat Wave": return "fa-temperature-high";
        case "Cold Snap": return "fa-temperature-low";
        default: return "fa-cloud";
    }
}

function getWeatherClass(condition) {
    switch (condition) {
        case "Blood Rain": return "weather-blood-rain";
        case "Radioactive Windstorm": return "weather-radioactive";
        case "Clear": return "weather-clear";
        default: return "";
    }
}

function getWeatherEffects(condition) {
    switch (condition) {
        case "Light Rain":
        case "Light Rain/Sleet":
            return [
                "Wet and slippery surfaces",
                "GM may apply -1 to relevant checks"
            ];

        case "Heavy Rain":
        case "Heavy Rain/Sleet":
            return [
                "Reduced visibility",
                "GM may apply -2 to relevant checks"
            ];

        case "Blood Rain":
            return [
                "Potential Acid Rain or Biotoxin effects",
                "GM may apply -1 visibility penalties"
            ];

        case "Acid Rain":
            return [
                "Armor ablates by 1 SP per minute when exposed"
            ];

        case "Dust Storm":
            return [
                "Severely reduced visibility",
                "Potential Foreign Object Critical Injury",
                "GM may apply -2 to relevant checks"
            ];

        case "Ash Storm":
            return [
                "Poison exposure without protection",
                "Potential Foreign Object Critical Injury",
                "GM may apply -2 to relevant checks"
            ];

        case "Radioactive Windstorm":
            return [
                "High radiation exposure without protection"
            ];

        case "Inversion Smog":
            return [
                "Poison exposure without protection",
                "GM may apply -4 to relevant checks"
            ];

        case "Deadly Thunderstorm":
            return [
                "Lightning strikes possible",
                "GM may apply -2 to relevant checks"
            ];

        case "Flooding":
            return [
                "Street and tunnel flooding"
            ];

        case "Heat Wave":
            return [
                "Exposure rules apply",
                "Additional +2 armor penalty"
            ];

        case "Cold Snap":
            return [
                "Exposure rules apply",
                "Ice-covered surfaces",
                "GM may apply -2 to relevant checks"
            ];

        case "Blackout":
            return [
                "Power outage",
                "Local communications disrupted"
            ];

        default:
            return [];
    }
}

function getWeatherSeverity(condition) {
    switch (condition) {

        case "Clear":
        case "Overcast":
            return "low";

        case "Light Rain":
        case "Light Rain/Sleet":
            return "low";

        case "Heavy Rain":
        case "Heavy Rain/Sleet":
        case "Flooding":
            return "medium";

        case "Blood Rain":
        case "Dust Storm":
        case "Ash Storm":
        case "Cold Snap":
        case "Heat Wave":
        case "Blackout":
            return "high";

        case "Acid Rain":
        case "Radioactive Windstorm":
        case "Deadly Thunderstorm":
        case "Inversion Smog":
            return "extreme";

        default:
            return "low";
    }
}