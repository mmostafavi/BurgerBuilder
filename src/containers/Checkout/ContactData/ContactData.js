import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../../store/actions/index";

import styles from "./ContactData.module.css";

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "ZipCode"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: true,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "E-Mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                validation: {},
                valid: true,
                value: "fastest"
            }
        }
    };

    render() {
        let formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validation}
                        changed={event =>
                            this.inputChangedHandler(event, formElement.id)
                        }
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                    />
                ))}
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h1>Enter your information</h1>
                {form}
                <Button
                    disabled={this.state.formIsValid}
                    btnType="Success"
                    clicked={() =>
                        this.props.orderHandler(
                            this.state.orderForm,
                            this.props.ingredients,
                            this.props.price.toFixed(2)
                        )
                    }
                >
                    Order
                </Button>
            </div>
        );
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.lenght >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    inputChangedHandler = (event, id) => {
        const updatedOrderForm = Object.assign({}, this.state.orderForm);
        const element = updatedOrderForm[id];
        element.value = event.target.value;
        element.touched = true;

        element.valid = this.checkValidity(element.value, element.validation);

        // console.log(this.state.orderForm.zipCode.valid);

        let formIsValid;

        formIsValid = Object.keys(this.state.orderForm)
            .map(key => this.state.orderForm[key].valid)
            .every(validity => validity);

        this.setState({
            orderForm: {
                ...updatedOrderForm
            },
            formIsValid
        });
    };
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading
});

const mapDispatchToProps = dispatch => {
    return {
        orderHandler: (formInfo, ings, price) =>
            dispatch(actionCreators.orderSubmited(formInfo, ings, price))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactData);
