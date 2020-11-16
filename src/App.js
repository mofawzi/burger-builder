import React, { Component } from "react";
import classes from "./App.css";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./Containers/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Logout from "./Containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

// Lazy Loading Components
const asyncCheckout = asyncComponent(() => {
  return import("./Containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./Containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./Containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    // Check if need to signup or the current token is valid
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />;
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className={classes.App}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
