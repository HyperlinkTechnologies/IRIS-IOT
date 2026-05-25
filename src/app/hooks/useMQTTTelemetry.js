import {

  useEffect,

} from "react";

import mqttClient
from "../services/mqttClient";

export default function useMQTTTelemetry({

  dashboards,

  saveDashboards,

}) {

  useEffect(() => {

    /* ================= SUBSCRIBE ================= */

    mqttClient.subscribe(

      "iris/+/telemetry"
    );

    /* ================= RECEIVE ================= */

    mqttClient.on(

      "message",

      (topic, message) => {

        try {

          const payload =
            JSON.parse(
              message.toString()
            );

          /* ================= DEVICE ID ================= */

          const parts =
            topic.split("/");

          const deviceId =
            parts[1];

          /* ================= UPDATE WIDGETS ================= */

          const updatedDashboards =
            dashboards.map(
              (dashboard) => ({

                ...dashboard,

                widgets:
                  dashboard.widgets.map(
                    (widget) => {

                      /* DEVICE CHECK */

                      if (
                        widget.deviceId !==
                        deviceId
                      ) {

                        return widget;
                      }

                      /* TELEMETRY KEY */

                      const telemetryValue =
                        payload[
                          widget.telemetryKey
                        ];

                      if (
                        telemetryValue ===
                        undefined
                      ) {

                        return widget;
                      }

                      return {

                        ...widget,

                        value:
                          telemetryValue,
                      };
                    }
                  ),
              })
            );

          saveDashboards(
            updatedDashboards
          );

        } catch (err) {

          console.error(err);
        }
      }
    );

  }, [

    dashboards,

    saveDashboards,
  ]);
}