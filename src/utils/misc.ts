import { Effect, MapPlayer, Timer, Unit } from "w3ts";

type ProperColors = "goldenrod" | "magenta" | "green" | "yellow" | "red" | "player1-red" | "player2-blue" | "player3-teal" | "player4-purple" | "player5-yellow" | "player6-orange";

export function tColor(text: string | number, color?: ProperColors | null, hex?: PlayerColorHex | string | null, alpha?: string) {
    if (color) {
        return `|cff${properColorHexes.get(color) || "FFFFFF"}${alpha || ""}${text}|r`;
    } else if (hex) {
        return `|cff${hex}${alpha || ""}${text}|r`;
    }

    return String(text);
}

/**
 * Colorizes the string according to the map player
 */
export function ptColor(player: MapPlayer, text: string) {
    return `${tColor(text, undefined, playerColors[player.id])}`;
}

const properColorHexes = new Map<ProperColors, string>([
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

export enum PlayerColorHex {
    Red = "ff0303",
    Blue = "0042ff",
    Teal = "1be7ba",
    Purple = "550081",
    Yellow = "fefc00",
    Orange = "fe890d",
    Green = "21bf00",
    Pink = "e45caf",
    Gray = "939596",
    LightBlue = "7ebff1",
    DarkGreen = "106247",
    Brown = "4f2b05",
    Maroon = "9c0000",
    Navy = "0000c3",
    Turquoise = "00ebff",
    Violet = "bd00ff",
    Wheat = "ecce87",
    Peach = "f7a58b",
    Mint = "bfff81",
    Lavender = "dbb8eb",
    Coal = "4f5055",
    Snow = "ecf0ff",
    Emerald = "00781e",
    Peanut = "a56f34",
    Black = "2e2d2e",
}

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
export function notifyPlayer(msg: string) {
    print(`${tColor("!", "goldenrod")} - ${msg}`);
}

export function displayError(msg: string) {
    print(`[ ${tColor("WARNING", "red")} ]: ${msg}`);
}

/**
 * Returns degrees or radians?
 */
export function getRelativeAngleToUnit(unit: Unit, relativeUnit: Unit) {
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
export function useEffects() {
    const effects: Effect[] = [];

    return {
        addEffect: (effect: Effect | undefined) => {
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

export function useTempEffect(effect: Effect | undefined, duration: number = 1.5) {
    if (effect) {
        const timer = Timer.create();

        timer.start(duration, false, () => {
            effect.destroy();
            timer.destroy();
        });
    }
}
