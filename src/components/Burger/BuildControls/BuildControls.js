import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls =  [
    { label: 'salad', type: 'salad'}, 
    { label: 'bacon', type: 'bacon'}, 
    { label: 'cheese', type: 'cheese'}, 
    { label: 'Meat', type: 'meat'},
    
]

const buildControls = (props) => (
    
    <div className={classes.buildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
       {controls.map(x => (
           <BuildControl 
           key={x.label} 
           label={x.label} 
           added={() => props.add(x.type)} 
           disabled={props.disabled[x.type]}
           removed={() => props.remove(x.type)} />
       ))}
       <div className={classes.ButtonBox}> 
       <button 
         className={classes.OrderButton} 
         disabled={!props.purchaseable}
         onClick={props.ordered}> 
        {props.isAuth ? "Order Now" : "Sign up to order"} 
       </button>
       </div>
       
    </div>
   
)

export default buildControls