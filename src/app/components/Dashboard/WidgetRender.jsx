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

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "toggle":
      return <ToggleWidget widget={widget} />;

    case "pushbutton":
      return <PushButtonWidget widget={widget} />;

    case "led":
      return <LEDWidget widget={widget} />;

    case "temperature":
      return <TemperatureWidget widget={widget} />;

    case "gauge":
      return <GaugeWidget widget={widget} />;

    case "semicirclegauge":
      return <SemiCircleGaugeWidget widget={widget} />;

    case "verticalgauge":
      return <VerticalGaugeWidget widget={widget} />;

    case "horizontalgauge":
      return <HorizontalGaugeWidget widget={widget} />;

    case "slider":
      return <SliderWidget widget={widget} />;

    case "textdisplay":
      return <TextDisplayWidget widget={widget} />;

    case "numericinput":
      return <NumericInputWidget widget={widget} />;

    case "textinput":
      return <TextInputWidget widget={widget} />;

    case "chart":
      return <ChartWidget widget={widget} />;

    default:
      return null;
  }
}
