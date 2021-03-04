import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'




class App extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={'/'} exact component={BurgerBuilder} />
            <Route path={'/checkout'} component={Checkout} />
            <Route render={() => <h1> component not found</h1>} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
