"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnits = createUnits;
exports.refundUnitCost = refundUnitCost;
exports.unitHasAbility = unitHasAbility;
exports.unitsInRange = unitsInRange;
exports.useTempDummyUnit = useTempDummyUnit;
const w3ts_1 = require("w3ts");
const players_1 = require("./players");
function createUnits(quantity, useFood, ...args) {
    const units = [];
    for (let x = 0; x < quantity; x++) {
        const u = w3ts_1.Unit.create(...args);
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
function refundUnitCost(u) {
    const gold = GetUnitGoldCost(u.typeId);
    const wood = GetUnitWoodCost(u.typeId);
    (0, players_1.adjustGold)(u.owner, gold);
    (0, players_1.adjustLumber)(u.owner, wood);
}
/**
 * Returns true if the ALIVE unit has the ability within their first 12 abilities
 * @param unit
 * @param abilityId
 * @returns
 */
function unitHasAbility(unit, abilityId) {
    for (let x = 0; x < 12; x++) {
        const currentAbility = unit.getAbilityByIndex(x);
        if (currentAbility &&
            currentAbility === unit.getAbility(abilityId) &&
            unit.isAlive()) {
            return true;
        }
    }
    return false;
}
function unitsInRange(x, y, radius, cb) {
    const g = w3ts_1.Group.create();
    if (g) {
        g.enumUnitsInRange(x, y, radius, () => {
            const unit = w3ts_1.Unit.fromFilter();
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
function useTempDummyUnit(dummyUnitCode, cb, abilityId, owner, x, y, config) {
    let dummy = undefined;
    dummy = w3ts_1.Unit.create(owner, dummyUnitCode, x, y, config?.facing ?? 0);
    const t = w3ts_1.Timer.create();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdW5pdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQ0FnQkM7QUFNRCx3Q0FLQztBQVFELHdDQWNDO0FBRUQsb0NBa0JDO0FBUUQsNENBNEJDO0FBNUdELCtCQUFxRDtBQUNyRCx1Q0FBcUQ7QUFFckQsU0FBZ0IsV0FBVyxDQUN6QixRQUFnQixFQUNoQixPQUFnQixFQUNoQixHQUFHLElBQW9DO0lBRXZDLE1BQU0sS0FBSyxHQUFXLEVBQUUsQ0FBQztJQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLEdBQUcsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDTixDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixjQUFjLENBQUMsQ0FBTztJQUNwQyxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsSUFBQSxvQkFBVSxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsSUFBQSxzQkFBWSxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLElBQVUsRUFBRSxTQUFpQjtJQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQ0UsY0FBYztZQUNkLGNBQWMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2QsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFnQixZQUFZLENBQzFCLENBQVMsRUFDVCxDQUFTLEVBQ1QsTUFBYyxFQUNkLEVBQXdCO0lBRXhCLE1BQU0sQ0FBQyxHQUFHLFlBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ04sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNwQyxNQUFNLElBQUksR0FBRyxXQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDVCxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixnQkFBZ0IsQ0FDOUIsYUFBcUIsRUFDckIsRUFBeUIsRUFDekIsU0FBaUIsRUFDakIsS0FBZ0IsRUFDaEIsQ0FBUyxFQUNULENBQVMsRUFDVCxNQUEyRTtJQUUzRSxJQUFJLEtBQUssR0FBcUIsU0FBUyxDQUFDO0lBQ3hDLEtBQUssR0FBRyxXQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sQ0FBQyxHQUFHLFlBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUV6QixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ1YsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsa0JBQWtCLENBQ3RCLFNBQVMsRUFDVCxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNsRCxDQUFDLENBQ0YsQ0FBQztRQUNGLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVWLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLGFBQWEsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUM5QyxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQyJ9