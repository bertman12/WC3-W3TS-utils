"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidPoint = createValidPoint;
exports.getRandomCoordinatesInCircularArea = getRandomCoordinatesInCircularArea;
exports.getRandomCoordinatesOnCircle = getRandomCoordinatesOnCircle;
exports.getAngleBetweenPoints = getAngleBetweenPoints;
exports.distanceBetweenPoints = distanceBetweenPoints;
const w3ts_1 = require("w3ts");
const MAP_EDGE_BUFFER_DIST = 300;
function createValidPoint(maxAttempts, validatorFn) {
    const MAX_ATTEMPTS = 65000; // 100 was about 10 seconds; 1000 gets good coverage
    let currentAttempts = 0;
    const worldBounds = w3ts_1.Rectangle.fromHandle(GetWorldBounds());
    if (!worldBounds)
        return;
    const [maxX, maxY] = [GetCameraBoundMaxX(), GetCameraBoundMaxY()];
    while (currentAttempts <= MAX_ATTEMPTS) {
        const dirX = Math.floor(Math.random() * 100) >= 50 ? 1 : -1;
        const dirY = Math.floor(Math.random() * 100) >= 50 ? 1 : -1;
        //multiply dir by the buffer distance from max bounds since we can get a negative number
        const randX = dirX * Math.ceil(Math.random() * maxX) - dirX * MAP_EDGE_BUFFER_DIST;
        const randY = dirY * Math.ceil(Math.random() * maxY) - dirY * MAP_EDGE_BUFFER_DIST;
        const p = w3ts_1.Point.create(randX, randY);
        const isValidPoint = validatorFn(p);
        if (isValidPoint) {
            // pointsChosen.push(p);
            return p;
        }
        else {
            //well add it here later, just testing for now
            currentAttempts++;
        }
    }
}
function getRandomCoordinatesInCircularArea(relativeX, relativeY, radius) {
    const randomTheta = Math.random() * 360;
    const randomRadius = Math.random() * radius;
    const randomX = relativeX + randomRadius * Cos(randomTheta);
    const randomY = relativeY + randomRadius * Sin(randomTheta);
    return {
        x: randomX,
        y: randomY,
    };
}
function getRandomCoordinatesOnCircle(relativeX, relativeY, radius) {
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
function getAngleBetweenPoints(x1, y1, x2, y2) {
    const locA = Location(x1, y1);
    const locB = Location(x2, y2);
    const angle = AngleBetweenPoints(locA, locB);
    //arc tan
    RemoveLocation(locA);
    RemoveLocation(locB);
    return angle;
}
function distanceBetweenPoints(x1, y1, x2, y2) {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    const squaredDist = deltaX * deltaX + deltaY * deltaY;
    // const squaredDist = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
    const dist = Math.sqrt(squaredDist);
    return dist;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw0Q0EyQkM7QUFFRCxnRkFXQztBQUVELG9FQVVDO0FBS0Qsc0RBVUM7QUFFRCxzREFRQztBQWhGRCwrQkFBd0M7QUFDeEMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFFakMsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBbUIsRUFBRSxXQUE2QjtJQUMvRSxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxvREFBb0Q7SUFDaEYsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBQ3pCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUVsRSxPQUFPLGVBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVELHdGQUF3RjtRQUN4RixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdB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