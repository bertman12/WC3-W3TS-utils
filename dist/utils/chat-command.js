"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatCommand = createChatCommand;
const w3ts_1 = require("w3ts");
/**
 * Setup trigger to listen for a chat command for the players specified in the array. Execute function when triggered
 * @param command -cam , -name, -start, etc
 * @param players
 * @param fn
 */
function createChatCommand(players, command, exact, fn) {
    const trigger = w3ts_1.Trigger.create();
    players.forEach((p) => {
        trigger.registerPlayerChatEvent(p, command, exact);
        trigger.addAction(() => {
            const str = GetEventPlayerChatString();
            const [_, data] = str?.split(" ") ?? [];
            fn(p, { trigger, command, data });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NoYXQtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLDhDQWFDO0FBckJELCtCQUEwQztBQUUxQzs7Ozs7R0FLRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLE9BQW9CLEVBQUUsT0FBZSxFQUFFLEtBQWMsRUFBRSxFQUEyRjtJQUNoTCxNQUFNLE9BQU8sR0FBRyxjQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRW5ELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ25CLE1BQU0sR0FBRyxHQUFHLHdCQUF3QixFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV4QyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=