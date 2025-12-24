"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachUnitOfPlayerWithAbility = forEachUnitOfPlayerWithAbility;
exports.forEachAlliedPlayer = forEachAlliedPlayer;
exports.forEachPlayer = forEachPlayer;
exports.forEachUnitTypeOfPlayer = forEachUnitTypeOfPlayer;
exports.forEachUnitOfType = forEachUnitOfType;
exports.forEachUnitOfPlayer = forEachUnitOfPlayer;
exports.forEachUnitInRectangle = forEachUnitInRectangle;
exports.isPlaying = isPlaying;
exports.isUser = isUser;
exports.isComputer = isComputer;
exports.isPlayingUser = isPlayingUser;
exports.adjustPlayerState = adjustPlayerState;
exports.adjustGold = adjustGold;
exports.adjustLumber = adjustLumber;
exports.adjustFoodCap = adjustFoodCap;
exports.adjustFoodUsed = adjustFoodUsed;
exports.playerHasResources = playerHasResources;
exports.setPlayerName = setPlayerName;
const w3ts_1 = require("w3ts");
const globals_1 = require("w3ts/globals");
/**
 * Does a callback for every unit of the player that has the ability
 * @param player
 * @param abilityId
 * @param cb
 */
function forEachUnitOfPlayerWithAbility(player, abilityId, cb) {
    forEachUnitOfPlayer(player, (u) => {
        for (let x = 0; x < 12; x++) {
            const currentAbility = u.getAbilityByIndex(x);
            if (currentAbility && currentAbility === u.getAbility(abilityId) && u.isAlive()) {
                cb(u);
            }
        }
    });
}
/**
 * Calls a function for each player playing and is an ally of red.
 * @warning specific to map
 */
function forEachAlliedPlayer(cb) {
    globals_1.Players.forEach((player, index) => {
        //For testing purposes, include player[9] (the human ally) so their units can also be included when iterating the units OR i should make a separate function for all units.
        if (player.slotState === PLAYER_SLOT_STATE_PLAYING && player.isPlayerAlly(globals_1.Players[0]) && player != globals_1.Players[25] && player != globals_1.Players[27]) {
            cb(player, index);
        }
    });
}
function forEachPlayer(cb) {
    globals_1.Players.forEach((p, index) => {
        cb(p, index);
    });
}
/**
 * Executes the callback function for each unit matching the unit type for the player
 * @param unitType Unit Type Id or the Unit Type String "hcas", etc
 */
function forEachUnitTypeOfPlayer(unitType, player, cb) {
    if (typeof unitType === "string") {
        unitType = FourCC(unitType);
    }
    const g = w3ts_1.Group.create();
    g?.enumUnitsOfPlayer(player, () => {
        const unit = w3ts_1.Group.getFilterUnit();
        if (unit && unit?.typeId === unitType) {
            cb(unit);
        }
        return true;
    });
    g?.destroy();
}
/**
 * Doesn;'t appear to actually work?
 * @broken
 * @param unitName
 * @param unitType
 * @param fn
 */
function forEachUnitOfType(unitName, unitType, fn) {
    if (typeof unitType === "string") {
        unitType = FourCC(unitType);
    }
    print(unitName);
    const g = w3ts_1.Group.create();
    g?.enumUnitsOfType(unitName, () => {
        const unit = w3ts_1.Group.getFilterUnit();
        if (unit && unit?.typeId === unitType) {
            fn(unit);
        }
        return true;
    });
    print(`Total units of name ${unitName} found: ${g?.size}`);
    g?.destroy();
}
/**
 * @param unitType Unit Type Id or the Unit Type String "hcas", etc
 */
function forEachUnitOfPlayer(player, cb) {
    const g = w3ts_1.Group.create();
    g?.enumUnitsOfPlayer(player, () => {
        const unit = w3ts_1.Group.getFilterUnit();
        if (!unit) {
            print("Enumerating over a unit that doesn't exist!");
        }
        if (unit) {
            cb(unit);
        }
        return true;
    });
    g?.destroy();
}
/**
 * Executes the callback function for each unit matching the unit type for the player
 * @param unitType Unit Type Id or the Unit Type String "hcas", etc
 */
function forEachUnitInRectangle(rectangle, cb) {
    const g = w3ts_1.Group.create();
    g?.enumUnitsInRect(rectangle, () => {
        const unit = w3ts_1.Group.getFilterUnit();
        if (unit) {
            cb(unit);
        }
        return true;
    });
    g?.destroy();
}
function isPlaying(player) {
    if (player instanceof w3ts_1.MapPlayer) {
        return player.slotState === PLAYER_SLOT_STATE_PLAYING;
    }
    return GetPlayerSlotState(player) === PLAYER_SLOT_STATE_PLAYING;
}
function isUser(player) {
    if (player instanceof w3ts_1.MapPlayer) {
        return GetPlayerController(player.handle) === MAP_CONTROL_USER;
    }
    return GetPlayerController(player) === MAP_CONTROL_USER;
}
function isComputer(player) {
    if (player instanceof w3ts_1.MapPlayer) {
        return GetPlayerController(player.handle) === MAP_CONTROL_COMPUTER;
    }
    return GetPlayerController(player) === MAP_CONTROL_COMPUTER;
}
function isPlayingUser(player) {
    return isUser(player) && isPlaying(player);
}
function adjustPlayerState(player, whichState, amount) {
    player.setState(whichState, player.getState(whichState) + amount);
}
function adjustGold(player, amount) {
    player.setState(PLAYER_STATE_RESOURCE_GOLD, player.getState(PLAYER_STATE_RESOURCE_GOLD) + amount);
}
function adjustLumber(player, amount) {
    player.setState(PLAYER_STATE_RESOURCE_LUMBER, player.getState(PLAYER_STATE_RESOURCE_LUMBER) + amount);
}
function adjustFoodCap(player, amount) {
    player.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, player.getState(PLAYER_STATE_RESOURCE_FOOD_CAP) + amount);
}
function adjustFoodUsed(player, amount) {
    player.setState(PLAYER_STATE_RESOURCE_FOOD_USED, player.getState(PLAYER_STATE_RESOURCE_FOOD_USED) + amount);
}
function playerHasResources(player, data) {
    let hasGold = true;
    let hasLumber = true;
    if (data.gold && data.gold != 0) {
        hasGold = player.getState(PLAYER_STATE_RESOURCE_GOLD) >= data.gold;
    }
    if (data.lumber && data.lumber != 0) {
        hasLumber = player.getState(PLAYER_STATE_RESOURCE_LUMBER) >= data.lumber;
    }
    return hasGold && hasLumber;
}
function setPlayerName() {
    const t = w3ts_1.Trigger.create();
    forEachPlayer((p) => {
        t.registerPlayerChatEvent(p, "-playername ", false);
        t.addAction(() => {
            const str = GetEventPlayerChatString();
            const newName = str?.replace("-playername", "");
            if (newName) {
                SetPlayerName(p.handle, newName);
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9wbGF5ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0Esd0VBVUM7QUFNRCxrREFPQztBQUVELHNDQUlDO0FBTUQsMERBa0JDO0FBU0QsOENBc0JDO0FBS0Qsa0RBaUJDO0FBTUQsd0RBY0M7QUFFRCw4QkFNQztBQUVELHdCQU1DO0FBRUQsZ0NBTUM7QUFFRCxzQ0FFQztBQUVELDhDQUVDO0FBRUQsZ0NBRUM7QUFFRCxvQ0FFQztBQUVELHNDQUVDO0FBRUQsd0NBRUM7QUFFRCxnREFhQztBQUVELHNDQWFDO0FBck5ELCtCQUFrRTtBQUNsRSwwQ0FBdUM7QUFFdkM7Ozs7O0dBS0c7QUFDSCxTQUFnQiw4QkFBOEIsQ0FBQyxNQUFpQixFQUFFLFNBQWlCLEVBQUUsRUFBd0I7SUFDekcsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QyxJQUFJLGNBQWMsSUFBSSxjQUFjLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDOUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixtQkFBbUIsQ0FBQyxFQUE4QztJQUM5RSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM5QiwyS0FBMks7UUFDM0ssSUFBSSxNQUFNLENBQUMs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