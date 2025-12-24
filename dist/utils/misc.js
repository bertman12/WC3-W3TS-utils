"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerColorHex = void 0;
exports.tColor = tColor;
exports.ptColor = ptColor;
exports.notifyPlayer = notifyPlayer;
exports.displayError = displayError;
exports.getRelativeAngleToUnit = getRelativeAngleToUnit;
exports.useEffects = useEffects;
exports.useTempEffect = useTempEffect;
const w3ts_1 = require("w3ts");
function tColor(text, color, hex, alpha) {
    if (color) {
        return `|cff${properColorHexes.get(color) || "FFFFFF"}${alpha || ""}${text}|r`;
    }
    else if (hex) {
        return `|cff${hex}${alpha || ""}${text}|r`;
    }
    return String(text);
}
/**
 * Colorizes the string according to the map player
 */
function ptColor(player, text) {
    return `${tColor(text, undefined, playerColors[player.id])}`;
}
const properColorHexes = new Map([
    ["goldenrod", "ffcc00"],
    ["green", "00FF00"],
    ["yellow", "FFFF00"],
    ["red", "FF0000"],
    ["magenta", "FF00FF"],
    ["player1-red", "ff0303"],
    ["player2-blue", "0042ff"],
    ["player3-teal", "1ce6b9"],
    ["player4-purple", "540081"],
    ["player5-yellow", "fffc00"],
    ["player6-orange", "fe8a0e"],
]);
// enum PlayerColors {
//     Player1 = "ff0303", // Red
//     Player2 = "0042ff", // Blue
//     Player3 = "1be7ba", // Teal
//     Player4 = "550081", // Purple
//     Player5 = "fefc00", // Yellow
//     Player6 = "fe890d", // Orange
//     Player7 = "21bf00", // Green
//     Player8 = "e45caf", // Pink
//     Player9 = "939596", // Gray
//     Player10 = "7ebff1", // Light Blue
//     Player11 = "106247", // Dark Green
//     Player12 = "4f2b05", // Brown
//     Player13 = "9c0000", // Maroon
//     Player14 = "0000c3", // Navy
//     Player15 = "00ebff", // Turquoise
//     Player16 = "bd00ff", // Violet
//     Player17 = "ecce87", // Wheat
//     Player18 = "f7a58b", // Peach
//     Player19 = "bfff81", // Mint
//     Player20 = "dbb8eb", // Lavender
//     Player21 = "4f5055", // Coal
//     Player22 = "ecf0ff", // Snow
//     Player23 = "00781e", // Emerald
//     Player24 = "a56f34", // Peanut
//     PlayerNeutral = "2e2d2e", // Black
// }
var PlayerColorHex;
(function (PlayerColorHex) {
    PlayerColorHex["Red"] = "ff0303";
    PlayerColorHex["Blue"] = "0042ff";
    PlayerColorHex["Teal"] = "1be7ba";
    PlayerColorHex["Purple"] = "550081";
    PlayerColorHex["Yellow"] = "fefc00";
    PlayerColorHex["Orange"] = "fe890d";
    PlayerColorHex["Green"] = "21bf00";
    PlayerColorHex["Pink"] = "e45caf";
    PlayerColorHex["Gray"] = "939596";
    PlayerColorHex["LightBlue"] = "7ebff1";
    PlayerColorHex["DarkGreen"] = "106247";
    PlayerColorHex["Brown"] = "4f2b05";
    PlayerColorHex["Maroon"] = "9c0000";
    PlayerColorHex["Navy"] = "0000c3";
    PlayerColorHex["Turquoise"] = "00ebff";
    PlayerColorHex["Violet"] = "bd00ff";
    PlayerColorHex["Wheat"] = "ecce87";
    PlayerColorHex["Peach"] = "f7a58b";
    PlayerColorHex["Mint"] = "bfff81";
    PlayerColorHex["Lavender"] = "dbb8eb";
    PlayerColorHex["Coal"] = "4f5055";
    PlayerColorHex["Snow"] = "ecf0ff";
    PlayerColorHex["Emerald"] = "00781e";
    PlayerColorHex["Peanut"] = "a56f34";
    PlayerColorHex["Black"] = "2e2d2e";
})(PlayerColorHex || (exports.PlayerColorHex = PlayerColorHex = {}));
const playerColors = [
    "ff0303", // Player 1: Red
    "0042ff", // Player 2: Blue
    "1be7ba", // Player 3: Teal
    "550081", // Player 4: Purple
    "fefc00", // Player 5: Yellow
    "fe890d", // Player 6: Orange
    "21bf00", // Player 7: Green
    "e45caf", // Player 8: Pink
    "939596", // Player 9: Gray
    "7ebff1", // Player 10: Light Blue
    "106247", // Player 11: Dark Green
    "4f2b05", // Player 12: Brown
    "9c0000", // Player 13: Maroon
    "0000c3", // Player 14: Navy
    "00ebff", // Player 15: Turquoise
    "bd00ff", // Player 16: Violet
    "ecce87", // Player 17: Wheat
    "f7a58b", // Player 18: Peach
    "bfff81", // Player 19: Mint
    "dbb8eb", // Player 20: Lavender
    "4f5055", // Player 21: Coal
    "ecf0ff", // Player 22: Snow
    "00781e", // Player 23: Emerald
    "a56f34", // Player 24: Peanut
    "2e2d2e", // Player Neutral: Black
];
/**
 * Standardized format for notifying player of events.
 */
function notifyPlayer(msg) {
    print(`${tColor("!", "goldenrod")} - ${msg}`);
}
function displayError(msg) {
    print(`[ ${tColor("WARNING", "red")} ]: ${msg}`);
}
/**
 * Returns degrees or radians?
 */
function getRelativeAngleToUnit(unit, relativeUnit) {
    const locA = GetUnitLoc(unit.handle);
    const locB = GetUnitLoc(relativeUnit.handle);
    const angle = AngleBetweenPoints(locA, locB);
    RemoveLocation(locA);
    RemoveLocation(locB);
    return angle;
}
/**
 * Manages state of effects in this context so you don't have to!
 */
function useEffects() {
    const effects = [];
    return {
        addEffect: (effect) => {
            if (effect) {
                effects.push(effect);
            }
        },
        /**
         * @returns reference to effects array
         */
        getEffects: () => {
            return effects;
        },
        destroyAllEffects: () => {
            effects.forEach((e) => {
                e.destroy();
            });
        },
    };
}
function useTempEffect(effect, duration = 1.5) {
    if (effect) {
        const timer = w3ts_1.Timer.create();
        timer.start(duration, false, () => {
            effect.destroy();
            timer.destroy();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9taXNjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHdCQVFDO0FBS0QsMEJBRUM7QUFzR0Qsb0NBRUM7QUFFRCxvQ0FFQztBQUtELHdEQVNDO0FBS0QsZ0NBcUJDO0FBRUQsc0NBU0M7QUFsTEQsK0JBQXNEO0FBSXRELFNBQWdCLE1BQU0sQ0FBQyxJQUFxQixFQUFFLEtBQTJCLEVBQUUsR0FBb0MsRUFBRSxLQUFjO0lBQzNILElBQUksS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsR0FBRyxLQUFLLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDO0lBQ25GLENBQUM7U0FBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxPQUFPLEdBQUcsR0FBRyxLQUFLLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDO0lBQy9DLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixPQUFPLENBQUMsTUFBaUIsRUFBRSxJQUFZO0lBQ25ELE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNqRSxDQUFDO0FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBdUI7SUFDbkQsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO0lBQ3ZCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztJQUNuQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7SUFDcEIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO0lBQ2pCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztJQUNyQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7SUFDekIsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO0lBQzFCLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQztJQUMxQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQztJQUM1QixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQztJQUM1QixDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQztDQUMvQixDQUFDLENBQUM7QUFDSCxzQkFBc0I7QUFDdEIsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6QyxvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsbUNBQW1DO0FBQ25DLHNDQUFzQztBQUN0QyxxQ0FBcUM7QUFDckMseUNBQXlDO0FBQ3pDLElBQUk7QUFFSixJQUFZLGNBMEJYO0FBMUJELFdBQVksY0FBYztJQUN0QixnQ0FBYyxDQUFBO0lBQ2QsaUNBQWUsQ0FBQTtJQUNmLGlDQUFlLENBQUE7SUFDZixtQ0FBaUIsQ0FBQTtJQUNqQixtQ0FBaUIsQ0FBQTtJQUNqQixtQ0FBaUIsQ0FBQTtJQUNqQixrQ0FBZ0IsQ0FBQTtJQUNoQixpQ0FBZSxDQUFBO0lBQ2YsaUNBQWUsQ0FBQTtJQUNmLHNDQUFvQixDQUFBO0lBQ3BCLHNDQUFvQixDQUFBO0lBQ3BCLGtDQUFnQixDQUFBO0lBQ2hCLG1DQUFpQixDQUFBO0lBQ2pCLGlDQUFlLENBQUE7SUFDZixzQ0FBb0IsQ0FBQTtJQUNwQixtQ0FBaUIsQ0FBQTtJQUNqQixrQ0FBZ0IsQ0FBQTtJQUNoQixrQ0FBZ0IsQ0FBQTtJQUNoQixpQ0FBZSxDQUFBO0lBQ2YscUNBQW1CLENBQUE7SUFDbkIsaUNBQWUsQ0FBQTtJQUNmLGlDQUFlLENBQUE7SUFDZixvQ0FBa0IsQ0FBQTtJQUNsQixtQ0FBaUIsQ0FBQTtJQUNqQixrQ0FBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBMUJXLGNBQWMsOEJBQWQsY0FBYyxRQTBCekI7QUFFRCxNQUFNLFlBQVksR0FBRztJQUNqQixRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixRQUFRLEVBQUUsbUJBQW1CO0lBQzdCLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixRQUFRLEVBQUUsd0JBQXdCO0lBQ2xDLFFBQVEsRUFBRSx3QkFBd0I7SUFDbEMsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFFBQVEsRUFBRSxrQkFBa0I7SUFDNUIsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLFFBQVEsRUFBRSxzQkFBc0I7SUFDaEMsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLFFBQVEsRUFBRSxxQkFBcUI7SUFDL0IsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixRQUFRLEVBQUUsd0JBQXdCO0NBQ3JDLENBQUM7QUFFRjs7R0FFRztBQUNILFNBQWdCLFlBQVksQ0FBQyxHQUFXO0lBQ3BDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEdBQVc7SUFDcEMsS0FBSyxDQUFDLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLElBQVUsRUFBRSxZQUFrQjtJQUNqRSxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTdDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsVUFBVTtJQUN0QixNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsT0FBTztRQUNILFNBQVMsRUFBRSxDQUFDLE1BQTBCLEVBQUUsRUFBRTtZQUN0QyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNMLENBQUM7UUFDRDs7V0FFRztRQUNILFVBQVUsRUFBRSxHQUFHLEVBQUU7WUFDYixPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbEIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQTBCLEVBQUUsV0FBbUIsR0FBRztJQUM1RSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1QsTUFBTSxLQUFLLEdBQUcsWUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTdCLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDIn0=