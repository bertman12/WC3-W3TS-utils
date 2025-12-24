import { Effect, MapPlayer, Unit } from "w3ts";
type ProperColors = "goldenrod" | "magenta" | "green" | "yellow" | "red" | "player1-red" | "player2-blue" | "player3-teal" | "player4-purple" | "player5-yellow" | "player6-orange";
export declare function tColor(text: string | number, color?: ProperColors | null, hex?: PlayerColorHex | string | null, alpha?: string): string;
/**
 * Colorizes the string according to the map player
 */
export declare function ptColor(player: MapPlayer, text: string): string;
export declare enum PlayerColorHex {
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
    Black = "2e2d2e"
}
/**
 * Standardized format for notifying player of events.
 */
export declare function notifyPlayer(msg: string): void;
export declare function displayError(msg: string): void;
/**
 * Returns degrees or radians?
 */
export declare function getRelativeAngleToUnit(unit: Unit, relativeUnit: Unit): number;
/**
 * Manages state of effects in this context so you don't have to!
 */
export declare function useEffects(): {
    addEffect: (effect: Effect | undefined) => void;
    /**
     * @returns reference to effects array
     */
    getEffects: () => Effect[];
    destroyAllEffects: () => void;
};
export declare function useTempEffect(effect: Effect | undefined, duration?: number): void;
export {};
