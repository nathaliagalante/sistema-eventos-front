import React, { Component } from 'react'
import Menu from './menu/Menu'
import Rodape from './rodape/Rodape'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Grupo from './grupo/Grupo'
import Login from './login/Login'
import AgendaEventos from './agendaeventos/AgendaEventos'
import Usuario from './usuario/Usuario'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Menu />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/grupo">
              <Grupo />
            </Route>
            <Route path="/usuario">
              <Usuario />
            </Route>
            <Route path="/agenda">
              <AgendaEventos />
            </Route>
          </Switch>

          <Rodape />
        </div>
      </BrowserRouter>

    )
  }
}