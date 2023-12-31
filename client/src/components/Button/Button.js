import React from "react";

import styles from "./Button.module.scss";

export const Button = ({ children, type = "submit", onClick }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
