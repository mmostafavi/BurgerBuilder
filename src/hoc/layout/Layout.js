import React, { Component } from "react";

import Aux from "../Auxiliary/Auxilliary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
