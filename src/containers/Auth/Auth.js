import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";

class Auth extends Component {
    state = {
        signInForm: {
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
                isTouched: false
            },
            formIsValid: false
        }
    };

    render() {
        let formElementsArray = [];

        for (let key in this.state.signInForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signInForm[key]
            });
        }
        return(
            <form>
                {
                    formElementsArray.map(element => {
                        return (
                            <Input 
                                key={element.id}
                                elementType={element.config.elementType} 
                                elementConfig={...element.config.elementConfig}
                                shouldValidate={...element.config.validation}
                                value={element.config.value}
                                changed={event =>
                                    this.inputChangedHandler(event, element.id)
                                }
                                invalid={!element.config.valid}
                                touched={element.config.touched}
                            />
                        )
                    })
                }
            </form>
        )
    }

    inputChangedHandler = (event, elementIdentifier) => {
        const updatedValue =  event.target.value;
        this.setState({
            ...this.state,
            signInForm[elementIdentifier]value : ""
        })
    }
}
