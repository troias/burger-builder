
import React from 'react'
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 2, 
                bacon: 1, 
                cheese: 3, 
                meat: 4,
            }
        }
    }

    render() {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div> 
                    Build Controls 
                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder