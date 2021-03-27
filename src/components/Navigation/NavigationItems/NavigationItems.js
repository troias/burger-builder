import classes from "./NavigationItems.module.css"
import NavItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>

        <NavItem link="/"> Burger Builder </NavItem>
        { props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
        { props.isAuthenticated ? <NavItem link="/logout">Log Out</NavItem> : <NavItem link="/auth">Authentication</NavItem>}
    </ul>
)

export default navigationItems