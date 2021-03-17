import React from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instance from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorandler'
import axios from "axios";
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../BurgerBuilder/BurgerBuilderActions/BurgerBuilderActions'

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      error: false
    };

  }

  updatePurchaseState ( ingredients ) {
    const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
    return sum > 0;
}


  purchaseContinueHandler = (props) => {
    const queryParam = []
    for (let i in this.state.ingredients) {
      queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParam.push('price=' +  this.state.totalPrice)
    const queryString = queryParam.join('&')

    this.props.history.push({
      pathname: 'checkout', 
      search: '?' + queryString
    })
  }

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null

    let burger = this.state.error? <p> app is fucked </p> : <Spinner />

    if (this.props.ings) {



      orderSummary = <OrderSummary
        price={this.props.price}
        ingredients={this.props.ings}
        close={this.closeHandler}
        continue={this.purchaseContinueHandler} />


      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            add={this.props.onAddIngredients}
            remove={this.props.onRemoveIngredients}
            disabled={disableInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
            // this.props.onPurcaseable(this.props.ings
          />
        </Aux>
      )
    }



    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} remove={this.closeHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const matchStateToProps = state => {
  return {
    ings: state.ing.ingredients,
    price: state.ing.totalPrice,
    purchase: state.ui.purchasing
  }
  
}
export default connect(matchStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, instance));
