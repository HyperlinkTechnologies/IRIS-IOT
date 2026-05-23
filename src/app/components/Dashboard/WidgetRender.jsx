// import ToggleWidget
// from "./Widgets/ToggleWidget";

// import PushButtonWidget
// from "./Widgets/PushButtonWidget";

// import LEDWidget
// from "./Widgets/LEDWidget";

// import TemperatureWidget
// from "./Widgets/TemperatureWidget";

// import GaugeWidget
// from "./Widgets/GaugeWidget";

// import VerticalGaugeWidget
// from "./Widgets/VerticalGaugeWidget";

// import HorizontalGaugeWidget
// from "./Widgets/HorizontalGaugeWidget";

// import SliderWidget
// from "./Widgets/SliderWidget";

// import TextDisplayWidget
// from "./Widgets/TextDisplayWidget";

// import NumericInputWidget
// from "./Widgets/NumericInputWidget";

// import TextInputWidget
// from "./Widgets/TextInputWidget";

// import ChartWidget
// from "./Widgets/ChartWidget";

// export default function WidgetRenderer({
//   widget,
// }) {

//   switch (widget.type) {

//     case "toggle":
//       return <ToggleWidget />;

//     case "pushbutton":
//       return <PushButtonWidget />;

//     case "led":
//       return <LEDWidget />;

//     case "temperature":
//       return <TemperatureWidget />;

//     case "gauge":
//       return <GaugeWidget />;

//     case "verticalgauge":
//       return <VerticalGaugeWidget />;

//     case "horizontalgauge":
//       return <HorizontalGaugeWidget />;

//     case "slider":
//       return <SliderWidget />;

//     case "textdisplay":
//       return <TextDisplayWidget />;

//     case "numericinput":
//       return <NumericInputWidget />;

//     case "textinput":
//       return <TextInputWidget />;

//     case "chart":
//       return <ChartWidget />;

//     default:
//       return null;
//   }
// }

import GaugeWidget
from "./widgets/GaugeWidget";

import ToggleWidget
from "./widgets/ToggleWidget";

export default function WidgetRenderer({
  widget,
}) {

  switch (widget.type) {

    case "gauge":

      return (
        <GaugeWidget
          widget={widget}
        />
      );

    case "toggle":

      return (
        <ToggleWidget
          widget={widget}
        />
      );

    default:

      return (
        <div>
          Unknown Widget
        </div>
      );
  }
}