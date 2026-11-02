import { MODULE_ID } from "../constants/constants.js";

export async function saveTemplate( name, data ) {
  const templates = game.settings.get( MODULE_ID, "templates" ) ?? {};
  name = name.trim();
  if (!name) {
    throw new Error( "Template name cannot be empty." );
  }

  if (templates[name]) {
    throw new Error( `Template "${name}" already exists.` );
  }

  templates[name] = data;
  await game.settings.set( MODULE_ID, "templates", templates );
}

export function loadTemplate( name ) {
  const templates = game.settings.get( MODULE_ID, "templates" ) ?? {};
  return templates[name] ?? null;
}

export async function deleteTemplate( name ) {
  const templates = game.settings.get( MODULE_ID, "templates" ) ?? {};
  delete templates[name];

  await game.settings.set( MODULE_ID, "templates", templates );
}

export async function renameTemplate( oldName, newName ) {
  const templates = game.settings.get( MODULE_ID, "templates" ) ?? {};

  if (!templates[oldName]) {
    return;
  }

  newName = newName.trim();
  if (!newName) {
    throw new Error( "Template name cannot be empty." );
  }

  if ( oldName !== newName && templates[newName] ) {
    throw new Error( `Template "${newName}" already exists.` );
  }

  templates[newName] = templates[oldName];
  delete templates[oldName];

  await game.settings.set( MODULE_ID, "templates", templates );
}

export function getTemplates() {
  return game.settings.get( MODULE_ID, "templates" ) ?? {};
}