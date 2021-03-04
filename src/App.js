import React from 'react'
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
          <BurgerBuilder /> 
          <Checkout/>
        </Layout>
      </div>
    )
  }
}

export default App;
