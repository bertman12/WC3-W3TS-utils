/**
 * @deprecated
 * @param a
 * @param b
 * @returns
 */
export function distanceBetweenCoords(a: { x: number; y: number }, b: { x: number; y: number }) {
    const deltaX = a.x - b.x;
    const deltaY = a.y - b.y;
    const squaredDist = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
    const dist = Math.sqrt(squaredDist);

    return dist;
}
