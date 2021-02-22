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
       {controls.map(x => (
           <BuildControl 
           key={x.label} 
           label={x.label} 
           added={() => props.add(x.type)} 
           removed={() => props.remove(x.type)} />
       ))}
    </div>
   
)

export default buildControls