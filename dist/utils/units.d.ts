import { MapPlayer, Unit } from "w3ts";
export declare function createUnits(quantity: number, useFood: boolean, ...args: Parameters<typeof Unit.create>): Unit[];
/**
 * Refund unit's gold and wood cost.
 * @param u
 */
export declare function refundUnitCost(u: Unit): void;
/**
 * Returns true if the ALIVE unit has the ability within their first 12 abilities
 * @param unit
 * @param abilityId
 * @returns
 */
export declare function unitHasAbility(unit: Unit, abilityId: number): boolean;
export declare function unitsInRange(x: number, y: number, radius: number, cb: (unit: Unit) => void): void;
/**
 *
 * @param cb
 * @param abilityId
 * @param owner
 */
export declare function useTempDummyUnit(dummyUnitCode: number, cb: (dummy: Unit) => void, abilityId: number, owner: MapPlayer, x: number, y: number, config?: {
    facing?: number;
    abilityLevel?: number;
    dummyLifeSpan?: number;
}): void;
