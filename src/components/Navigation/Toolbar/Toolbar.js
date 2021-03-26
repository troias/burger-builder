import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavigationItems/NavigationItems'

import Menu from '../../Navigation/Menu/Menu'

const toolbar = (props) => (
    <header className={classes.Toolbar}> 
      
            <Menu click={props.open}/>
    
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
         <NavItems isAuthenticated={props.isAuth}/>
        </nav>
        
    </header>
);

export default toolbar