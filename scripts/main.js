// Settings
import { registerSettings } from "./settings/settings.js";
import { registerSocket } from "./socket.js";

// Dialogs
import { ChallengeDialog } from "./challenge/challenge-dialog.js"

// Skills
import { SkillResolver } from "./rolling/skill-resolver.js";

Hooks.once("init", () => {
  console.log("CPR Skill Challenge | Initializing");

  registerSettings();
});

Hooks.once("ready", () => {
  registerSocket();

  window.skillChallenge = { create: ChallengeDialog.create };

  console.log("CPR Skill Challenge | Ready");
});

Hooks.on( "renderChatMessage", (message, html) => {
    html.find(".skill-challenge-button").on("click", async (event) => {
        const button = $(event.currentTarget);
        console.log( "Skill Challenge Clicked",
          {
            challengeId: button.data("challenge"),
            skill: button.data("skill"),
            dv: button.data("dv"),
            user: game.user.name
          }
        );
        button.closest(".skill-challenge-card").find(".skill-challenge-button").prop("disabled", true);

        const actor = game.user.character;

        if (!actor && !game.user.isGM) {
          ui.notifications.warn( "No character assigned." );
          return;
        }

        console.log(actor);

        const selection = {
          challengeId: button.data("challenge"),
          actorId: actor.id,
          actorName: actor.name,
          skill: button.data("skill"),
          dv: Number( button.data("dv") ),
          userId: game.user.id
        };

        console.log(selection);
        const skillKey = button.data("skill");
        const resolvedSkill = SkillResolver.resolve( actor, skillKey );
        const skillData = actor.system.skills[resolvedSkill];
        const baseSkill = skillData.level + skillData.stat + skillData.mods;

        console.log("Resolved Skill", resolvedSkill);
        console.log("Skill Data", skillData);
        console.log("Base Skill", baseSkill);

        if (!resolvedSkill) {
          ui.notifications.warn( `${actor.name} does not have ${selection.skill}.` );
          return;
        }

        const roll = await new Roll("1d10").evaluate();
        const total = roll.total + baseSkill;
        const success = total >= selection.dv;

        const result = { actorName: actor.name, skill: resolvedSkill, roll: roll.total, baseSkill, total, dv: selection.dv, success };
        console.log(result);
    
        const content = `
          <div class="skill-challenge-result">
            <h3>${actor.name}</h3>
            <p>${resolvedSkill}</p>
            <p>${roll.total} + ${baseSkill} = ${total}</p>
            <p>DV ${selection.dv}</p>
            <p>${success ? "SUCCESS" : "FAILURE"}</p>
          </div>
        `;

        ChatMessage.create({ content });

      });
  }
);