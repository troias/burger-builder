import React from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';


class OrderSummary extends React.Component {

    componentDidUpdate() {
        console.log('[OrderSummary] - Component did update')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((x, i) => {
            return <li key={x + i}><span style={{ textTransform: 'capitalize' }}>{x}: {this.props.ingredients[x]} </span></li>
        })
        return (

            <Aux>
                <button onClick={this.props.close}>Close</button>
                <h3> You Order </h3>
                <p> burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <div className={classes.orderButton}>
                    <Button
                        clicked={this.props.continue}
                        btnType="Success">Check out</Button>
                    <Button
                        clicked={this.props.close}
                        btnType="Danger">Cancel</Button>
                </div>

            </Aux>
        )
    }

}


export default OrderSummary