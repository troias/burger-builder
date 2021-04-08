import React, { useState, useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorandler";


import * as actionCreators from '../../store/actions/index'



export const BurgerBuilder = props => {

    const dispatch = useDispatch()
  
    const onAddIngredients = (ingName) => dispatch(actionCreators.addIngredients(ingName))
    const onRemoveIngredients = (ingName) => dispatch(actionCreators.removeIngredients(ingName))
    const addInitialIngredients = useCallback(() => dispatch (actionCreators.addInitialIngredients()), [])
    const onInitPurchase = () => dispatch(actionCreators.purchaseInit())
    const onSetAuthRedirect = (path) => dispatch(actionCreators.setAuthRedirectPath(path))

    const ings = useSelector(state => {
      return state.ing.ingredients
    })
    const price = useSelector(state => {
      return state.ing.totalPrice
    })
    const error = useSelector(state => {
      return state.ing.error
    })
    const isAuthenticated = useSelector(state => {
      return state.auth.token !== null
    }) 


  const [loading, setLoading] = useState(false)

  const [purchasing, setPurchasing] = useState(false)




  useEffect(() => {
      addInitialIngredients()
  }, [addInitialIngredients])
  

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
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirect('/checkout')
      props.history.push('/auth')
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  };

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push("/checkout")
  };

  
    const disableInfo = {
      ...ings,
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p> app is fucked </p> : <Spinner />;

    if (ings) {
      orderSummary = (
        <OrderSummary
          price={price}
          ingredients={ings}
          close={purchaseCancelHandler}
          continue={purchaseContinueHandler}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            add={onAddIngredients}
            remove={onRemoveIngredients}
            disabled={disableInfo}
            purchaseable={updatePurchaseState(ings)}
            price={price}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
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




export default withErrorHandler(BurgerBuilder, instance);
