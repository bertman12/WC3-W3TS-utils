import { Effect, Unit } from "w3ts";
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
export declare function applyForce(angle: number, unit: Unit, initialSpeed: number, config: ApplyForceConfig): {
    destroyForceEffect: (runOnEnd?: boolean) => void;
};
/**
 * @param angle degrees
 * @param effect
 * @param initialSpeed meters per second
 * @param affectHeight determines whether or not to change unit height whilst force is applied
 */
export declare function applyForceForEffect(angle: number, effect: Effect, initialSpeed: number, config?: ApplyForceConfig): {
    destroyForceEffect: () => void;
};
export {};
