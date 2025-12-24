"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyForce = applyForce;
exports.applyForceForEffect = applyForceForEffect;
// import { WTS_Units } from "src/enums/WTS_Enums";
// import { PlayerIndex } from "src/player/player-data";
const w3ts_1 = require("w3ts");
const globals_1 = require("w3ts/globals");
/**
 * @param angle degrees
 * @param unit
 * @param initialSpeed meters per second
 * @param affectHeight determines whether or not to change unit height whilst force is applied
 */
function applyForce(angle, unit, initialSpeed, config) {
    const timer = w3ts_1.Timer.create();
    const refreshInterval = 0.01;
    const updatesPerSecond = 1 / refreshInterval;
    const frictionConstant = 4800; //meters per second friction decay
    let currentSpeed = initialSpeed;
    let timeElapsed = 0;
    const clickMoveOrder = 851971;
    const moveOrders = [
        851986 /* OrderId.Move */,
        851984 /* OrderId.Attackground */,
        851990 /* OrderId.Patrol */,
        851983 /* OrderId.Attack */,
        clickMoveOrder,
    ];
    let forceDummyUnit = undefined;
    const defaultX = 11800;
    const defaultY = -5700;
    //Cancel unit commands - if a unit already has a move command and are applied a force, they will bug out sometimes and walk in the opposite direction
    // unit.issueImmediateOrder(OrderId.Stop);
    /**
     * Prematurely end the force effect
     */
    function destroyForceEffect(runOnEnd = false) {
        if (runOnEnd && config?.onEnd) {
            config.onEnd();
        }
        ResetUnitAnimation(unit.handle);
        forceDummyUnit?.destroy();
        timer.destroy();
    }
    /**
     * These are the positions the unit would be if there were no minor disturbances
     */
    let theoreticalX = unit.x;
    let theoreticalY = unit.y;
    /**
     * The distance the true unit position can be from the theoretical position. Helps stop sliding against walls, etc.
     */
    // const BREAK_DISTANCE = 100;
    if (!forceDummyUnit) {
        forceDummyUnit = w3ts_1.Unit.create(globals_1.Players[config.dummyUnitPlayerIndex], config.dummyUnitPlayerIndex, defaultX, defaultY);
    }
    // unit.issueImmediateOrder(OrderId.Stop);
    if (config?.animationIndexNumber) {
        ResetUnitAnimation(unit.handle);
        SetUnitAnimationByIndex(unit.handle, config.animationIndexNumber);
    }
    timer.start(refreshInterval, true, () => {
        //If for whatever reason the unit no longer exists.
        if (!unit) {
            destroyForceEffect();
            return destroyForceEffect;
        }
        // if (distanceBetweenPoints(unit.x, unit.y, theoreticalX, theoreticalY) > BREAK_DISTANCE) {
        //     print("unit was to far away from theoretical distance");
        //     const e = Effect.create("Abilities\\Spells\\Other\\TalkToMe\\TalkToMe", theoreticalX, theoreticalY);
        //     e?.setScaleMatrix(2, 2, 2);
        //     unit.issueImmediateOrder(OrderId.Stop);
        //     destroyForceEffect(true);
        //     return;
        // }
        //if the unit's move speed vector is greater than the remaining applied force vector then we may stop the applied force function; should only run while the unit has the move order
        // if (config?.obeyPathing && !config.strictPathing && currentSpeed > unit.moveSpeed) {
        //     unit.issueImmediateOrder(OrderId.Stop);
        // }
        //should probably only do strict pathing so nothing else interfers with the unit moving
        if (forceDummyUnit && config?.strictPathing) {
            const isWindWalked = UnitHasBuffBJ(forceDummyUnit.handle, FourCC("BOwk"));
            if (!isWindWalked) {
                forceDummyUnit.issueImmediateOrder(852129 /* OrderId.Windwalk */);
            }
            // forceDummyUnit.issueImmediateOrder(OrderId.Stop);
            //Move dummy to the position we want the unit to be in
            forceDummyUnit.x = unit.x;
            forceDummyUnit.y = unit.y;
            forceDummyUnit.issueImmediateOrder(851972 /* OrderId.Stop */);
            //flooring values since it can be off sometimes by a thousandth
            if (Math.floor(forceDummyUnit.x) !== Math.floor(unit.x) ||
                Math.floor(forceDummyUnit.y) !== Math.floor(unit.y)) {
                // print(`Collision detected! Dummy x: ${forceDummyUnit.x} y: ${forceDummyUnit.y} Unit x: ${unit.x} y: ${unit.y}`);
                const e = w3ts_1.Effect.create("Abilities\\Spells\\Other\\TalkToMe\\TalkToMe", forceDummyUnit.x, forceDummyUnit.y);
                e?.setScaleMatrix(2, 2, 2);
                destroyForceEffect(true);
                return;
            }
        }
        const xVelocity = (currentSpeed / updatesPerSecond) * Math.cos(Deg2Rad(angle));
        const yVelocity = (currentSpeed / updatesPerSecond) * Math.sin(Deg2Rad(angle));
        //Complete execution when current speed of the initial force has decayed
        if (currentSpeed <= 0) {
            destroyForceEffect(true);
            return;
        }
        //Runs when the force is first applied
        if (config?.onStart && currentSpeed === initialSpeed) {
            config.onStart(currentSpeed, timeElapsed);
        }
        //Runs at any point while the function is executing
        if (config?.whileActive) {
            config.whileActive(currentSpeed, timeElapsed);
        }
        theoreticalX += xVelocity;
        theoreticalY += yVelocity;
        //basically the same thing now since we are no longer issuing the stop command on the unit.
        //also the moment another force is applied to the unit the previous force will stop being applied.
        if (config?.strictPathing) {
            unit.x = theoreticalX;
            unit.y = theoreticalY;
        }
        else {
            unit.x += xVelocity;
            unit.y += yVelocity;
        }
        timeElapsed += refreshInterval;
        if (config?.sustainedForceDuration &&
            timeElapsed <= config.sustainedForceDuration) {
            return;
        }
        currentSpeed -= frictionConstant / updatesPerSecond;
    });
    return { destroyForceEffect };
}
/**
 * @param angle degrees
 * @param effect
 * @param initialSpeed meters per second
 * @param affectHeight determines whether or not to change unit height whilst force is applied
 */
function applyForceForEffect(angle, effect, initialSpeed, config) {
    const timer = w3ts_1.Timer.create();
    const refreshInterval = 0.01;
    const updatesPerSecond = 1 / refreshInterval;
    const frictionConstant = 1200; //meters per second friction decay
    let currentSpeed = initialSpeed;
    let timeElapsed = 0;
    //Cancel unit commands - if a unit already has a move command and are applied a force, they will bug out sometimes and walk in the opposite direction
    timer.start(refreshInterval, true, () => {
        //if the unit's move speed vector is greater than the remaining applied force vector then we may stop the applied force function; should only run while the unit has the move order
        const xVelocity = (currentSpeed / updatesPerSecond) * Math.cos(Deg2Rad(angle));
        const yVelocity = (currentSpeed / updatesPerSecond) * Math.sin(Deg2Rad(angle));
        //On end hook runs before the timer is destroyed and the function ends
        if (config?.onEnd && currentSpeed <= 0) {
            config.onEnd(currentSpeed, timeElapsed);
        }
        //Complete execution when current speed of the initial force has decayed
        if (currentSpeed <= 0) {
            timer.destroy();
            return;
        }
        //Runs when the force is first applied
        if (config?.onStart && currentSpeed === initialSpeed) {
            config.onStart(currentSpeed, timeElapsed);
        }
        //Runs at any point while the function is executing
        if (config?.whileActive) {
            config.whileActive(currentSpeed, timeElapsed);
        }
        effect.x += xVelocity;
        effect.y += yVelocity;
        timeElapsed += refreshInterval;
        if (config?.sustainedForceDuration &&
            timeElapsed <= config.sustainedForceDuration) {
            return;
        }
        currentSpeed -= frictionConstant / updatesPerSecond;
    });
    function destroyForceEffect() {
        timer.destroy();
    }
    return { destroyForceEffect };
}
// const unitIsMovingVector_x = (unit.moveSpeed / updatesPerSecond) * Math.cos(Deg2Rad(unit.facing));
// const unitIsMovingVector_y = (unit.moveSpeed / updatesPerSecond) * Math.sin(Deg2Rad(unit.facing));
// if ((moveOrders.includes(unit.currentOrder) && unitIsMovingVector_x > xVelocity) || unitIsMovingVector_y > yVelocity) {
//     print("moving velocity exceeded applied force velocity");
//     timer.destroy();
//     return;
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGh5c2ljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9waHlzaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNENBLGdDQTBLQztBQVFELGtEQStEQztBQTdSRCxtREFBbUQ7QUFDbkQsd0RBQXdEO0FBQ3hELCtCQUEyQztBQUMzQywwQ0FBZ0Q7QUFtQ2hEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsVUFBVSxDQUN4QixLQUFhLEVBQ2IsSUFBVSxFQUNWLFlBQW9CLEVBQ3BCLE1BQXdCO0lBRXhCLE1BQU0sS0FBSyxHQUFHLFlBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsa0NBQWtDO0lBQ2pFLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNoQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFcEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDO0lBQzlCLE1BQU0sVUFBVSxHQUFHOzs7OztRQUtqQixjQUFjO0tBQ2YsQ0FBQztJQUVGLElBQUksY0FBYyxHQUFxQixTQUFTLENBQUM7SUFDakQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXZCLHFKQUFxSjtJQUNySiwwQ0FBMEM7SUFFMUM7O09BRUc7SUFDSCxTQUFTLGtCQUFrQixDQUFDLFdBQW9CLEtBQUs7UUFDbkQsSUFBSSxRQUFRLElBQUksTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBRUQsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FB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