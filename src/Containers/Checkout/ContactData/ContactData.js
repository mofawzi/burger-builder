import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Input from "../../../Components/UI/Input/Input";
import classes from "./ContactData.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    // To stop re-rendring
    event.preventDefault();
    // Deal with firebase
    // Update Loading screen ' Spinner '
    this.setState({ loading: true });
    // Creating an object to be stored in DB
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Mohamed Fawzy",
        adress: {
          stret: "Saif 603",
          zipCode: "12345",
          city: "Alexandria",
          country: "Egypt",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };

    // Send a post request to save the order in DB
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
          input_type="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          input_type="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
          input_type="input"
          type="text"
          name="city"
          placeholder="Your City"
        />
        <Input
          input_type="input"
          type="text"
          name="Street"
          placeholder="Your street"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    // Showing spinner while loading
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
