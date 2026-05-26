import ToggleWidget from "./Widgets/ToggleWidget";
import PushButtonWidget from "./Widgets/PushButtonWidget";
import LEDWidget from "./Widgets/LEDWidget";
import TemperatureWidget from "./Widgets/TemperatureWidget";
import GaugeWidget from "./Widgets/GaugeWidget";
import SemiCircleGaugeWidget from "./Widgets/SemiCircleGaugeWidget";
import VerticalGaugeWidget from "./Widgets/VerticalGaugeWidget";
import HorizontalGaugeWidget from "./Widgets/HorizontalGaugeWidget";
import SliderWidget from "./Widgets/SliderWidget";
import TextDisplayWidget from "./Widgets/TextDisplayWidget";
import NumericInputWidget from "./Widgets/NumericInputWidget";
import TextInputWidget from "./Widgets/TextInputWidget";
import ChartWidget from "./Widgets/ChartWidget";

import { useTelemetry } from "../../../context/TelemetryContext";

export default function WidgetRenderer({ widget }) {

  const devices = useTelemetry();

  const telemetry =
    devices?.["bike-001"];

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

    default:
      return null;
  }
}