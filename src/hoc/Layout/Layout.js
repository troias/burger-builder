import React from 'react'
import Aux from '../Auxillary/Auxillary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
 
class Layout extends React.Component  {

    state = { 
        showSideDrawer: false,

    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false })
    }

    sideDrawToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer}
        }
        )
    }

  
 render() {
    
     return (
        <Aux>
            <Toolbar 
                open={this.sideDrawToggleHandler} 
                />
            <SideDrawer 
                open={this.state.showSideDrawer}
                close={this.sideDrawerClosedHandler}
                />
        <main className={classes.Content}> 
            {this.props.children} 
        </main>
        </Aux>
     )
 }
}
  


export default Layout