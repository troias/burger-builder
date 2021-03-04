import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'


class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: {
                salad: 1,
                cheese: 1, 
                bacon: 1, 
                meat: 1
            }
        }
    }

    render() {
        return (
            <div>
                     <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        )
    }

// summary of checkout

}

export default Checkout