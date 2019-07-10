import React from "react";
import Aux from "../../../hoc/Auxilliary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igkey => (
    <li key={igkey}>
      <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
      {props.ingredients[igkey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Cost: {props.price.toFixed(2)}</strong>
      </p>
      <p>continue to checkout?</p>

      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
