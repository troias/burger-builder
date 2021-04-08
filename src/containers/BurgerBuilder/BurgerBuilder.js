import React, { useState, useEffect} from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorandler";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../BurgerBuilder/BurgerBuilderActions/BurgerBuilderActions";
import * as actionCreators from '../../store/actions/index'

export const BurgerBuilder = props => {

  const [loading, setLoading] = useState(false)
  const [purchasing, setPurchasing] = useState(false)


  useEffect(() => {
      props.addInitialIngredients()
  }, [])
  

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirect('/checkout')
      props.history.push('/auth')
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push("/checkout")
  };

  
    const disableInfo = {
      ...props.ings,
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p> app is fucked </p> : <Spinner />;

    if (props.ings) {
      orderSummary = (
        <OrderSummary
          price={props.price}
          ingredients={props.ings}
          close={purchaseCancelHandler}
          continue={purchaseContinueHandler}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            add={props.onAddIngredients}
            remove={props.onRemoveIngredients}
            disabled={disableInfo}
            purchaseable={updatePurchaseState(props.ings)}
            price={props.price}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
            // this.props.onPurcaseable(this.props.ings
          />
        </Aux>
      );
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} remove={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  
}

const matchStateToProps = (state) => {
  return {
    ings: state.ing.ingredients,
    price: state.ing.totalPrice,
    error: state.ing.error, 
    isAuthenticated: state.auth.token !== null, 
   
  };
};



export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, instance));
