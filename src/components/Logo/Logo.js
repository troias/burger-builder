import Logo from "../../assets/images/burger-logo.png"
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img 
            className={classes.img}
            style={{height: props.height}}
            src={Logo}
            alt="burger"
            />
           
            
    </div>
)

export default logo