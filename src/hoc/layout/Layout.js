import React, { Component } from "react";
import { connect } from "react-redux";

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
                <Toolbar
                    isAuth={this.props.isAuth}
                    sideDrawerToggleHandler={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuth}
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

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
