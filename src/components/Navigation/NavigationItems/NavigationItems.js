import classes from "./NavigationItems.module.css"
import NavItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
           <NavItem link="/" active> Burger Builder </NavItem>
           <NavItem link="/"> Checkout</NavItem>
    </ul>
)

export default navigationItems