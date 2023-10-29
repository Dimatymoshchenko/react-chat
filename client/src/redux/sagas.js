import { all } from "redux-saga/effects";

import {
  websocket,
  watchSendMessage,
  getMessages,
} from "./websocket/websocket.sagas";

export default function* rootSaga() {
  yield all([websocket(), watchSendMessage(), getMessages()]);
}
