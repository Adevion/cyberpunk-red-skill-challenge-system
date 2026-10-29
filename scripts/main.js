// Settings
import { registerSettings } from "./settings/settings.js";
// Socket
import { registerSocket } from "./socket.js";
// Control
import { registerSceneControls } from "./controls/scene-control.js";
// Dialogs
import { ChallengeDialog } from "./challenge/challenge-dialog.js";
// Templates
import { saveTemplate, loadTemplate, getTemplates } from "./challenge/template-manager.js";
// Constants
import { CPR_SKILLS } from "./constants/cpr-skills.js";
// Rolling
import { executeSkillRoll } from "./rolling/skill-roll.js";
// Visibility
import { handleResultVisibility } from "./rolling/visibility-handler.js";

Hooks.once("init", () => {
  console.log( "CPR Skill Challenge | Initializing" );
  registerSettings();
  registerSceneControls();

});

Hooks.once("ready", () => {
  registerSocket();
  //
  // Public Macro API
  //
  window.skillChallenge = {
    create: (data = {}) => ChallengeDialog.create(data),
    saveTemplate,
    loadTemplate,
    getTemplates
  };
  console.log( "CPR Skill Challenge | Ready" );
});

Hooks.on(
  "renderChatMessage",
  (message, html) => {
    html.find( ".skill-challenge-button" ).on(
      "click",
      async (event) => {
        const button = $(event.currentTarget);
        // TODO: Real Lock™
        // TODO: Server-side submission tracking
        const actor = game.user.character;
        if ( !actor && !game.user.isGM ) {
          ui.notifications.warn( "No character assigned." );
          return;
        }

        const skillKey = button.data("skill");
        const skillLabel = CPR_SKILLS.find( s => s.key === skillKey )?.label ?? skillKey;
        const selection = {
          challengeId: button.data("challenge"),
          actorId: actor.id,
          actorName: actor.name,
          skill: skillKey,
          skillLabel,
          dv: Number( button.data("dv") ),
          visibility: button.data("visibility"),
          userId: game.user.id
        };

        const result = await executeSkillRoll( actor, selection );

        if (!result) {
          return;
        }

        await handleResultVisibility( actor, selection, result );
      }
    );
  }
);