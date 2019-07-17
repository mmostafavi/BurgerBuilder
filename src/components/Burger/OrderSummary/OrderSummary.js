import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxilliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // componentWillUpdate() {
  //   console.log("[OrderSummary.js] willUpdate ");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igkey => (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
        {this.props.ingredients[igkey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious Burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Cost: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>continue to checkout?</p>

        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
