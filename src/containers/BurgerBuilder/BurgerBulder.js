import React, { Component } from "react";
import axios from "../../axios-orders";

import Aux from "../../hoc/Auxiliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const GREDIENT_PRICES = {
  meat: 1.4,
  bacon: 0.9,
  salad: 0.4,
  cheese: 0.6
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    unPurchasable: true,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://burger-react-ac776.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>
        The Ingredients Can't be reloaded...
      </p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
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
    // alert("You continued!");
    this.setState({
      loading: true
    });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      costumer: {
        name: "Mahdi",
        address: "Tabriz, el-Goli",
        email: "mahdi@mahdi.mahdi",
        age: "99"
      },
      deliveryType: "sefareshi"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        // console.log(response);
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  };
}

export default withErrorHandler(BurgerBuilder, axios);
