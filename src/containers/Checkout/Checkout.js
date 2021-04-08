import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";


const Checkout = props =>  {
  
  const onCheckoutSuccessHandler = () => {
    props.history.replace("/checkout/contact-data");
  };
  
  const onCheckoutCancelledHandler = () => {
    // this.props.history.push('/')
    props.history.goBack();
  };


    let summary = <Redirect to="/" />
    if (props.ings) {
      const purchasedRedirect =  props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ings}
            onCheckoutCancelled={onCheckoutCancelledHandler}
            onCheckoutSuccess={onCheckoutSuccessHandler} />
          <Route
            path={props.match.path + "/contact-data"}
            component={ContactData} />
        </div>
      )
    }
    return summary

  
}
const matchStateToProps = (state) => {
  return {
    ings: state.ing.ingredients,
    purchased: state.order.purchased
  };
};



export default connect(matchStateToProps)(Checkout);
