import { Group, MapPlayer, Timer, Unit } from "w3ts";
import { adjustGold, adjustLumber } from "./players";

export function createUnits(quantity: number, useFood: boolean, ...args: Parameters<typeof Unit.create>) {
    const units: Unit[] = [];
    for (let x = 0; x < quantity; x++) {
        const u = Unit.create(...args);

        if (u) {
            u.setUseFood(useFood);
            units.push(u);
        }
    }

    return units;
}

/**
 * Refund unit's gold and wood cost.
 * @param u
 */
export function refundUnitCost(u: Unit) {
    const gold = GetUnitGoldCost(u.typeId);
    const wood = GetUnitWoodCost(u.typeId);
    adjustGold(u.owner, gold);
    adjustLumber(u.owner, wood);
}

/**
 * Returns true if the ALIVE unit has the ability within their first 12 abilities
 * @param unit
 * @param abilityId
 * @returns
 */
export function unitHasAbility(unit: Unit, abilityId: number): boolean {
    for (let x = 0; x < 12; x++) {
        const currentAbility = unit.getAbilityByIndex(x);

        if (currentAbility && currentAbility === unit.getAbility(abilityId) && unit.isAlive()) {
            return true;
        }
    }

    return false;
}

export function unitsInRange(x: number, y: number, radius: number, cb: (unit: Unit) => void) {
    const g = Group.create();
    if (g) {
        g.enumUnitsInRange(x, y, radius, () => {
            const unit = Unit.fromFilter();
            if (unit) {
                cb(unit);
            }
            return true;
        });

        g.destroy();
    }
}

/**
 *
 * @param cb
 * @param abilityId
 * @param owner
 */
export function useTempDummyUnit(dummyUnitCode: number, cb: (dummy: Unit) => void, abilityId: number, owner: MapPlayer, x: number, y: number, config?: { facing?: number; abilityLevel?: number; dummyLifeSpan?: number }) {
    let dummy: Unit | undefined = undefined;
    dummy = Unit.create(owner, dummyUnitCode, x, y, config?.facing ?? 0);

    const t = Timer.create();

    if (dummy) {
        dummy.addAbility(abilityId);
        dummy.setAbilityManaCost(abilityId, config?.abilityLevel ? config.abilityLevel - 1 : 0, 0);
        cb(dummy);

        t.start(config?.dummyLifeSpan ?? 2, false, () => {
            dummy?.destroy();
            t.destroy();
        });
    }
}
