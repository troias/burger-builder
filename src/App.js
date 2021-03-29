import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import LogOut from './containers/Auth/LogOut/LogOut'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'


class App extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {

    let routes = (
      <Switch>
      <Route path={'/auth'} component={Auth} />
      <Route path={'/'} exact component={BurgerBuilder} />
      <Redirect to={'/'} />
    </Switch>
    
    )
    

    if (this.props.isAuthenticated) {
          routes = (
            <Switch>
              <Route path={'/checkout'}  component={Checkout} />
              <Route path={'/logout'}  component={LogOut} />
              <Route path={'/orders'} component={Orders} />
              <Route path={'/auth'}  component={Auth} />
              <Route path={'/'} exact component={BurgerBuilder} />
              <Redirect to={'/'} />
            </Switch>
          )
        }


    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    )
  }

}



const mapStateToProps = state => {
  return {
          isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
          onTryAutoSignUp: () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

