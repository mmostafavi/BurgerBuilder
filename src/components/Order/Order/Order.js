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
        style={{
          boxSizing: "border-box",
          border: "1px solid black",
          margin: "0 0.2rem",
          padding: "0.3rem",
          textTransform: "capitalize"
        }}
      >
        {key}({+props.ingredients[key]})
      </span>
    );
  }

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: {props.price} USD</p>
    </div>
  );
};

export default order;
