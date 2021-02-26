import classes from './Menu.module.css'

const menu = (props) => {



    return (
        <div className={classes.Menu}
             onClick={props.click}>
                 <div></div>
                 <div></div>
                 <div></div>
        </div>
        
        
  
    )
}




export default menu;
