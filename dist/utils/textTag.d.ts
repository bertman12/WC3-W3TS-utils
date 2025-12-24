import { Unit } from "w3ts";
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
export declare function createFloatingTextTagOnUnit(unit: Unit, text: string, config?: {
    duration?: number;
    yVelocity?: number;
    xVelocity?: number;
    useFade?: boolean;
}): void;
export declare function createPermanentTextTagOnPoint(text: string, x: number, y: number): void;
export declare function setup_createTextForSpellCast(): void;
