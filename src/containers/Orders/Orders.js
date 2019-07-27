import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions/index";

class Orders extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = this.props.results ? (
            this.props.results.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                );
            })
        ) : (
            <p style={{ textAlign: "center" }}>No order registered yet!</p>
        );

        if (this.props.loading) {
            orders = <Spinner />;
        }

        return <div>{orders}</div>;
    }
}

const mapStateToProps = state => {
    return {
        results: state.order.results,
        token: state.auth.token || localStorage.getItem("idToken"),
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) =>
            dispatch(actionCreators.fetchOrders(token, userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
