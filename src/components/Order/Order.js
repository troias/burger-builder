import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    let ingredient = []

    for ( const x in props.ingredients) {
        ingredient.push({
            name: x, 
            amount: props.ingredients[x]
        })
    }
    const ingredientsOutput = ingredient.map(x => {
        return (
            <div>
                <span> {x.name} </span>
                <span> {x.amount} </span>
            </div>
        )
    })
 



    return (
        <div className={classes.Order}>
            <h4>Ingredients: {ingredientsOutput}</h4>  
            <p>Price: <span><strong> NZD{props.price.toFixed(2)}</strong> </span></p>
        </div>
    )

}

export default order

