import { combineReducers } from "redux";
import { websocketReducer } from "./websocket/websocket.reducer";

const appReducers = combineReducers({
  websocketReducer,
});

export const rootReducer = (state, action) => {
  return appReducers(state, action);
};
