import React from "react";
import burgerLogo from "../../assets/Images/127 burger-logo.png";
import classes from "./Logo.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
