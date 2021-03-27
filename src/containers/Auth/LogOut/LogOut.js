import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import * as actionCreators from '../../../store/actions/index'



class Logout extends React.Component {

    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to="/"/> 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
