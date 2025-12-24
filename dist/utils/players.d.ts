import { MapPlayer, Rectangle, Unit } from "w3ts";
/**
 * Does a callback for every unit of the player that has the ability
 * @param player
 * @param abilityId
 * @param cb
 */
export declare function forEachUnitOfPlayerWithAbility(player: MapPlayer, abilityId: number, cb: (unit: Unit) => void): void;
/**
 * Calls a function for each player playing and is an ally of red.
 * @warning specific to map
 */
export declare function forEachAlliedPlayer(cb: (player: MapPlayer, index: number) => void): void;
export declare function forEachPlayer(cb: (player: MapPlayer, index: number) => void): void;
/**
 * Executes the callback function for each unit matching the unit type for the player
 * @param unitType Unit Type Id or the Unit Type String "hcas", etc
 */
export declare function forEachUnitTypeOfPlayer(unitType: number | string, player: MapPlayer, cb: (unit: Unit) => void): void;
/**
 * Doesn;'t appear to actually work?
 * @broken
 * @param unitName
 * @param unitType
 * @param fn
 */
export declare function forEachUnitOfType(unitName: string, unitType: number | string, fn: (unit: Unit) => void): void;
/**
 * @param unitType Unit Type Id or the Unit Type String "hcas", etc
 */
export declare function forEachUnitOfPlayer(player: MapPlayer, cb: (unit: Unit) => void): void;
/**
 * Executes the callback function for each unit matching the unit type for the player
 * @param unitType Unit Type Id or the Unit Type String "hcas", etc
 */
export declare function forEachUnitInRectangle(rectangle: Rectangle, cb: (unit: Unit) => void): void;
export declare function isPlaying(player: MapPlayer | player): boolean;
export declare function isUser(player: MapPlayer | player): boolean;
export declare function isComputer(player: MapPlayer): boolean;
export declare function isPlayingUser(player: MapPlayer | player): boolean;
export declare function adjustPlayerState(player: MapPlayer, whichState: playerstate, amount: number): void;
export declare function adjustGold(player: MapPlayer, amount: number): void;
export declare function adjustLumber(player: MapPlayer, amount: number): void;
export declare function adjustFoodCap(player: MapPlayer, amount: number): void;
export declare function adjustFoodUsed(player: MapPlayer, amount: number): void;
export declare function playerHasResources(player: MapPlayer, data: {
    gold?: number;
    lumber?: number;
}): boolean;
export declare function setPlayerName(): void;
