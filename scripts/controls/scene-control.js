import { ChallengeDialog } from "../challenge/challenge-dialog.js";

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
    });
}