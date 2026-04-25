import { Trigger } from "w3ts";
import { forEachPlayer } from "./players";

export interface CameraZoomConfiguration {
    argument: string;
    cameraDistance: number;
}

export const DEFAULT_CAMERA_ZOOM_CONFIGURATION: CameraZoomConfiguration[] = [
    { argument: "mid", cameraDistance: 4500 },
    { argument: "far", cameraDistance: 6000 },
    { argument: "max", cameraDistance: 7800 },
];

export function enableCameraZoom(cameraZoomConfiguration: CameraZoomConfiguration[] = DEFAULT_CAMERA_ZOOM_CONFIGURATION) {
    const t = Trigger.create();

    const zoomConfigurationByArgument = new Map<string, number>(cameraZoomConfiguration.map((configuration) => [configuration.argument, configuration.cameraDistance]));

    forEachPlayer((p) => {
        SetCameraFieldForPlayer(p.handle, CAMERA_FIELD_FARZ, 10000, 0.25);

        t.registerPlayerChatEvent(p, "-cam", false);

        t.addAction(() => {
            const str = GetEventPlayerChatString();
            const triggeringPlayer = GetTriggerPlayer();
            if (str && triggeringPlayer) {
                const [, distance] = str.split(" ");

                if (!distance) return;

                SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_FARZ, 10000, 0.25);

                const configuredDistance = zoomConfigurationByArgument.get(distance);
                if (configuredDistance !== undefined) {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, configuredDistance, 0.25);
                    return;
                }

                const distanceAsNumber = Number(distance);
                if (!Number.isFinite(distanceAsNumber)) return;

                SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, distanceAsNumber, 0.25);
            }
        });
    });
}
