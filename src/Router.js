import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './scenes/Home'

const Router = () => (
  <div>
    <Route
      exact
      path="/"
      children={({ location }) => (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      )}
    />
  </div>
)

export default Router