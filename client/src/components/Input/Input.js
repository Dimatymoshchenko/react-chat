import React from "react";
import cn from "classnames";

import styles from "./Input.module.scss";

export const Input = ({ name, onChange, placeholder, className, error, value }) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target);
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      {error && <span className={styles.error}>{error}</span>}
      <input
        className={styles.input}
        type="text"
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
