import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/ChechoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Aux from "../../hoc/Auxiliary/Auxilliary";

class Checkout extends Component {
  // for redux implementation
  // componentDidMount() {
  //   const params = new URLSearchParams(this.props.location.search);
  //   const ingredients = [];
  //   for (let param of params.entries()) {
  //     ingredients.push(param);
  //   }

  //   const newIngredients = {};
  //   for (let pair of ingredients) {
  //     if (pair[0] === "price") {
  //       this.setState({
  //         price: +pair[1]
  //       });
  //     } else {
  //       newIngredients[pair[0]] = +pair[1];
  //     }
  //   }
  //   console.log(newIngredients);

  //   this.setState({ ingredients: newIngredients });
  // }
  // for redux implementation

  render() {
    return (
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
  price: state.burger.totalPrice
});

export default connect(mapStateToProps)(Checkout);
