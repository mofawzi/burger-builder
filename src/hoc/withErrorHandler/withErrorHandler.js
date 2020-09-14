import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Aux";

// A higher order component to handle errors globally (Wrapper component)
const withErrorHandler = (WrappedComponent, axios) => {
  // Return a class based component
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
        }
      );
    }
    errorConfirmationHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmationHandler}
          >
            {/* Show only if there was an error */}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
