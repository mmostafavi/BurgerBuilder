import React, { Component } from "react";

import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const GREDIENT_PRICES = {
  meat: 1.4,
  bacon: 0.9,
  salad: 0.4,
  cheese: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    unPurchasable: true,
    purchasing: false
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          unPurchasable={this.state.unPurchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }

  updateUnPurchasable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => ingredients[igkey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ unPurchasable: sum === 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + GREDIENT_PRICES[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updateUnPurchasable(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const newCount = oldCount - 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - GREDIENT_PRICES[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updateUnPurchasable(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You continued!");
  };
}

export default BurgerBuilder;
