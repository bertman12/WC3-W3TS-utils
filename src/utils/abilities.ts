import { Timer, Trigger, Unit } from "w3ts";

/**
 * Good for once a unit gets near you, but not good while they are near you since the event is only triggered on entry, not during
 * @param unit
 * @param range
 * @param cb
 * @param config
 * @returns
 */
export function unitGetsNearThisUnit(
    unit: Unit,
    range: number,
    cb: (u: Unit) => void,
    config?: {
        uniqueUnitsOnly: boolean;
        filter?: boolexpr | (() => boolean);
        onDestroy?: (unitsEffected: Unit[]) => void;
    },
) {
    const trig = Trigger.create();

    /**
     * A unique set of the units effected
     */
    let effectedUnitPool: Unit[] = [];

    trig.registerUnitInRage(unit.handle, range, config?.filter ?? (() => true));

    trig.addAction(() => {
        const u = Unit.fromEvent();

        if (!u) {
            return;
        }

        if (!effectedUnitPool.includes(u)) {
            effectedUnitPool.push(u);
        }

        if (config?.uniqueUnitsOnly && !effectedUnitPool.includes(u)) {
            cb(u);
        } else {
            cb(u);
        }
    });

    const destroy = () => {
        if (config?.onDestroy) {
            config?.onDestroy(effectedUnitPool);
        }

        trig.destroy();
    };

    const clearUniqueUnits = () => {
        effectedUnitPool = [];
    };

    return {
        cleanupUnitGetsNearThisUnit: (delay?: number) => {
            if (delay) {
                const timer = Timer.create();
                timer.start(delay, false, () => {
                    destroy();
                    timer.destroy();
                });
                return;
            }

            destroy();
        },
        clearUniqueUnits,
    };
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
