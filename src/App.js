import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBulder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions/index";

const checkout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});

const auth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
});

const orders = asyncComponent(() => {
    return import("./containers/Orders/Orders");
});

const logout = asyncComponent(() => {
    return import("./containers/Auth/Logout/Logout");
});

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuth();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/auth" component={auth} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthinticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/orders" component={orders} />
                    <Route path="/logout" component={logout} />
                    <Route path="/checkout" component={checkout} />
                    <Route path="/auth" component={auth} />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
