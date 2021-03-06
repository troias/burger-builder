import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from "react-router-dom"
import ContactData from './ContactData/ContactData'


class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: null, 
            totalPrice: null, 
        }
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0
        for (let x of query.entries()) {
            if (x[0] === 'price') {
                price = +x[1]
            } else {
                ingredients[x[0]] = +x[1]
            }
         
        }
        this.setState({
            ingredients: ingredients, 
            totalPrice: price
        })

    }

    onCheckoutSuccessHandler = () => {

        this.props.history.replace('/checkout/contact-data')
    }
    onCheckoutCancelledHandler = () => {
        // this.props.history.push('/')
        this.props.history.goBack()
    }

  

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutSuccess={this.onCheckoutSuccessHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        {...props}/>)}
                    />
            </div>
        )
    }

    // summary of checkout

}

export default Checkout