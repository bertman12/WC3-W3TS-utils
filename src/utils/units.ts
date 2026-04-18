import { Group, MapPlayer, Timer, Trigger, Unit } from "w3ts";
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

interface UseDummyUnitConfiguration {
    /**
     * Default: 0
     */
    facing?: number;
    /**
     * Default: 0
     */
    abilityLevel?: number;
    /**
     * Default: 2 seconds
     */
    dummyLifeSpan?: number;
}

/**
 *
 * The dummy unit has a default lifespan of 2 seconds
 *
 * @param dummyUnitCode
 * @param cb
 * @param abilityId
 * @param owner
 * @param x
 * @param y
 * @param {UseDummyUnitConfiguration} config
 */
export function useDummyUnit(dummyUnitCode: number, cb: (dummy: Unit) => void, abilityId: number, owner: MapPlayer, x: number, y: number, config?: UseDummyUnitConfiguration) {
    let dummy: Unit | undefined = undefined;
    dummy = Unit.create(owner, dummyUnitCode, x, y, config?.facing ?? 0);

    const t = Timer.create();

    if (dummy) {
        dummy.addAbility(abilityId);
        dummy.setAbilityLevel(abilityId, config?.abilityLevel || 0);
        dummy.setAbilityManaCost(abilityId, config?.abilityLevel ? config.abilityLevel - 1 : 0, 0);
        cb(dummy);

        t.start(config?.dummyLifeSpan ?? 2, false, () => {
            dummy?.destroy();
            t.destroy();
        });
    }
}

/**
 * Creates a trigger to monitor when a unit is attacked
 *
 * We could also have all functions execute in this single trigger's context instead of creating new triggers each time the function is used.
 * @param cb
 * @param config
 */
export function onUnitAttacked(cb: (attacker: Unit, victim: Unit) => void, config: { attackerCooldown?: boolean; procChance?: number }) {
    const attackerTriggerCooldown = new Set<Unit>();
    const t = Trigger.create();

    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);

    t.addAction(() => {
        const attacker = Unit.fromHandle(GetAttacker());
        const victim = Unit.fromHandle(GetAttackedUnitBJ());

        if (!attacker || !victim) {
            return;
        }

        //Attack was not below the proc chance, and thus we will not use the cb function
        if (config.procChance && Math.ceil(Math.random() * 100) >= config.procChance) {
            return;
        }

        //Attacker has already used the trigger
        if (config.attackerCooldown && attackerTriggerCooldown.has(attacker)) {
            return;
        }

        attackerTriggerCooldown.add(attacker);

        //Finally, after all conditions have been met, use the cb function
        cb(attacker, victim);

        const t = Timer.create();

        //removes the attacker from the cooldown group after 1/3 of that units attack cooldown has passed.
        t.start(attacker.getAttackCooldown(0) / 3, false, () => {
            attackerTriggerCooldown.delete(attacker);
            t.destroy();
        });
    });
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