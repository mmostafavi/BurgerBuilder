import React from "react";

import styles from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxilliary";

// console.log("[sideDrawer.js] ... ", showBackDrop);

const sideDrawer = props => {
  return (
    <Aux>
      <BackDrop clicked={props.backDropClickHandler} show={props.show} />
      <div
        className={[
          styles.SideDrawer,
          props.show ? styles.open : styles.close
        ].join(" ")}
      >
        <div className={styles.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
