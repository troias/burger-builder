import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    //  variable that returns a jsx element/array/s based on the key value 

    const x = Object.keys(props.ingredients).map(x => {
        return [...Array(props.ingredients[x])].map((q, i) =>{
            return  <BurgerIngredient key={x + i} type={x} />
        })
    })
   
    //  gets keys 

    //  return array of keys -

    //  create new arrays of  based on the amount ob keys and the amount of values

    //  put jsx elements into that array

    // create and array for each key 

    

    
    return (
        <div className={classes.Burger}> 
            <BurgerIngredient type="bread-top" />
         {x}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger