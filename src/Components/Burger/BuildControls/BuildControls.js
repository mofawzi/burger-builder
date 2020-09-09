import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "../BuildControls/BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <strong>
      <p>Current Price: {props.price.toFixed(2)}</p>
    </strong>
    {controls.map((control) => {
      return (
        <BuildControl
          key={control.label}
          label={control.label}
          type={control.type}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      );
    })}
  </div>
);
export default buildControls;
