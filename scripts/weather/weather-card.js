export async function postWeatherCard(weather) {
    const content = await renderTemplate( "modules/cyberpunk-red-skill-challenge-system/templates/weather-card.hbs", weather );
    await ChatMessage.create({
        speaker: ChatMessage.getSpeaker(),
        content
    });
}