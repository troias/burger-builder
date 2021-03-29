import React from "react";
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



class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false
    };
  }

  componentDidMount() {
      this.props.addInitialIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirect('/checkout')
      this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = (props) => {
    this.props.onInitPurchase()
    this.props.history.push("/checkout");

  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
     
  

    let burger = this.props.error ? <p> app is fucked </p> : <Spinner />;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          close={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
        />
      );

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
            isAuth={this.props.isAuthenticated}
            // this.props.onPurcaseable(this.props.ings
          />
        </Aux>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} remove={this.closeHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ings: state.ing.ingredients,
    price: state.ing.totalPrice,
    error: state.ing.error, 
    isAuthenticated: state.auth.token !== null, 
    building: state.ing.building, 
    purchased: state.ing.purchased
  };
};
export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, instance));
