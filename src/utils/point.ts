import { Point, Rectangle } from "w3ts";
const MAP_EDGE_BUFFER_DIST = 300;

export function createValidPoint(maxAttempts: number, validatorFn: (p: Point) => {}) {
    const MAX_ATTEMPTS = 65000; // 100 was about 10 seconds; 1000 gets good coverage
    let currentAttempts = 0;
    const worldBounds = Rectangle.fromHandle(GetWorldBounds());
    if (!worldBounds) return;
    const [maxX, maxY] = [GetCameraBoundMaxX(), GetCameraBoundMaxY()];

    while (currentAttempts <= MAX_ATTEMPTS) {
        const dirX = Math.floor(Math.random() * 100) >= 50 ? 1 : -1;
        const dirY = Math.floor(Math.random() * 100) >= 50 ? 1 : -1;

        //multiply dir by the buffer distance from max bounds since we can get a negative number
        const randX = dirX * Math.ceil(Math.random() * maxX) - dirX * MAP_EDGE_BUFFER_DIST;
        const randY = dirY * Math.ceil(Math.random() * maxY) - dirY * MAP_EDGE_BUFFER_DIST;

        const p = Point.create(randX, randY);

        const isValidPoint = validatorFn(p);

        if (isValidPoint) {
            // pointsChosen.push(p);
            return p;
        } else {
            //well add it here later, just testing for now
            currentAttempts++;
        }
    }
}

export function getRandomCoordinatesInCircularArea(relativeX: number, relativeY: number, radius: number) {
    const randomTheta = Math.random() * 360;
    const randomRadius = Math.random() * radius;

    const randomX = relativeX + randomRadius * Cos(randomTheta);
    const randomY = relativeY + randomRadius * Sin(randomTheta);

    return {
        x: randomX,
        y: randomY,
    };
}

export function getRandomCoordinatesOnCircle(relativeX: number, relativeY: number, radius: number) {
    const randomTheta = Math.random() * 360;

    const randomX = relativeX + radius * Cos(randomTheta);
    const randomY = relativeY + radius * Sin(randomTheta);

    return {
        x: randomX,
        y: randomY,
    };
}

/**
 * Returns degrees or radians?
 */
export function getAngleBetweenPoints(x1: number, y1: number, x2: number, y2: number) {
    const locA = Location(x1, y1);
    const locB = Location(x2, y2);

    const angle = AngleBetweenPoints(locA, locB);
    //arc tan
    RemoveLocation(locA);
    RemoveLocation(locB);

    return angle;
}

export function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number) {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    const squaredDist = deltaX * deltaX + deltaY * deltaY;
    // const squaredDist = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
    const dist = Math.sqrt(squaredDist);

    return dist;
}
