import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actionCreators from '../../store/actions/index'
class Checkout extends React.Component {




  onCheckoutSuccessHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  onCheckoutCancelledHandler = () => {
    // this.props.history.push('/')
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/" />
  
    if (this.props.ings) {
      const purchasedRedirect =  this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.onCheckoutCancelledHandler}
            onCheckoutSuccess={this.onCheckoutSuccessHandler} />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData} />
        </div>
      )
    }
    return summary

  }
}
const matchStateToProps = (state) => {
  return {
    ings: state.ing.ingredients,
    purchased: state.order.purchased
  };
};



export default connect(matchStateToProps)(Checkout);
