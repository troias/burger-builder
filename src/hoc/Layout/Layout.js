import React, { useState } from 'react'
import { connect } from 'react-redux'
import Aux from '../Auxillary/Auxillary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


const Layout = (props) => {

    const [showSideDrawer, setshowSideDrawer] = useState(false)


    const sideDrawerClosedHandler = () => {
    setshowSideDrawer(false)
    }

    const sideDrawToggleHandler = () => {
        setshowSideDrawer(!showSideDrawer)
    }


    

        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuth}
                    open={sideDrawToggleHandler}
                />
                <SideDrawer
                    isAuth={props.isAuth}
                    open={showSideDrawer}
                    close={sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )

}


const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)