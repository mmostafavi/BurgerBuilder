import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/ChechoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Aux from "../../hoc/Auxiliary/Auxilliary";

class Checkout extends Component {
    // for redux implementation
    // componentDidMount() {
    //

    //   this.setState({ ingredients: newIngredients });
    // }
    // for redux implementation

    render() {
        let summary = <Redirect to="/" />;

        if (this.props.ingredients) {
            summary = (
                <Aux>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </Aux>
            );
            if (this.props.purchased) {
                summary = <Redirect to="/" />;
            }
        }
        return summary;
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
