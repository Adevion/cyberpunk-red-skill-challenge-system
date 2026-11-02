import { ChallengeDialog } from "../challenge/challenge-dialog.js";
import { WeatherDialog } from "../weather/weather-dialog.js";
import { postWeatherCard } from "../weather/weather-card.js";
import { clearCurrentWeather, getActiveWeather } from "../weather/weather-service.js";

export function registerSceneControls() {
    Hooks.on( "getSceneControlButtons", controls => {
        const tokenControls = controls.find( c => c.name === "token" );
        if (!tokenControls) {
            return;
        }

        tokenControls.tools.push({
            name: "skill-challenge",
            title: "Create Skill Challenge",
            icon: "fas fa-dice-d20",
            button: true,
            onClick: () => {
            ChallengeDialog.create();
            }
        });

        tokenControls.tools.push({
            name: "weather-generator",
            title: "Night City Weather",
            icon: "fas fa-cloud-bolt",
            button: true,
            onClick: () => WeatherDialog.create()
        });

        tokenControls.tools.push({
            name: "weather-clear",
            title: "Clear Weather",
            icon: "fas fa-sun",
            button: true,
            onClick: async () => {
                const confirmed = await Dialog.confirm({
                    title: "Clear Weather",
                    content: ` <p> Reset active weather and return to seasonal default conditions? </p> `
                });
                if (!confirmed) { return; }
                await clearCurrentWeather();
                const weather = getActiveWeather();
                await postWeatherCard(weather);
                ui.notifications.info( "Weather reset to seasonal conditions." );
            }
        });

        tokenControls.tools.push({
            name: "weather-current",
            title: "Current Weather",
            icon: "fas fa-cloud-sun",
            button: true,

            onClick: async () => {
                const weather = getActiveWeather();
                await postWeatherCard(weather);
            }
        });
    });
}