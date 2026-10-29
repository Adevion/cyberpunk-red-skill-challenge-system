const MODULE_ID = "cyberpunk-red-skill-challenge-system";

export async function saveTemplate( name, data ) {
  const templates = game.settings.get( MODULE_ID, "templates" ) ?? {};
  templates[name] = data;

  await game.settings.set( MODULE_ID, "templates", templates );
}

export function loadTemplate( name ) {
  const templates = game.settings.get( MODULE_ID, "templates" ) ?? {};
  return templates[name] ?? null;
}

export function getTemplates() {
  return game.settings.get( MODULE_ID, "templates" ) ?? {};
}