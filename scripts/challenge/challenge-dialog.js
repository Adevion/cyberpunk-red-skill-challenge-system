import { ChallengeData } from "./challenge-data.js";
import { ChallengeManager } from "./challenge-manager.js";
import { CPR_SKILLS } from "../constants/cpr-skills.js";

const skillOptions = CPR_SKILLS.map(skill => ` <option value="${skill.key}" > ${skill.label} </option> `).join("");

export class ChallengeDialog {
  static async create() {
    const content = `
      <form class="skill-challenge-form">

        <div class="form-group">
          <label>Title</label>
          <input type="text" id="challenge-title" placeholder="Warehouse Break-In" >
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea id="challenge-description" rows="3" ></textarea>
        </div>

        <hr>

        <h3>Skills</h3>
        <div id="skill-list">
          <div class="skill-row">
            <select class="skill-select"> ${skillOptions} </select>
            <input type="number" class="skill-dv" value="13" min="1" >
            <a class="remove-skill"> <i class="fas fa-trash"></i> </a>
          </div>
        </div>
        <div class="skill-controls">
          <a id="add-skill"> <i class="fas fa-plus"></i> </a>
        </div>
        <div class="skill-challenge-resize">
          <i class="fas fa-grip-lines"></i>
        </div>
      </form>
    `;

    const dialog = new Dialog({
      title: "Create Skill Challenge",
      content,
      buttons: {
        send: {
          label: "Send Challenge",
          callback: async (html) => {
            const skills = [];
            html.find(".skill-row").each((_, row) => {
              const skillKey = $(row).find(".skill-select").val();
              const skillLabel = CPR_SKILLS.find( s => s.key === skillKey )?.label;
              const skillDV = Number( $(row).find(".skill-dv").val() );
              skills.push({ key: skillKey, label: skillLabel, dv: skillDV });
            });

            if (!skills.length) {
              ui.notifications.warn( "Add at least one skill." );
              return;
            }

            const challenge =
              new ChallengeData({
                title: html.find( "#challenge-title" ).val(),
                description: html.find( "#challenge-description" ).val(),
                visibility: "open",
                skills
              });

            await ChallengeManager.send( challenge );
          }
        },

        cancel: { label: "Cancel" }
      },

      render: (html) => {

        // Add new skill line
        html.find("#add-skill").on( "click", () => {
            const row = `
              <div class="skill-row">
                <select class="skill-select"> ${skillOptions} </select>
                <input type="number" class="skill-dv" value="13" min="1" >
                <a class="remove-skill"> <i class="fas fa-trash"></i> </a>
              </div>
            `;
            html.find("#skill-list").append(row);
          }
        );

        // Remove skill line
        html.on( "click", ".remove-skill", function () {
            const rows = html.find(".skill-row");
            if (rows.length === 1) { ui.notifications.warn( "At least one skill is required." );
              return;
            }
            $(this).closest(".skill-row").remove();
          }
        );
        
        // Resize Skill Challenge Dialog
        let isResizing = false;
        let startX;
        let startY;
        let startWidth;
        let startHeight;

        const app = html.closest(".app");
        function resizeDialog(event) {
          if (!isResizing) return;
          const width = Math.max( 700, startWidth + (event.clientX - startX) );
          const height = Math.max( 400, startHeight + (event.clientY - startY) );
          app.css({ width: `${width}px`, height: `${height}px` });
        }

        function stopResize() {
          isResizing = false;
          $(document).off( ".skillchallenge" );
        }
        
        html.find(".skill-challenge-resize").on( "mousedown", (event) => {
          event.preventDefault();
          isResizing = true;
          startX = event.clientX;
          startY = event.clientY;
          startWidth = app.width();
          startHeight = app.height();

          $(document).on( "mousemove.skillchallenge", resizeDialog );
          $(document).on( "mouseup.skillchallenge", stopResize );
        });
      }
    });

    dialog.render(true);
    setTimeout(() => { dialog.setPosition({ width: 800, height: 550 }); }, 50);
  }
}