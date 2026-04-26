// -- returns the local current main selected unit, using it in a sync gamestate relevant manner breaks the game.

import { Frame } from "w3ts";

/**
 * InitTasyenGetMainSelectedUnit must be called before this function can be used.
 */
export function GetMainSelectedUnitEx() {
    const unitIndex = GetSelectedUnitIndex();
    if (!unitIndex) {
        return;
    }

    const mainSelect = GetMainSelectedUnit(unitIndex);

    return mainSelect;
}

/**
 * Container Frame
 */
let unitButtonFramesContainer: framehandle | undefined = undefined;
const unitButtonFrames: framehandle[] = [];

let group: group | undefined;
let units: unit[] = [];

const filter = Filter(function () {
    let unit = GetFilterUnit();
    if (!unit) {
        return false;
    }

    const prio = BlzGetUnitRealField(unit, UNIT_RF_PRIORITY);
    let found = false;

    // -- compare the current unit with allready found, to place it in the right slot
    for (let x = 0; x < units.length; x++) {
        const value = units[x];

        // -- higher prio than this take it's slot
        if (BlzGetUnitRealField(value, UNIT_RF_PRIORITY) < prio) {
            units.splice(x, 1, unit, value);
            found = true;

            break;
        }
        // -- equal prio and better colisions Value
        else if (BlzGetUnitRealField(value, UNIT_RF_PRIORITY) == prio && GetUnitOrderValue(value) > GetUnitOrderValue(unit)) {
            units.splice(x, 1, unit, value);

            found = true;
            break;
        }
    }

    // -- not found add it at the end
    if (!found) {
        units.push(unit);
    }

    unit = undefined;
    return false;
});

function GetSelectedUnitIndex() {
    // -- local player is in group selection?
    if (unitButtonFramesContainer && BlzFrameIsVisible(unitButtonFramesContainer)) {
        // -- find the first visible yellow Background Frame
        for (let int = 0; int < unitButtonFrames.length; int++) {
            if (BlzFrameIsVisible(unitButtonFrames[int])) {
                return int;
            }
        }
    }

    return undefined;
}

function GetUnitOrderValue(unit: unit) {
    // --heroes use the handleId
    if (IsUnitType(unit, UNIT_TYPE_HERO)) {
        return GetHandleId(unit);
    } else {
        // --units use unitCode
        return GetUnitTypeId(unit);
    }
}

function GetMainSelectedUnit(index: number): unit | undefined {
    if (group === undefined) {
        return;
    }

    if (index !== undefined) {
        GroupEnumUnitsSelected(group, GetLocalPlayer(), filter);
        const unit = units[index];

        units = [];

        return unit;
    } else {
        GroupEnumUnitsSelected(group, GetLocalPlayer(), undefined);
        return FirstOfGroup(group);
    }
}

/**
 * Must run immediately at game start.
 */
export function InitTasyenGetMainSelectedUnit() {
    const console = Frame.fromHandle(BlzGetFrameByName("ConsoleUI", 0));
    if (!console) {
        return;
    }

    const bottomUI = console.getChild(1);
    if (!bottomUI) {
        return;
    }

    const unitInfoDisplayArea = bottomUI.getChild(2);
    if (!unitInfoDisplayArea) {
        return;
    }

    const groupframe = unitInfoDisplayArea.getChild(5);
    if (!groupframe) {
        return;
    }

    unitButtonFramesContainer = BlzFrameGetChild(groupframe.handle, 0);
    if (!unitButtonFramesContainer) {
        return;
    }

    group = CreateGroup();

    // -- give this frames a handleId
    for (let int = 0; int < BlzFrameGetChildrenCount(unitButtonFramesContainer); int++) {
        const buttonContainer = BlzFrameGetChild(unitButtonFramesContainer, int);
        if (!buttonContainer) {
            return;
        }

        unitButtonFrames[int] = BlzFrameGetChild(buttonContainer, 0) as framehandle;
    }
}
