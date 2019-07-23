import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  // ** for implementing Redux
  // componentDidMount() {
  //   axios
  //     .get("/ingredients.json")
  //     .then(res => {
  //       this.setState({ ingredients: res.data });
  //     })
  //     .catch(error => {
  //       this.setState({ error: true });
  //     });
  // }
  // ** for implementing Redux

  render() {
    const disabledInfo = {
      ...this.props.ingredients
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

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={type =>
              this.props.addIngredientHandler(type, this.props.ingredients)
            }
            ingredientRemoved={type =>
              this.props.removeIngredientHandler(type, this.props.ingredients)
            }
            disabled={disabledInfo}
            price={this.props.totalPrice}
            unPurchasable={this.props.unPurchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
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

  // updateUnPurchasable = ingredients => {
  //   const sum = Object.keys(ingredients)
  //     .map(igkey => ingredients[igkey])
  //     .reduce((sum, el) => sum + el, 0);

  //   this.setState({ unPurchasable: sum === 0 });
  // };

  // addIngredientHandler = type => {
  //   const oldCount = this.props.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = oldPrice + GREDIENT_PRICES[type];
  //   const updatedIngredients = {
  //     ...this.props.ingredients
  //   };
  //   updatedIngredients[type] = newCount;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updateUnPurchasable(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.props.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const newCount = oldCount - 1;
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = oldPrice - GREDIENT_PRICES[type];
  //   const updatedIngredients = {
  //     ...this.props.ingredients
  //   };
  //   updatedIngredients[type] = newCount;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updateUnPurchasable(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }

    this.props.history.push("/checkout");

    this.props.match.params.ingredients = {
      ...this.props.ingredients
    };
    console.log(this.props.match);
  };
}

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  unPurchasable: state.burger.unPurchasable
});

const mapDispatchToProps = dispatch => ({
  addIngredientHandler: (type, ingredients) =>
    dispatch({
      type: actionTypes.ING_ADDED,
      ingType: type,
      ingredients
    }),
  removeIngredientHandler: (type, ingredients) =>
    dispatch({
      type: actionTypes.ING_REMOVED,
      ingType: type,
      ingredients
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
