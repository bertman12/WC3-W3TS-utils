"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFloatingTextTagOnUnit = createFloatingTextTagOnUnit;
exports.createPermanentTextTagOnPoint = createPermanentTextTagOnPoint;
exports.setup_createTextForSpellCast = setup_createTextForSpellCast;
const w3ts_1 = require("w3ts");
const misc_1 = require("./misc");
const timer_1 = require("./timer");
/**
 * https://www.hiveworkshop.com/threads/floating-text.149719/
 *
 * function CreateFloatingText takes string text, real x, real y, real heightOffset, real duration, real size returns nothing
    local texttag tt = CreateTextTag()
    call SetTextTagText(tt, text, size)
    call SetTextTagPos(tt, x, y, heightOffset)
    call SetTextTagColor(tt, 255, 255, 255, 255) // RGBA format
    call SetTextTagVisibility(tt, true)
    call SetTextTagLifespan(tt, duration)
    call SetTextTagPermanent(tt, false)
endfunction

function ExampleUsage takes nothing returns nothing
    call CreateFloatingText("Hello World", 0.0, 0.0, 25.0, 5.0, 10.0)
endfunction
 * @param unit
 * @param text
 * @param duration
 */
function createFloatingTextTagOnUnit(unit, text, config) {
    const tag = w3ts_1.TextTag.create();
    tag?.setVisible(true);
    tag?.setText(text, 10, true);
    tag?.setLifespan(config?.duration === undefined ? 2 : config.duration);
    if (config?.useFade !== false) {
        tag?.setFadepoint(0.01);
    }
    tag?.setVelocity(config?.xVelocity === undefined ? 0 : config.xVelocity, config?.yVelocity === undefined ? 0.025 : config.yVelocity);
    tag?.setPermanent(false);
    tag?.setPosUnit(unit, 10);
    if (config && config.duration && config.duration === 0) {
        return;
    }
    (0, timer_1.delayedTimer)(config?.duration ?? 2, () => {
        tag?.destroy();
    });
}
function createPermanentTextTagOnPoint(text, x, y) {
    const tag = w3ts_1.TextTag.create();
    tag?.setVisible(true);
    tag?.setText(text, 20, true);
    tag?.setLifespan(2);
    tag?.setVelocity(0, 0);
    tag?.setPermanent(true);
    tag?.setPos(x, y, 20);
}
function setup_createTextForSpellCast() {
    const t = w3ts_1.Trigger.create();
    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    t.addAction(() => {
        const u = w3ts_1.Unit.fromEvent();
        if (u) {
            const spellNumber = GetSpellAbilityId();
            const spellName = GetAbilityName(spellNumber);
            if (!spellName || spellName === "Default String")
                return;
            //alt + 0164 ¤
            //alt + 0149 •
            createFloatingTextTagOnUnit(u, (0, misc_1.ptColor)(u.owner, "¤  ") + spellName);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXh0VGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0JBLGtFQXdCQztBQUVELHNFQVVDO0FBRUQsb0VBaUJDO0FBL0VELCtCQUE4QztBQUM5QyxpQ0FBaUM7QUFDakMsbUNBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBZ0IsMkJBQTJCLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxNQUF5RjtJQUMzSixNQUFNLEdBQUcsR0FBRyxjQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0QixHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFN0IsR0FBRyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFdkUsSUFBSSxNQUFNLEVBQUUsT0FBTyxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQzVCLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELEdBQUcsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckksR0FBRyxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV6QixHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUxQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDckQsT0FBTztJQUNYLENBQUM7SUFFRCxJQUFBLG9CQUFZLEVBQUMsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFO1FBQ3JDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxTQUFnQiw2QkFBNkIsQ0FBQyxJQUFZLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDNUUsTUFBTSxHQUFHLEdBQUcsY0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkIsR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQWdCLDRCQUE0QjtJQUN4QyxNQUFNLENBQUMsR0FBRyxjQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFM0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFFdkQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixNQUFNLENBQUMsR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNKLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7WUFDeEMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxLQUFLLGdCQUFnQjtnQkFBRSxPQUFPO1lBQ3pELGNBQWM7WUFDZCxjQUFjO1lBQ2QsMkJBQTJCLENBQUMsQ0FBQyxFQUFFLElBQUEsY0FBTyxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9