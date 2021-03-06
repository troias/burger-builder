import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    let ingredients = []
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })

    }
    const ingredientoutput = ingredients.map(x => {
        return (
            <span 
            key={x.name}
            style={{ 
                textTransform: 'capitalize',
                display: 'inline-block', 
                margin: '0 8px', 
                border: '1px solid #ccc', 
                padding: '5px'
            }}>
              {x.name}
              ({x.amount})
            </span>

        )
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientoutput}  </p>
            <p>Price: <strong> NZD{Number.parseFloat(props.price.toFixed(2))}</strong></p>
        </div>
    )

}

export default order

