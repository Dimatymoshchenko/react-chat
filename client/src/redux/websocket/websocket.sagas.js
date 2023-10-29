import { eventChannel } from "redux-saga";
import {
  put,
  takeEvery,
  call,
  take,
  race,
  delay,
  fork,
  cancel,
} from "redux-saga/effects";

import * as constants from "./websocket.constants";

const PING_DELAY = 30000;

let socket = null;

function createSocketChannel(url) {
  socket = new WebSocket(url);

  const channel = eventChannel((emit) => {
    socket.onopen = () => emit({ type: constants.WS_CONNECTED });
    socket.onclose = () => emit({ type: constants.WS_DISCONNECTED });
    socket.onerror = () => emit({ type: constants.WS_ERROR });
    socket.onmessage = (event) => emit(JSON.parse(event.data));

    return () => socket.close();
  });

  return { channel, socket };
}

function* sendPing(socket) {
  while (true) {
    yield delay(PING_DELAY);
    socket.send(
      JSON.stringify({
        type: constants.WS_PING,
      })
    );
  }
}

function* initWebsocket() {
  const { channel, socket } = yield call(createSocketChannel, constants.PORT);

  const pingTask = yield fork(sendPing, socket);

  while (true) {
    const { disconnect, action } = yield race({
      disconnect: take(constants.WS_DISCONNECT),
      action: take(channel),
    });

    if (disconnect) {
      yield cancel(pingTask);
      channel.close();
    } else {
      yield put(action);
    }
  }
}

export function* websocket() {
  yield takeEvery(constants.WS_INIT, initWebsocket);
}

export function* getMessages() {
  yield takeEvery([constants.REQUEST_MESSAGES, constants.GET_MESSAGES], function* () {
    yield delay(300);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: constants.REQUEST_MESSAGES }));
    } else if (!socket) {
      console.error("WebSocket connection is not established.");
    } else if (socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is still in the connecting state.");
    }
  });
}

function* sendMessageSaga(action) {
  if (socket) {
    socket.send(
      JSON.stringify({ type: constants.WS_SEND_MESSAGE, data: action.data })
    );
  } else {
    console.error("WebSocket connection is not established.");
  }
  yield null;
}

export function* watchSendMessage() {
  yield takeEvery(constants.WS_SEND_MESSAGE, sendMessageSaga);
}
