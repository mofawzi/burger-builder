import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  // Update input fields
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    // Prevent loading of the page
    event.preventDefault();
    // Get email, password from state
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    // Dispatch submit action
    this.props.onAuth(email, password, this.state.isSignup);
  };

  // Update Signup boolean in the state
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];
    // Make array of the form elements
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    //  Map through form elements
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    // Show the Spinner while loading
    if (this.props.loading) {
      form = <Spinner />;
    }

    // Show errors if there
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        // Message property is came from firebase.
        <p>{this.props.error.message}</p>
      );
    }

    // Redirect to home page after Sign in
    let authRedircet = null;
    if (this.props.isAuthenticated) {
      authRedircet = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedircet}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    // Reset the redirection path
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
