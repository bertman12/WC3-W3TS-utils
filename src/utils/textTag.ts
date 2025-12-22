import { TextTag, Trigger, Unit } from "w3ts";
import { ptColor } from "./misc";
import { delayedTimer } from "./timer";

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
export function createFloatingTextTagOnUnit(unit: Unit, text: string, config?: { duration?: number; yVelocity?: number; xVelocity?: number; useFade?: boolean }) {
    const tag = TextTag.create();
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

    delayedTimer(config?.duration ?? 2, () => {
        tag?.destroy();
    });
}

export function createPermanentTextTagOnPoint(text: string, x: number, y: number) {
    const tag = TextTag.create();
    tag?.setVisible(true);

    tag?.setText(text, 20, true);
    tag?.setLifespan(2);

    tag?.setVelocity(0, 0);
    tag?.setPermanent(true);
    tag?.setPos(x, y, 20);
}

export function setup_createTextForSpellCast() {
    const t = Trigger.create();

    t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);

    t.addAction(() => {
        const u = Unit.fromEvent();

        if (u) {
            const spellNumber = GetSpellAbilityId();
            const spellName = GetAbilityName(spellNumber);
            if (!spellName || spellName === "Default String") return;
            //alt + 0164 ¤
            //alt + 0149 •
            createFloatingTextTagOnUnit(u, ptColor(u.owner, "¤  ") + spellName);
        }
    });
}
