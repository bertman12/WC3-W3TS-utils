import { MapPlayer, Trigger } from "w3ts";

/**
 * Setup trigger to listen for a chat command for the players specified in the array. Execute function when triggered
 * @param command -cam , -name, -start, etc
 * @param players
 * @param fn
 */
export function createChatCommand(players: MapPlayer[], command: string, exact: boolean, fn: (player: MapPlayer, data: { trigger: Trigger; command: string; data?: string }) => void) {
    const trigger = Trigger.create();

    players.forEach((p) => {
        trigger.registerPlayerChatEvent(p, command, exact);

        trigger.addAction(() => {
            const str = GetEventPlayerChatString();
            const [_, data] = str?.split(" ") ?? [];

            fn(p, { trigger, command, data });
        });
    });
}
