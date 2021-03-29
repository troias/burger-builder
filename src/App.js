import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import asyncComponent from './hoc/asyncComponents/asyncComponent'
import LogOut from './containers/Auth/LogOut/LogOut'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})


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
      <Route path={'/auth'} component={asyncAuth} />
      <Route path={'/'} exact component={BurgerBuilder} />
      <Redirect to={'/'} />
    </Switch>
    
    )
    

    if (this.props.isAuthenticated) {
          routes = (
            <Switch>
              <Route path={'/checkout'}  component={asyncCheckout} />
              <Route path={'/logout'}  component={LogOut} />
              <Route path={'/orders'} component={asyncOrders} />
              <Route path={'/auth'}  component={asyncAuth} />
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

