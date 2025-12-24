"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCameraZoom = enableCameraZoom;
const w3ts_1 = require("w3ts");
const players_1 = require("./players");
function enableCameraZoom() {
    const t = w3ts_1.Trigger.create();
    (0, players_1.forEachPlayer)((p) => {
        SetCameraFieldForPlayer(p.handle, CAMERA_FIELD_FARZ, 10000, 0.25);
        t.registerPlayerChatEvent(p, "-cam", false);
        t.addAction(() => {
            const str = GetEventPlayerChatString();
            const triggeringPlayer = GetTriggerPlayer();
            if (str && triggeringPlayer) {
                const [command, distance] = str?.split(" ");
                SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_FARZ, 10000, 0.25);
                if (distance === "mid") {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, 4500, 0.25);
                    return;
                }
                else if (distance === "far") {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, 6000, 0.25);
                    return;
                }
                else if (distance === "max") {
                    SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, 7800, 0.25);
                    return;
                }
                const distanceAsNumber = Number(distance);
                if (typeof distanceAsNumber !== "number")
                    return;
                SetCameraFieldForPlayer(triggeringPlayer, CAMERA_FIELD_TARGET_DISTANCE, distanceAsNumber, 0.25);
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZXJhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NhbWVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLDRDQXlEQztBQTlERCwrQkFBK0I7QUFDL0IsdUNBQTBDO0FBSTFDLFNBQWdCLGdCQUFnQjtJQUM5QixNQUFNLENBQUMsR0FBRyxjQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0IsSUFBQSx1QkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDbEIsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbEUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFNUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZixNQUFNLEdBQUcsR0FBRyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztZQUM1QyxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLHVCQUF1QixDQUNyQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxJQUFJLENBQ0wsQ0FBQztnQkFFRixJQUFLLFFBQTRCLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQzVDLHVCQUF1QixDQUNyQixnQkFBZ0IsRUFDaEIsNEJBQTRCLEVBQzVCLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztvQkFDRixPQUFPO2dCQUNULENBQUM7cUJBQU0sSUFBSyxRQUE0QixLQUFLLEtBQUssRUFBRSxDQUFDO29CQUNuRCx1QkFBdUIsQ0FDckIsZ0JBQWdCLEVBQ2hCLDRCQUE0QixFQUM1QixJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7b0JBQ0YsT0FBTztnQkFDVCxDQUFDO3FCQUFNLElBQUssUUFBNEIsS0FBSyxLQUFLLEVBQUUsQ0FBQztvQkFDbkQsdUJBQXVCLENBQ3JCLGdCQUFnQixFQUNoQiw0QkFBNEIsRUFDNUIsSUFBSSxFQUNKLElBQUksQ0FDTCxDQUFDO29CQUNGLE9BQU87Z0JBQ1QsQ0FBQztnQkFFRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxPQUFPLGdCQUFnQixLQUFLLFFBQVE7b0JBQUUsT0FBTztnQkFFakQsdUJBQXVCLENBQ3JCLGdCQUFnQixFQUNoQiw0QkFBNEIsRUFDNUIsZ0JBQWdCLEVBQ2hCLElBQUksQ0FDTCxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=