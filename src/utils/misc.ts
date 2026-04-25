import { Effect, MapPlayer, Timer } from "w3ts";
import { playerHexColorMap } from "./color";

type ProperColors = "goldenrod" | "magenta";

export function tColor(text: string | number, color?: ProperColors | keyof typeof PlayerColorHex | (string & {}) | null, alpha?: string) {
    if (color) {
        const hex = properColorHexes.get(color as ProperColors) ?? PlayerColorHex[color as keyof typeof PlayerColorHex] ?? color;
        return `|cff${hex || "FFFFFF"}${alpha || ""}${text}|r`;
    }

    return String(text);
}

/**
 * Colorizes the string according to the map player
 */
export function ptColor(player: MapPlayer, text: string) {
    const hex = playerHexColorMap.get(player.id);
    return hex ? `|cff${hex}${text}|r` : String(text);
}

const properColorHexes = new Map<ProperColors, string>([
    ["goldenrod", "ffcc00"],
    ["magenta", "FF00FF"],
]);

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

/**
 * Destroys an effect after a delay.
 * @param effect
 * @param duration 1.5 seconds
 */
export function useTempEffect(effect: Effect | undefined, duration: number = 1.5) {
    if (effect) {
        const timer = Timer.create();

        timer.start(duration, false, () => {
            effect.destroy();
            timer.destroy();
        });
    }
}
