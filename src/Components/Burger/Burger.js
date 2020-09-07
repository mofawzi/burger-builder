import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = (props) => {
  // Transform the object (key, value) to be an array of ingredients ' where the key is the ingredient , the value is the qiantity'
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      });
    })
    // Use reduce to get the actual number of ingredients -> Not the array length
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>PLease start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
