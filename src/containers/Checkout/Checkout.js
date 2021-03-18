import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends React.Component {
  onCheckoutSuccessHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  onCheckoutCancelledHandler = () => {
    // this.props.history.push('/')
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckoutSuccess={this.onCheckoutSuccessHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}
const matchStateToProps = (state) => {
  return {
    ings: state.ing.ingredients,
  };
};

export default connect(matchStateToProps)(Checkout);
