import commandService from "../core/commands/commandService";

export default function useCommand(widget) {

  const sendCommand = (value) => {

    if (!widget) return;

    commandService.send(
      widget,
      value
    );

  };

  return {
    sendCommand,
  };

}