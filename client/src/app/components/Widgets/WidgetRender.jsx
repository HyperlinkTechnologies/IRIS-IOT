import ToggleWidget from "./widgets/control/ToggleWidget";
import PushButtonWidget from "./widgets/control/PushButtonWidget";
import LEDWidget from "./widgets/display/LEDWidget";
import TemperatureWidget from "./widgets/display/TemperatureWidget";
import GaugeWidget from "./widgets/display/GaugeWidget";
import SemiCircleGaugeWidget from "./widgets/display/SemiCircleGaugeWidget";
import VerticalGaugeWidget from "./widgets/display/VerticalGaugeWidget";
import HorizontalGaugeWidget from "./widgets/display/HorizontalGaugeWidget";
import SliderWidget from "./widgets/control/SliderWidget";
import TextDisplayWidget from "./widgets/display/TextDisplayWidget";
import NumericInputWidget from "./widgets/control/NumericInputWidget";
import TextInputWidget from "./widgets/control/TextInputWidget";
import ChartWidget from "./widgets/display/ChartWidget";
import MapWidget from "./widgets/map/MapWidget";

import {
  useTelemetry
} from "../../../context/TelemetryContext";

export default function WidgetRenderer({ widget }) {

  const devices = useTelemetry();

const telemetry =
  devices?.[widget.deviceId]?.telemetry;

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
