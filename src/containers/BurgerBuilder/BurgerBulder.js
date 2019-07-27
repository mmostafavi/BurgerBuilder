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
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? (
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
                            this.props.addIngredientHandler(type)
                        }
                        ingredientRemoved={type =>
                            this.props.removeIngredientHandler(type)
                        }
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        unPurchasable={this.props.unPurchasable}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
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

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.props.initPurchased();
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthReirectPath();
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    unPurchasable: state.burger.unPurchasable,
    error: state.burger.error,
    isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    addIngredientHandler: type => dispatch(actionCreators.ingAdded(type)),
    removeIngredientHandler: type => dispatch(actionCreators.ingRemoved(type)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    initPurchased: () => dispatch(actionCreators.purchaseBurgerInit()),
    onSetAuthReirectPath: () =>
        dispatch(actionCreators.setAuthRedirectPath("/checkout"))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
