import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxilliary";
import * as actionCreators from "../../store/actions/index";

import styles from "./Auth.module.css";

class Auth extends Component {
    state = {
        signUpForm: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "E-mail address"
                },
                validation: {
                    required: true
                },
                value: "",
                valid: false,
                isTouched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                validation: {
                    required: true
                },
                value: "",
                valid: false,
                isTouched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    };

    render() {
        let formElementsArray = [];

        for (let key in this.state.signUpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }

        let form = formElementsArray.map(element => {
            return (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    shouldValidate={element.config.validation}
                    value={element.config.value}
                    changed={event =>
                        this.inputChangedHandler(event, element.id)
                    }
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                />
            );
        });

        if (this.props.loading) {
            form = <Spinner />;
        }

        let error = null;
        if (this.props.error) {
            error = <p>{this.props.error.message}</p>;
        }

        let redirect = null;
        if (this.props.isAuth) {
            redirect = <Redirect to={this.props.redirectPath} />;
        }

        return (
            <Aux>
                {redirect}
                <div className={styles.Auth}>
                    <form onSubmit={this.authHandler}>
                        {error}
                        {form}
                        <Button btnType="Success" disabled>
                            {this.state.isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    </form>
                    <Button
                        btnType="Danger"
                        disabled
                        clicked={this.switchModeHandler}
                    >
                        Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
                    </Button>
                </div>
            </Aux>
        );
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    };

    authHandler = e => {
        e.preventDefault();
        this.props.authHandler(
            this.state.signUpForm.email.value,
            this.state.signUpForm.password.value,
            this.state.isSignUp
        );
        if (this.props.building) {
            this.props.onSetAuthRedirectPath("/checkout");
        } else {
            this.props.onSetAuthRedirectPath("/");
        }
    };

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

    inputChangedHandler = (event, elementIdentifier) => {
        const updatedSignUpForm = {
            ...this.state.signUpForm,
            [elementIdentifier]: {
                ...this.state.signUpForm[elementIdentifier],
                elementConfig: {
                    ...this.state.signUpForm[elementIdentifier].elementConfig
                },
                validation: {
                    ...this.state.signUpForm[elementIdentifier].validation
                }
            }
        };

        const updatedElement = updatedSignUpForm[elementIdentifier];

        updatedElement.value = event.target.value;

        updatedElement.valid = this.checkValidity(
            updatedElement.value,
            updatedElement.validation
        );

        let formIsValid = Object.keys(updatedSignUpForm)
            .map(key => updatedSignUpForm[key].valid)
            .every(validity => validity);

        this.setState({
            formIsValid: formIsValid,
            signUpForm: { ...updatedSignUpForm }
        });
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burger.building,
        redirectPath: state.auth.redirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authHandler: (email, pass, isSignUp) =>
            dispatch(actionCreators.authentication(email, pass, isSignUp)),
        onSetAuthRedirectPath: path =>
            dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
