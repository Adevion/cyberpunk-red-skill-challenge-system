// Settings
import { registerSettings } from "./settings/settings.js";

// Socket
import { registerSocket } from "./socket.js";

// Control
import { registerSceneControls } from "./controls/scene-control.js";

// Dialogs
import { ChallengeDialog } from "./challenge/challenge-dialog.js";

// Constants
import { CPR_SKILLS } from "./constants/cpr-skills.js";

// Rolling
import { executeSkillRoll } from "./rolling/skill-roll.js";
import { postSkillRollCard } from "./rolling/skill-rollcard.js";

Hooks.once("init", () => {
  console.log( "CPR Skill Challenge | Initializing" );
  registerSettings();
  registerSceneControls();
});

Hooks.once("ready", () => {
  registerSocket();
  window.skillChallenge = { create: ChallengeDialog.create };
  console.log( "CPR Skill Challenge | Ready" );
});

Hooks.on(
  "renderChatMessage",
  (message, html) => {
    html.find(".skill-challenge-button").on("click", async (event) => {
      const button = $(event.currentTarget);
      //TODO: Real Lock™
      //TODO: Add server-side challenge submission tracking.
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
        userId: game.user.id
      };

      const result = await executeSkillRoll( actor, selection );

      if (!result) {
        return;
      }

      await postSkillRollCard( actor, selection, result
      );
    });
  }
);