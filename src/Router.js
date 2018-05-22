import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Layout from './components/Layout'
import Home from './scenes/Home'
import Tokens from './scenes/Tokens'
import history from './history'

const Router = () => (
  <div>
    <ConnectedRouter history={history}>
      <Route
        exact
        path="/"
        children={({ location }) => (
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/tokens" component={Tokens} />
            </Switch>
          </Layout>
        )}
      />
    </ConnectedRouter>
  </div>
)

export default Router