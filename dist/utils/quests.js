"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup_quests = setup_quests;
exports.addQuest = addQuest;
const w3ts_1 = require("w3ts");
const misc_1 = require("./misc");
function setup_quests() {
    w3ts_1.Timer.create().start(1, false, () => {
        addQuest("Basic Game Info", `\nA roguelite base assault game. \nChoose from a wide variety of units that are trained in various schools of magic and skills.\n Outsmart and counter your opponent..
        `, "ReplaceableTextures\\CommandButtons\\BTNPeasant.blp");
        // \n${tColor("-fixSpawns", "goldenrod")}: Player 1 can only use this. This will fix add all player's spawn units to their corresponding spawn pool.
        addQuest("Commands", `
            \n${(0, misc_1.tColor)("-cam ####", "goldenrod")}: Sets the camera distance.
            \n-playername xxxx   This will change your name.
        `, "ReplaceableTextures\\WorldEditUI\\Doodad-Cinematic.blp", false);
        addQuest("|cffffcc00Evolution Castle Assault v0.01|r", "Created by JediMindTrix/NihilismIsDeath", "ReplaceableTextures\\CommandButtons\\BTNClayFigurine.blp", false);
    });
}
function addQuest(title, description, iconPath, required = true) {
    const q = w3ts_1.Quest.create();
    if (q) {
        q.setTitle(title);
        q.required = required;
        q.setDescription(description);
        if (iconPath) {
            q.setIcon(iconPath);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3F1ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9DQXNCQztBQUVELDRCQVVDO0FBckNELCtCQUFvQztBQUNwQyxpQ0FBZ0M7QUFFaEMsU0FBZ0IsWUFBWTtJQUN4QixZQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQ2hDLFFBQVEsQ0FDSixpQkFBaUIsRUFDakI7U0FDSCxFQUNHLHFEQUFxRCxDQUN4RCxDQUFDO1FBRUYsb0pBQW9KO1FBQ3BKLFFBQVEsQ0FDSixVQUFVLEVBQ1Y7Z0JBQ0ksSUFBQSxhQUFNLEVBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQzs7U0FFdkMsRUFDRyx3REFBd0QsRUFDeEQsS0FBSyxDQUNSLENBQUM7UUFFRixRQUFRLENBQUMsNENBQTRDLEVBQUUseUNBQXlDLEVBQUUsMERBQTBELEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekssQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLEtBQWEsRUFBRSxXQUFtQixFQUFFLFFBQWlCLEVBQUUsV0FBb0IsSUFBSTtJQUNwRyxNQUFNLENBQUMsR0FBRyxZQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDdEIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUMifQ==