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

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false, 
      error: false
    };
  }

  componentDidMount() {
  
    axios.get('https://react-my-burger-8f966-default-rtdb.firebaseio.com/ingrediens.json').then(x => {
      this.setState({
        ingredients: x.data
      })
    }).catch(err => {
      this.setState({
        error: true
      })
    })
  }

  updatePurchaseState = (ingredients) => {
    //0 if no ingredients
    const sum = Object.keys(ingredients)
      .map((x) => {
        return ingredients[x];

        //returns an array of value
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchaseable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    //variable holding a copy of old ingredient
    const oldCount = this.state.ingredients[type];
    //new count
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    //variable holding a copy of old ingredient
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    //new count
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
   
  };


  closeHandler = () => {
    this.setState({
      purchasing: false,
    });
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
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null

  



    let burger = this.state.error? <p> app is fucked </p> : <Spinner />

    if (this.state.ingredients) {

      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        close={this.closeHandler}
        continue={this.purchaseContinueHandler} />

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabled={disableInfo}
            purchaseable={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
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

export default withErrorHandler(BurgerBuilder, instance);
