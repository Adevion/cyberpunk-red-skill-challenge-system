import { generateWeather } from "./weather-generator.js";
import { postWeatherCard } from "./weather-card.js";
import { setCurrentWeather } from "./weather-service.js";
import { MODULE_ID, SETTINGS } from "../constants/constants.js";

export class WeatherDialog {
  static async create() {
    const enableRandomWeather = game.settings.get(
        MODULE_ID,
        SETTINGS.ENABLE_RANDOM_WEATHER
    );

    let seasonOptions = `
        <option value="auto">Current Season</option>
        <option value="winter">December - February</option>
        <option value="spring">March - May</option>
        <option value="summer">June - August</option>
        <option value="autumn">September - November</option>
    `;

    if (enableRandomWeather) {
        seasonOptions += `
            <option value="random">Random Season</option>
        `;
    }

    const content = `
      <form>
        <div class="form-group">
          <label>Season</label>
            <select id="weather-season">
              ${seasonOptions}
            </select>
        </div>
      </form>
    `;

    new Dialog({
      title: "Night City Weather",
      content,
      buttons: {
        generate: {
          icon: '<i class="fas fa-cloud"></i>',
          label: "Generate Weather",
          callback: async (html) => {
            const season = html.find("#weather-season").val();
            const weather = await generateWeather(season);
            ui.notifications.info( weather.condition );
            await setCurrentWeather(weather);
            await postWeatherCard(weather);
          }
        },

        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancel"
        }
      },

      default: "generate"
    }).render(true);
  }
}