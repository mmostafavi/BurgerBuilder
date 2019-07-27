import React from "react";

import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../SideDrawer/ToggleButton/ToggleButton";

const toolBar = props => (
    <header className={styles.ToolBar}>
        <ToggleButton clicked={props.sideDrawerToggleHandler} />
        <div className={styles.Logo}>
            <Logo />
        </div>

        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolBar;
