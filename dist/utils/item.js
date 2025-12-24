"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitHasItem = unitHasItem;
exports.trig_itemRecipeSystem = trig_itemRecipeSystem;
const w3ts_1 = require("w3ts");
const misc_1 = require("./misc");
/**
 * Checks if the unit has an item in their item slots
 * @param u
 * @param itemTypeId
 * @returns
 */
function unitHasItem(u, itemTypeId) {
    for (let x = 0; x < 6; x++) {
        if (u.getItemInSlot(x)?.typeId === itemTypeId) {
            return true;
        }
    }
    return false;
}
// Player should pick up recipes when needed. if they are missing items then the recipe cost is refunded
function trig_itemRecipeSystem() {
    //takes a set of items
    //unit or unit clicks
    const t = w3ts_1.Trigger.create();
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM);
    t.addAction(() => {
        const recipeItem = w3ts_1.Item.fromEvent();
        const unit = w3ts_1.Unit.fromHandle(GetTriggerUnit());
        if (!unit || !recipeItem) {
            return;
        }
        //for every item they have, if any has the word recipe, then we check to see if they have the items needed to satisfy the recipe
        for (let x = 0; x < 6; x++) {
            const currItem = unit?.getItemInSlot(x);
            if (currItem?.name.toLowerCase().includes("recipe")) {
                checkItemRecipeRequirements(unit, currItem);
            }
        }
    });
}
function checkItemRecipeRequirements(unit, recipeItem) {
    if (recipeItem.name.toLowerCase().includes("recipe")) {
        let requiredItems = null;
        let itemToCreateId = null;
        for (const [key, value] of itemRecipesMap.entries()) {
            if (key.recipeId === recipeItem.typeId) {
                requiredItems = value;
                itemToCreateId = key.itemId;
            }
        }
        if (!requiredItems) {
            print("Missing required items data for the recipe ", recipeItem.name);
            return;
        }
        /**
         * unique list of item types and their quantity and charges that we found on the unit
         */
        const matchingItems = [];
        //Loop through the units item slots
        for (let x = 0; x < 6; x++) {
            const currItem = unit?.getItemInSlot(x);
            //Check that the current item matches at least one of the item types in the requirement list
            if (currItem && requiredItems.some((req) => req.itemTypeId === currItem.typeId)) {
                const alreadyStoredItemIndex = matchingItems.findIndex((itemReq) => itemReq.itemTypeId === currItem.typeId);
                //If we already came across this item in the unit inventory then increment the quantity
                if (alreadyStoredItemIndex && matchingItems[alreadyStoredItemIndex]) {
                    matchingItems[alreadyStoredItemIndex].quantity++;
                }
                //otherwise it is our first match with this item type, so add it to our array of matching items
                else {
                    matchingItems.push({ itemTypeId: currItem.typeId, quantity: 1, charges: 0 });
                }
            }
        }
        //Check that every item required is found in the units inventory satisfies the quantity requirement for the recipe
        const satisfiesRecipe = requiredItems.every((reqItemData) => {
            const matching = matchingItems?.find((matchingItemData) => matchingItemData.itemTypeId === reqItemData.itemTypeId);
            if (matching) {
                return matching.quantity >= reqItemData.quantity;
            }
            return false;
        }) && matchingItems.length > 0;
        if (!itemToCreateId) {
            print("Missing the item type id of the item to create for this recipe: ", recipeItem.name);
        }
        //destroys more items than it needds to
        if (satisfiesRecipe && itemToCreateId) {
            //add the item
            requiredItems.forEach((req) => {
                for (let x = 0; x < req.quantity; x++) {
                    for (let x = 0; x < 6; x++) {
                        const currItem = unit?.getItemInSlot(x);
                        if (currItem?.typeId === req.itemTypeId) {
                            currItem?.destroy();
                            break;
                        }
                    }
                }
            });
            recipeItem.destroy();
            unit.addItemById(itemToCreateId);
            (0, misc_1.useTempEffect)(w3ts_1.Effect.create("Abilities\\Spells\\Other\\Monsoon\\MonsoonBoltTarget.mdl", unit.x, unit.y));
            const clap = w3ts_1.Effect.create("Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl", unit.x, unit.y);
            clap?.setScaleMatrix(0.5, 0.5, 0.5);
            (0, misc_1.useTempEffect)(clap);
        }
        if (!satisfiesRecipe) {
            //refund the gold
            (0, misc_1.notifyPlayer)(`Missing recipe requirements for: ${recipeItem.name}.`);
        }
        //use if or rf to store item gold cost in the world editor
    }
}
const itemRecipesMap = new Map([
// [
//     { recipeId: ITEMS.recipe_blinkTreads, itemId: ITEMS.blinkTreads },
//     [
//         { itemTypeId: ITEMS.bootsOfSpeed, quantity: 1, charges: 0 }, //
//         { itemTypeId: ITEMS.blinkDagger, quantity: 1, charges: 0 }, //
//     ],
// ],
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0Esa0NBUUM7QUFHRCxzREFzQkM7QUExQ0QsK0JBQW1EO0FBQ25ELGlDQUFxRDtBQUVyRDs7Ozs7R0FLRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxDQUFPLEVBQUUsVUFBa0I7SUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDNUMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsd0dBQXdHO0FBQ3hHLFNBQWdCLHFCQUFxQjtJQUNqQyxzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLE1BQU0sQ0FBQyxHQUFHLGNBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUUzQixDQUFDLENBQUMsb0JBQW9CLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sVUFBVSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxXQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87UUFDWCxDQUFDO1FBRUQsZ0lBQWdJO1FBQ2hJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QixNQUFNLFFBQVEsR0FBRyxJQUFJ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