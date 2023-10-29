import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/websocket/websocket.actions";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import styles from "./ChatForm.module.scss";

export const ChatForm = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const dispatch = useDispatch();

  const onInputChange = (target) => {
    const { value, name } = target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "message") {
      setMessage(value);
    }
    validateField(name, value);
  };

  const onSubmit = () => {
    const isUsernameValid = validateField("username", username);
    const isMessageValid = validateField("message", message);

    if (isUsernameValid && isMessageValid) {
      dispatch(
        sendMessage({
          username,
          message,
        })
      );

      setMessage("");
      console.log("Data is valid, sending:", { username, message });
    } else {
      console.log("Validation errors detected");
    }
  };

  const validateField = (name, value) => {
    if (name === "username") {
      if (!value.trim()) {
        setUsernameError("Nickname cannot be empty");
        return false;
      } else {
        setUsernameError("");
        return true;
      }
    } else if (name === "message") {
      if (!value.trim()) {
        setMessageError("Message cannot be empty");
        return false;
      } else if (value.length > 255) {
        setMessageError("Message cannot exceed 255 characters");
        return false;
      } else {
        setMessageError("");
        return true;
      }
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <Input
        value={username}
        className={styles.username}
        placeholder="Nickname"
        name="username"
        onChange={onInputChange}
        error={usernameError}
      />
      <Input
        value={message}
        className={styles.message}
        placeholder="Message"
        name="message"
        onChange={onInputChange}
        error={messageError}
      />
      <Button onClick={onSubmit}>Send</Button>
    </div>
  );
};
