import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import LogOut from './containers/Auth/LogOut/LogOut'




class App extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout} />
            <Route path={'/orders'} component={Orders} />
            <Route path={'/auth'} exact component={Auth} />
            <Route path={'/logout'} exact component={LogOut} />
            <Route path={'/'} exact component={BurgerBuilder} />
            <Route render={() => <h1> component not found</h1>} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
