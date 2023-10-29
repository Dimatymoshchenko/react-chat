import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatForm } from "./components/ChatForm/ChatForm";
import { Message } from "./components/Message/Message";
import {
  initWebsocketConnection,
  disconnectWebsocketConnection,
  loadMessages,
} from "./redux/websocket/websocket.actions";

import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const messages = useSelector(
    ({ websocketReducer }) => websocketReducer.messages
  );

  useEffect(() => {
    dispatch(initWebsocketConnection());
    dispatch(loadMessages());

    return () => {
      dispatch(disconnectWebsocketConnection());
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.chat}>
          {messages.map(({ username, message }, index) => (
            <Message
              key={index} // it is bad practice to use index, but it's just for test example cause messages don't have id's
              username={username}
              message={message}
            />
          ))}
        </div>
        <ChatForm />
      </div>
    </div>
  );
}

export default App;
