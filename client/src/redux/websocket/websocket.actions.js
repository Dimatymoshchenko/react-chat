import * as constants from "./websocket.constants";

export const initWebsocketConnection = () => ({
  type: constants.WS_INIT,
});

export const disconnectWebsocketConnection = () => ({
  type: constants.WS_DISCONNECT,
});

export const loadMessages = () => ({
  type: constants.REQUEST_MESSAGES,
});

export const sendMessage = (data) => ({
  type: constants.WS_SEND_MESSAGE,
  data,
});
