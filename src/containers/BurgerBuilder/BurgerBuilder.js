
import React from 'react'
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3, 
    bacon: 0.7,
}



class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0, 
                bacon: 0, 
                cheese: 2, 
                meat: 0 ,
            }, 
            totalPrice: 4,
        }
    }

    addIngredientHandler = (type) => {
        //variable holding a copy of old ingredient 
        const oldCount = this.state.ingredients[type];
        //new count 
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients 
        })
    }

    removeIngredientHandler = (type) => {
                //variable holding a copy of old ingredient 
                const oldCount = this.state.ingredients[type];
                if (oldCount <= 0 ) {
                    return;
                }
                //new count 
                const updatedCount = oldCount - 1;
                const updatedIngredients = {
                    ...this.state.ingredients
                }
                updatedIngredients[type] = updatedCount;
                const priceAddition = INGREDIENT_PRICES[type];
                const oldPrice = this.state.totalPrice;
                const newPrice = oldPrice - priceAddition;
                this.setState({
                    totalPrice: newPrice, 
                    ingredients: updatedIngredients 
                })
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div> 
                   <BuildControls add={this.addIngredientHandler}  remove={this.removeIngredientHandler} />
                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder