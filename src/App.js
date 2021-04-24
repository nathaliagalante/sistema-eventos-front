import React, { Component } from 'react'
import Menu from './menu/Menu'
import Home from './home/Home'
import Rodape from './rodape/Rodape'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Grupo from './grupo/Grupo'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Menu />
          
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/grupo">
              <Grupo />
            </Route>
          </Switch>

          <Rodape />
        </div>
      </BrowserRouter>

    )
  }
}