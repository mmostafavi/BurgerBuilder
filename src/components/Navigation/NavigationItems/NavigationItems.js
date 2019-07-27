import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Aux from "../../../hoc/Auxiliary/Auxilliary";

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>
            Burger Builder
        </NavigationItem>
        {props.isAuth ? (
            <Aux>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Aux>
        ) : (
            <NavigationItem link="/auth">Authintication</NavigationItem>
        )}
    </ul>
);

export default navigationItems;
