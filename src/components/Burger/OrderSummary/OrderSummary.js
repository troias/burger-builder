
import Aux from '../../../hoc/Auxillary/Auxillary';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';


const OrderSummary = props =>  {

        const ingredientSummary = Object.keys(props.ingredients).map((x, i) => {
            return <li key={x + i}><span style={{ textTransform: 'capitalize' }}>{x}: {props.ingredients[x]} </span></li>
        })
        return (
            <Aux>
                <button onClick={props.close}>Close</button>
                <h3> You Order </h3>
                <p> burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <div className={classes.orderButton}>
                    <Button
                        clicked={props.continue}
                        btnType="Success">Check out</Button>
                    <Button
                        clicked={props.close}
                        btnType="Danger">Cancel</Button>
                </div>
            </Aux>
        )
}


export default OrderSummary