import Aux from '../../../hoc/Auxillary'
import classes from './OrderSummary.module.css'


const orderSummary = (props) => {

        const ingredientSummary = Object.keys(props.ingredients).map((x, i) => {
            return <li key={x + i }><span style={{textTransform: 'capitalize'}}>{x}: {props.ingredients[x]} </span></li>
        })

        return(
        <Aux>
            <button onClick={props.close}>Close</button>
            <h3> You Order </h3>
            <p> burger with the following ingredients:</p>
            <ul>
              {ingredientSummary}
            </ul>
            <div className={classes.orderButton}>
                <button >Check out</button>
            </div>
            
        </Aux>
        )
}

export default orderSummary