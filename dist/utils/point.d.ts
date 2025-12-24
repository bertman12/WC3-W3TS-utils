import { Point } from "w3ts";
export declare function createValidPoint(maxAttempts: number, validatorFn: (p: Point) => {}): Point | undefined;
export declare function getRandomCoordinatesInCircularArea(relativeX: number, relativeY: number, radius: number): {
    x: number;
    y: number;
};
export declare function getRandomCoordinatesOnCircle(relativeX: number, relativeY: number, radius: number): {
    x: number;
    y: number;
};
/**
 * Returns degrees or radians?
 */
export declare function getAngleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
export declare function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
