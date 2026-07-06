import ToggleWidget from "./Widgets/control/ToggleWidget";
import PushButtonWidget from "./Widgets/control/PushButtonWidget";
import LEDWidget from "./Widgets/display/LEDWidget";
import TemperatureWidget from "./Widgets/display/TemperatureWidget";
import GaugeWidget from "./Widgets/display/GaugeWidget";
import SemiCircleGaugeWidget from "./Widgets/display/SemiCircleGaugeWidget";
import VerticalGaugeWidget from "./Widgets/display/VerticalGaugeWidget";
import HorizontalGaugeWidget from "./Widgets/display/HorizontalGaugeWidget";
import SliderWidget from "./Widgets/control/SliderWidget";
import TextDisplayWidget from "./Widgets/display/TextDisplayWidget";
import NumericInputWidget from "./Widgets/control/NumericInputWidget";
import TextInputWidget from "./Widgets/control/TextInputWidget";
import ChartWidget from "./Widgets/display/ChartWidget";
import MapWidget from "./Widgets/map/MapWidget";

import {
  useTelemetry
} from "../../../context/TelemetryContext";

export default function WidgetRenderer({ widget }) {

  const devices = useTelemetry();

  let selectedDevice = null;

  try {
    const savedDevices =
      JSON.parse(localStorage.getItem("iris_devices")) || [];

    selectedDevice = savedDevices.find(
      (device) => String(device.id) === String(widget.deviceId)
    );
  } catch {
    selectedDevice = null;
  }

  const telemetryDeviceId =
    selectedDevice?.deviceId || widget.deviceId;

  const telemetry = devices?.[telemetryDeviceId];

  switch (widget.type) {

    case "toggle":
      return (
        <ToggleWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "pushbutton":
      return (
        <PushButtonWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "led":
      return (
        <LEDWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "temperature":
      return (
        <TemperatureWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "gauge":
      return (
        <GaugeWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "semicirclegauge":
      return (
        <SemiCircleGaugeWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "verticalgauge":
      return (
        <VerticalGaugeWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "horizontalgauge":
      return (
        <HorizontalGaugeWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "slider":
      return (
        <SliderWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "textdisplay":
      return (
        <TextDisplayWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "numericinput":
      return (
        <NumericInputWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "textinput":
      return (
        <TextInputWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "chart":
      return (
        <ChartWidget
          widget={widget}
          telemetry={telemetry}
        />
      );

    case "map":
      return (
        <MapWidget
          widget={widget}
          telemetry={telemetry}
          telemetryDevices={devices}
        />
      );

    default:
      return null;
  }
}
