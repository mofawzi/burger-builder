import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

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
      <strong>
        <p>Total Price: {props.price.toFixed(2)}</p>
      </strong>
      <p>Continue to Checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
