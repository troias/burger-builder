import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
    //show burger then cancel or continue button
    return (
        <div className={classes.CheckoutSummary}>
            <h1>
                Hope the burger is goood
            </h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Success">Confirm</Button>
            <Button btnType="Danger">Cancel</Button>
            
        </div>
    )
}

export default checkoutSummary