import React, { Component } from "react";

import Aux from "../../hoc/Auxilliary";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerToggleHandler={this.sideDrawerToggleHandler} />
        <SideDrawer
          show={this.state.show}
          backDropClickHandler={this.backDropClickHandler}
        />
        <div>Toolbar , sidebar</div>
        <main className={styles.content}>{this.props.children}</main>
      </Aux>
    );
  }

  backDropClickHandler = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  };
}

export default Layout;
