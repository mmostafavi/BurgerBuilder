import React from "react";

import styles from "./Order.module.css";

const order = props => {
  let ingredients = [];

  for (let key in props.ingredients) {
    ingredients.push(
      // key.charAt(0).toUpperCase() +
      //   key.slice(1) +
      //   "(" +
      //   props.ingredients[key] +
      //   ")"
      <span
        key={key}
        className={styles.OrderIng}
      >
        {key}({+props.ingredients[key]})
      </span>
    );
  }

  return (
    <div className={styles.Order}>
      <p>Ingredients: </p>
        <div className={styles.OrderIngs}>
            {ingredients}
        </div>
      <p>Price: {props.price} USD</p>
    </div>
  );
};

export default order;
