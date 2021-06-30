import React, { Component } from 'react'
import Menu from './menu/Menu'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Grupo from './grupo/Grupo'
import Login from './login/Login'
import Usuario from './usuario/Usuario'
import AgendaEventos from './agendaeventos/AgendaEventos'
import Evento from './eventos/Evento'
import Home from './home/Home'

export default class App extends Component {

  state = {
    login: '',
    senha: '',
    usuario: [],
    autenticou: false
  }

  autenticar = (usuarioLogin, usuarioSenha) => {

    const url = window.servidor + '/usuario/login/' + usuarioLogin + '/' + usuarioSenha;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ usuario: data })
        this.setState({ login: usuarioLogin, senha: usuarioSenha, autenticou: true });
        console.log(data);
        return true
      })
      .catch(erro => {
        console.log(erro)
        return false;
      });

    return true;
  }

  logout = () => {
    this.setState({ autenticou: false })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Menu logado={this.state.autenticou} logout={this.logout} />

          <Switch>
            <Route path="/login">
              <Login logar={this.autenticar} />
            </Route>
            <Route path="/grupo">
              <Grupo />
            </Route>
            <Route path="/agenda">
              <AgendaEventos />
            </Route>
            <Route path="/usuario">
              <Usuario />
            </Route>
            <Route path="/evento">
              <Evento />
            </Route>
          </Switch>

          <Home />

        </div>
      </BrowserRouter>
      )
    }
}