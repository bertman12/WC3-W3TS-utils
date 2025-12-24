import { Unit } from "w3ts";
/**
 * Good for once a unit gets near you, but not good while they are near you since the event is only triggered on entry, not during
 * @param unit
 * @param range
 * @param cb
 * @param config
 * @returns
 */
export declare function unitGetsNearThisUnit(unit: Unit, range: number, cb: (u: Unit) => void, config?: {
    uniqueUnitsOnly: boolean;
    filter?: boolexpr | (() => boolean);
    onDestroy?: (unitsEffected: Unit[]) => void;
}): {
    cleanupUnitGetsNearThisUnit: (delay?: number) => void;
    clearUniqueUnits: () => void;
};
/**
 *
 * @param cb
 * @param abilityId
 * @param dummyLifeTime Maybe be necessary to have a long lifetime so spells like chain lightning will have time to bounce to all targets
 * @param owner
 */
/**
 * Creates a trigger to monitor when a unit is attacked
 *
 * We could also have all functions execute in this single trigger's context instead of creating new triggers each time the function is used.
 * @param cb
 * @param config
 */
export declare function onUnitAttacked(cb: (attacker: Unit, victim: Unit) => void, config: {
    attackerCooldown?: boolean;
    procChance?: number;
}): void;
