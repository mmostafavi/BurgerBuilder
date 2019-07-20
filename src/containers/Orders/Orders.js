import React, { Component } from "react";

import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json", req => {
        this.setState({
          loading: true
        });
      })
      .then(response => {
        this.setState({
          loading: false
        });
        let fetchedOrders = Object.keys(response.data).map(order => {
          return (
            <Order
              key={order}
              ingredients={response.data[order].ingredients}
              price={response.data[order].price}
            />
          );
        });
        this.setState({ orders: fetchedOrders });
        // }

        // this.setState({ orders: response.data });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let orders = this.state.orders ? (
      this.state.orders
    ) : (
      <p style={{ textAlign: "center" }}>No order registered yet!</p>
    );

    if (this.state.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
