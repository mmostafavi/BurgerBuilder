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
        this.props.fetchOrders();
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
        results: state.order.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actionCreators.fetchOrders())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
