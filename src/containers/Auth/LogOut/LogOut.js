import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import * as actionCreators from '../../../store/actions/index'



const Logout = props => {

    const { onLogout } = props

    useEffect(() => {
        onLogout()
    }, [onLogout])

 
        return <Redirect to="/"/> 
    }


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
