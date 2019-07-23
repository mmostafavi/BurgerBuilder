import React from "react";
import { withRouter } from "react-router-dom";

import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";

import styles from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope this tastes Well!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button disabled btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button disabled btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default withRouter(checkoutSummary);
