import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import styles from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    contactData: {
      address: null,
      name: null,
      age: null,
      mail: null
    },
    loading: false
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={styles.Input}
          type="mail"
          name="Mail"
          placeholder="Your E-mail"
        />
        <input
          className={styles.Input}
          type="text"
          name="age"
          placeholder="Your age"
        />
        <input
          className={styles.Input}
          type="text"
          name="address"
          placeholder="Your Address"
        />
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h1>Enter your information</h1>
        {form}
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </div>
    );
  }

  orderHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      costumer: {
        name: "Mahdi",
        address: "Tabriz, el-Goli",
        email: "mahdi@mahdi.mahdi",
        age: "89"
      },
      deliveryType: "sefareshi"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        // console.log(response);
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  };
}

export default ContactData;
