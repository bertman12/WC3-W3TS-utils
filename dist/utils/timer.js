"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayedTimer = delayedTimer;
const w3ts_1 = require("w3ts");
/**
 * @param duration milliseconds
 */
function delayedTimer(duration, cb) {
    const timer = w3ts_1.Timer.create();
    timer.start(duration, false, () => {
        cb();
        timer.destroy();
    });
    return timer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxvQ0FRQztBQWJELCtCQUE2QjtBQUU3Qjs7R0FFRztBQUNILFNBQWdCLFlBQVksQ0FBQyxRQUFnQixFQUFFLEVBQTJCO0lBQ3RFLE1BQU0sS0FBSyxHQUFHLFlBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsRUFBRSxDQUFDO1FBQ0wsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9