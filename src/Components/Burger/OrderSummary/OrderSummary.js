import React from "react";
import Aux from "../../../hoc/Aux";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    // Map ingredients into a list
    .map((ingKey) => {
      return (
        <li key={ingKey}>
          <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
          {props.ingredients[ingKey]}
        </li>
      );
    });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout ?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </Aux>
  );
};

export default orderSummary;
