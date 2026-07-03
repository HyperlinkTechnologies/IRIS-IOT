import telemetryStore from "./telemetryStore";

let interval = null;

const telemetrySimulator = {

  start(deviceId) {

    if (interval) return;

    interval = setInterval(() => {

        console.log("Simulator:", {
  deviceId,
  battery: Math.floor(50 + Math.random() * 50),
});

      telemetryStore.update(deviceId, {

        temperature: +(20 + Math.random() * 15).toFixed(1),

        humidity: Math.floor(40 + Math.random() * 40),

        battery: Math.floor(50 + Math.random() * 50),

        relay: Math.random() > 0.5,

      });
      console.log(
  telemetryStore.get(deviceId)
);

    }, 1000);

  },

  stop() {

    clearInterval(interval);

    interval = null;

  },

};

export default telemetrySimulator;