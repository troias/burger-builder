import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import instance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Form from "../../../components/UI/Forms/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorandler'
import * as actionCreators from '../../../store/actions/index'
import { updateObject } from '../../../shared/utility'
import { checkValidationHandler} from '../../../shared/utility'

const  initialState = {
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Name",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  street: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Street",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  zip: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "ZIP",
    },
    value: "",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 6,
    },

    valid: false,
    touched: false,
  },
  country: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Country",
    },
    value: "",
    validation: {
      required: true,
    },

    valid: false,
    touched: false,
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Email",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  deliveryMethod: {
    elementType: "select",
    elementConfig: {
      options: [
        {
          value: "fastest",
          displayValue: "fastest",
        },
        {
          value: "cheapest",
          displayValue: "cheapest",
        },
      ],
    },
    value: "cheapest",
    validation: {},
    valid: true,
  }
}

const ContactData = props => {

  const [orderForm, setForm] = useState(initialState);
  const [formIsValid, setFormValidity] = useState(false);

  const orderhandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const obj = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(obj, props.token)
  };

  const changedHandler = (event, id) => {
   
    //copy of nested objs
    const updatedOrderFormEl = updateObject(orderForm[id], {
     
     value: event.target.value ,
     valid: checkValidationHandler( event.target.value, orderForm[id].validation),
     touched:  true,
     
    })

    const updatedOrderForm = updateObject(orderForm, {
      [id]: updatedOrderFormEl,
    })
    
    let formIsValid = true;

    for (let x in updatedOrderForm) {
      formIsValid = updatedOrderForm[x].valid && formIsValid;
    }
    setForm(updatedOrderForm)
    setFormValidity(true)
  ;
  };

    const orderFormEl = [];
    for (let x in orderForm) {
      orderFormEl.push({
        id: x,
        config: orderForm[x],
      });
    }

    let form = (
      <form onSubmit={orderhandler}>
        {orderFormEl.map((x) => {
          return (
            <Form
              key={x.id}
              elementType={x.config.elementType}
              elementConfig={x.config.elementConfig}
              value={x.config.value}
              invalid={!x.config.valid}
              shouldValidate={x.config.validation}
              touched={x.config.touched}
              valueType={x.id}
              changed={(event) => changedHandler(event, x.id)}
            />
          );
        })}
        <Button
          disabled={!formIsValid}
          btnType="Success"
          clicked={orderhandler}
        >
          Order
        </Button>
      </form>
    );
    if (props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4> Enter your contact Data </h4>
        {form}
      </div>
    );
  
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.ing.ingredients,
    price: state.ing.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userID
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurgerSuccess(orderData, token))
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, instance))
