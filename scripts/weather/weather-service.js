import { SEASONAL_DEFAULTS } from "./weather-data.js";
import { MODULE_ID } from "../constants/constants.js";
import { getCurrentSeason } from "./weather-generator.js";

export async function setCurrentWeather(weather) {
    await game.settings.set(
        MODULE_ID,
        "currentWeather",
        weather
    );
}

export function getCurrentWeather() {
    return game.settings.get(
        MODULE_ID,
        "currentWeather"
    );
}

export async function clearCurrentWeather() {
    await game.settings.set(
        MODULE_ID,
        "currentWeather",
        null
    );
}

export function getSeasonalDefault( season = getCurrentSeason() ) {
    return foundry.utils.deepClone(
        SEASONAL_DEFAULTS[season]
    );
}

export function getActiveWeather() {
    const weather = getCurrentWeather();

    if (weather) {
        return weather;
    }

    return getSeasonalDefault() ;
}