import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBulder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions/index";

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuth();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/auth" component={Auth} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthinticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/checkout" component={Checkout} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return <Layout>{routes}</Layout>;
    }
}

const mapStateToProps = state => {
    return {
        isAuthinticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuth: () => dispatch(actionCreators.checkAuth())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
