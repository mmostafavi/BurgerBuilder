import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/ChechoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Aux from "../../hoc/Auxiliary/Auxilliary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    price: 0
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = [];
    for (let param of params.entries()) {
      ingredients.push(param);
    }

    const newIngredients = {};
    for (let pair of ingredients) {
      if (pair[0] === "price") {
        this.setState({
          price: +pair[1]
        });
      } else {
        newIngredients[pair[0]] = +pair[1];
      }
    }
    console.log(newIngredients);

    this.setState({ ingredients: newIngredients });
  }

  render() {
    console.log(this.props);
    return (
      <Aux>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              {...this.props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
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

export default Checkout;
