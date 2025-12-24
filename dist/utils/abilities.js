"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitGetsNearThisUnit = unitGetsNearThisUnit;
exports.onUnitAttacked = onUnitAttacked;
const w3ts_1 = require("w3ts");
/**
 * Good for once a unit gets near you, but not good while they are near you since the event is only triggered on entry, not during
 * @param unit
 * @param range
 * @param cb
 * @param config
 * @returns
 */
function unitGetsNearThisUnit(unit, range, cb, config) {
    const trig = w3ts_1.Trigger.create();
    /**
     * A unique set of the units effected
     */
    let effectedUnitPool = [];
    trig.registerUnitInRage(unit.handle, range, config?.filter ?? (() => true));
    trig.addAction(() => {
        const u = w3ts_1.Unit.fromEvent();
        if (!u) {
            return;
        }
        if (!effectedUnitPool.includes(u)) {
            effectedUnitPool.push(u);
        }
        if (config?.uniqueUnitsOnly && !effectedUnitPool.includes(u)) {
            cb(u);
        }
        else {
            cb(u);
        }
    });
    const destroy = () => {
        if (config?.onDestroy) {
            config?.onDestroy(effectedUnitPool);
        }
        // print("destroying the trigger!");
        trig.destroy();
        // print("The trigger ref: ", trig);
    };
    const clearUniqueUnits = () => {
        effectedUnitPool = [];
    };
    return {
        cleanupUnitGetsNearThisUnit: (delay) => {
            if (delay) {
                const timer = w3ts_1.Timer.create();
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
 *
 * @param cb
 * @param abilityId
 * @param dummyLifeTime Maybe be necessary to have a long lifetime so spells like chain lightning will have time to bounce to all targets
 * @param owner
 */
// export function useTempDummyUnit(cb: (dummy: Unit) => void, abilityId: number, dummyLifeTime: number, owner: MapPlayer, x: number, y: number, facing: number, config?: { abilityLevel?: number; modelType?: "cenariusGhost" }) {
//     let dummy: Unit | undefined = undefined;
//     if (config?.modelType === "cenariusGhost") {
//         dummy = Unit.create(owner, UNITS.dummyCaster_cenariusGhost, x, y, facing);
//         dummy?.setScale(1, 1, 1);
//     } else {
//         dummy = Unit.create(owner, UNITS.dummyCaster, x, y, facing);
//     }
//     const t = Timer.create();
//     if (dummy) {
//         dummy.addAbility(abilityId);
//         dummy.setAbilityManaCost(abilityId, config?.abilityLevel ? config.abilityLevel - 1 : 0, 0);
//         cb(dummy);
//         t.start(dummyLifeTime, false, () => {
//             dummy?.destroy();
//             t.destroy();
//         });
//     }
// }
/**
 * Creates a trigger to monitor when a unit is attacked
 *
 * We could also have all functions execute in this single trigger's context instead of creating new triggers each time the function is used.
 * @param cb
 * @param config
 */
function onUnitAttacked(cb, config) {
    const attackerTriggerCooldown = new Set();
    const t = w3ts_1.Trigger.create();
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);
    t.addAction(() => {
        const attacker = w3ts_1.Unit.fromHandle(GetAttacker());
        const victim = w3ts_1.Unit.fromHandle(GetAttackedUnitBJ());
        if (!attacker || !victim) {
            return;
        }
        //Attack was not below the proc chance, and thus we will not use the cb function
        if (config.procChance &&
            Math.ceil(Math.random() * 100) >= config.procChance) {
            return;
        }
        //Attacker has already used the trigger
        if (config.attackerCooldown && attackerTriggerCooldown.has(attacker)) {
            return;
        }
        attackerTriggerCooldown.add(attacker);
        //Finally, after all conditions have been met, use the cb function
        cb(attacker, victim);
        const t = w3ts_1.Timer.create();
        //removes the attacker from the cooldown group after 1/3 of that units attack cooldown has passed.
        t.start(attacker.getAttackCooldown(0) / 3, false, () => {
            attackerTriggerCooldown.delete(attacker);
            t.destroy();
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2FiaWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLG9EQWtFQztBQXdDRCx3Q0EyQ0M7QUFoS0QsK0JBQTRDO0FBRzVDOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixvQkFBb0IsQ0FDbEMsSUFBVSxFQUNWLEtBQWEsRUFDYixFQUFxQixFQUNyQixNQUlDO0lBRUQsTUFBTSxJQUFJLEdBQUcsY0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTlCOztPQUVHO0lBQ0gsSUFBSSxnQkFBZ0IsR0FBVyxFQUFFLENBQUM7SUFFbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTVFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDUCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksTUFBTSxFQUFFLGVBQWUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7YUFBTSxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxPQUFPLEdBQUcsR0FBRyxF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