"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceBetweenCoords = distanceBetweenCoords;
/**
 * @deprecated
 * @param a
 * @param b
 * @returns
 */
function distanceBetweenCoords(a, b) {
    const deltaX = a.x - b.x;
    const deltaY = a.y - b.y;
    const squaredDist = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
    const dist = Math.sqrt(squaredDist);
    return dist;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsc0RBT0M7QUFiRDs7Ozs7R0FLRztBQUNILFNBQWdCLHFCQUFxQixDQUFDLENBQTJCLEVBQUUsQ0FBMkI7SUFDMUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXBDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==