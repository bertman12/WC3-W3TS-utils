export function PlaySoundLocal(soundPath: string, localPlayerCanHearSound?: boolean) {
    if(localPlayerCanHearSound === undefined){
        return;
    }

    let volume = 0;
    const s = CreateSound(soundPath, FALSE, FALSE, FALSE, 10, 10, "DefaultEAXON");

    if (!s) {
        return;
    }

    SetSoundChannel(s, 0);

    if (localPlayerCanHearSound) {
        volume = 100;
    } else {
        volume = 0;
    }

    SetSoundVolumeBJ(s, volume);
    StartSound(s);
    KillSoundWhenDone(s);
}
