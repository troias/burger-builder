import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { withRouter } from 'react-router-dom'

const burger = (props) => {

    //  variable that returns a jsx element/array/s based on the key value 
   
    let x = Object.keys(props.ingredients).map(x => {
        return [...Array(props.ingredients[x])].map((q, i) => {
            return  <BurgerIngredient key={x + i} type={x} />
          
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, [])
  

    if (x.length === 0) {
        x = <p> Please Add ingredients </p>;
    }

    
    return (
        <div className={classes.Burger}> 
            <BurgerIngredient type="bread-top" />
         {x}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger)