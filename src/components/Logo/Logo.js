import React from "react";

import styles from "./Logo.module.css";
import Logo from "../../assets/images/burger-logo.png.png";

const logo = () => (
  <div className={styles.Logo}>
    <img src={Logo} alt="My Burger" />
  </div>
);

export default logo;
