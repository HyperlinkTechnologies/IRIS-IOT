import ToggleWidget
from "./widgets/ToggleWidget";

import PushButtonWidget
from "./widgets/PushButtonWidget";

import LEDWidget
from "./widgets/LEDWidget";

import TemperatureWidget
from "./widgets/TemperatureWidget";

import GaugeWidget
from "./widgets/GaugeWidget";

import VerticalGaugeWidget
from "./widgets/VerticalGaugeWidget";

import HorizontalGaugeWidget
from "./widgets/HorizontalGaugeWidget";

import SliderWidget
from "./widgets/SliderWidget";

import TextDisplayWidget
from "./widgets/TextDisplayWidget";

import NumericInputWidget
from "./widgets/NumericInputWidget";

import TextInputWidget
from "./widgets/TextInputWidget";

import ChartWidget
from "./widgets/ChartWidget";

export default function WidgetRenderer({
  widget,
}) {

  switch (widget.type) {

    case "toggle":
      return <ToggleWidget />;

    case "pushbutton":
      return <PushButtonWidget />;

    case "led":
      return <LEDWidget />;

    case "temperature":
      return <TemperatureWidget />;

    case "gauge":
      return <GaugeWidget />;

    case "verticalgauge":
      return <VerticalGaugeWidget />;

    case "horizontalgauge":
      return <HorizontalGaugeWidget />;

    case "slider":
      return <SliderWidget />;

    case "textdisplay":
      return <TextDisplayWidget />;

    case "numericinput":
      return <NumericInputWidget />;

    case "textinput":
      return <TextInputWidget />;

    case "chart":
      return <ChartWidget />;

    default:
      return null;
  }
}