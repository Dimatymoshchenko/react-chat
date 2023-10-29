import {
  WS_CONNECTED,
  WS_DISCONNECTED,
  WS_MESSAGES,
  GET_MESSAGES,
  WS_ERROR,
} from "./websocket.constants";

const initialState = {
  isConnected: false,
  messages: [],
  users: [],
  error: null,
};

export const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTED:
      return {
        ...state,
        isConnected: true,
        error: null,
      };

    case WS_DISCONNECTED:
      return {
        ...state,
        isConnected: false,
        error: null,
      };

    case GET_MESSAGES:
    case WS_MESSAGES:
      return {
        ...state,
        messages: action.data,
      };

    case WS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
