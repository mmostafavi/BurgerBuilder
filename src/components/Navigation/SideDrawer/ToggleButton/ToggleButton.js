import React from "react";

import styles from "./ToggleButton.module.css";

const toggleButton = props => (
  <div className={styles.ToggleButton} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default toggleButton;
