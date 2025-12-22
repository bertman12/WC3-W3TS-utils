// import { WTS_Units } from "src/enums/WTS_Enums";
// import { PlayerIndex } from "src/player/player-data";
import { Effect, Timer, Unit } from "w3ts";
import { OrderId, Players } from "w3ts/globals";

interface ApplyForceConfig {
  /**
   * Default: 0
   */
  sustainedForceDuration?: number;
  /**
   * Default: -2400 units per second
   */
  frictionConstant?: number;
  /**
   * The unit will not phase through unpathable areas
   */
  obeyPathing?: boolean;
  whileActive?: (currentSpeed?: number, timeElapsed?: number) => void;
  onStart?: (currentSpeed?: number, timeElapsed?: number) => void;
  onEnd?: (currentSpeed?: number, timeElapsed?: number) => void;
  /**
   *
   */
  targetSpeed?: number;
  /**
   * In seconds
   */
  accelerationTime?: number;
  /**
   * This will be used to decide if the unit the force is applied on is allowed to deviate from their current path.
   */
  strictPathing?: boolean;
  animationIndexNumber?: number;
  dummyUnitPlayerIndex: number;
  dummyUnitFourCC: number;
}

/**
 * @param angle degrees
 * @param unit
 * @param initialSpeed meters per second
 * @param affectHeight determines whether or not to change unit height whilst force is applied
 */
export function applyForce(
  angle: number,
  unit: Unit,
  initialSpeed: number,
  config: ApplyForceConfig
) {
  const timer = Timer.create();
  const refreshInterval = 0.01;
  const updatesPerSecond = 1 / refreshInterval;
  const frictionConstant = 4800; //meters per second friction decay
  let currentSpeed = initialSpeed;
  let timeElapsed = 0;

  const clickMoveOrder = 851971;
  const moveOrders = [
    OrderId.Move,
    OrderId.Attackground,
    OrderId.Patrol,
    OrderId.Attack,
    clickMoveOrder,
  ];

  let forceDummyUnit: Unit | undefined = undefined;
  const defaultX = 11800;
  const defaultY = -5700;

  //Cancel unit commands - if a unit already has a move command and are applied a force, they will bug out sometimes and walk in the opposite direction
  // unit.issueImmediateOrder(OrderId.Stop);

  /**
   * Prematurely end the force effect
   */
  function destroyForceEffect(runOnEnd: boolean = false) {
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
    forceDummyUnit = Unit.create(
      Players[config.dummyUnitPlayerIndex],
      config.dummyUnitPlayerIndex,
      defaultX,
      defaultY
    );
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
        forceDummyUnit.issueImmediateOrder(OrderId.Windwalk);
      }
      // forceDummyUnit.issueImmediateOrder(OrderId.Stop);

      //Move dummy to the position we want the unit to be in
      forceDummyUnit.x = unit.x;
      forceDummyUnit.y = unit.y;

      forceDummyUnit.issueImmediateOrder(OrderId.Stop);

      //flooring values since it can be off sometimes by a thousandth
      if (
        Math.floor(forceDummyUnit.x) !== Math.floor(unit.x) ||
        Math.floor(forceDummyUnit.y) !== Math.floor(unit.y)
      ) {
        // print(`Collision detected! Dummy x: ${forceDummyUnit.x} y: ${forceDummyUnit.y} Unit x: ${unit.x} y: ${unit.y}`);
        const e = Effect.create(
          "Abilities\\Spells\\Other\\TalkToMe\\TalkToMe",
          forceDummyUnit.x,
          forceDummyUnit.y
        );
        e?.setScaleMatrix(2, 2, 2);
        destroyForceEffect(true);
        return;
      }
    }

    const xVelocity =
      (currentSpeed / updatesPerSecond) * Math.cos(Deg2Rad(angle));
    const yVelocity =
      (currentSpeed / updatesPerSecond) * Math.sin(Deg2Rad(angle));

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
    } else {
      unit.x += xVelocity;
      unit.y += yVelocity;
    }

    timeElapsed += refreshInterval;

    if (
      config?.sustainedForceDuration &&
      timeElapsed <= config.sustainedForceDuration
    ) {
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
export function applyForceForEffect(
  angle: number,
  effect: Effect,
  initialSpeed: number,
  config?: ApplyForceConfig
) {
  const timer = Timer.create();
  const refreshInterval = 0.01;
  const updatesPerSecond = 1 / refreshInterval;
  const frictionConstant = 1200; //meters per second friction decay
  let currentSpeed = initialSpeed;
  let timeElapsed = 0;

  //Cancel unit commands - if a unit already has a move command and are applied a force, they will bug out sometimes and walk in the opposite direction

  timer.start(refreshInterval, true, () => {
    //if the unit's move speed vector is greater than the remaining applied force vector then we may stop the applied force function; should only run while the unit has the move order
    const xVelocity =
      (currentSpeed / updatesPerSecond) * Math.cos(Deg2Rad(angle));
    const yVelocity =
      (currentSpeed / updatesPerSecond) * Math.sin(Deg2Rad(angle));

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

    if (
      config?.sustainedForceDuration &&
      timeElapsed <= config.sustainedForceDuration
    ) {
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
