import { forEachPlayer } from "src/utils/players";
import { Trigger } from "w3ts";

type CameraDistances = "mid" | "far" | "max";

export function enableCameraZoom() {
    const t = Trigger.create();
    forEachPlayer((p) => {
        SetCameraFieldForPlayer(p.handle, CAMERA_FIELD_FARZ, 10000, 0.25);

        t.registerPlayerChatEvent(p, "-cam", false);

        t.addAction(() => {
            const str = GetEventPlayerChatString();
            const triggeringPlayer = GetTriggerPlayer();
            if (str && triggeringPlayer) {
                const [command, distance] = str?.split(" ");
                SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_FARZ, 10000, 0.25);

                if ((distance as CameraDistances) === "mid") {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, 4500, 0.25);
                    return;
                } else if ((distance as CameraDistances) === "far") {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, 6000, 0.25);
                    return;
                } else if ((distance as CameraDistances) === "max") {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, 7800, 0.25);
                    return;
                }

                const distanceAsNumber = Number(distance);
                if (typeof distanceAsNumber !== "number") return;

                SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, distanceAsNumber, 0.25);
            }
        });
    });
}
