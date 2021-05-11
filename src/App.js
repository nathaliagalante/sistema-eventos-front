import React, { Component } from 'react'
import Menu from './menu/Menu'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Grupo from './grupo/Grupo'
import Login from './login/Login'
import Usuario from './usuario/Usuario'
import AgendaEventos from './agendaeventos/AgendaEventos'
import Evento from './eventos/Evento'

export default class App extends Component {

    state = {
        login: '',
        senha: '',
        dados: [],
        autenticou: false
    }

    fetchData() {
        const data = {
            "login": this.state.login,
            "senha": this.state.senha
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const url = window.servidor + '/usuario/login'

        fetch(url, requestOptions)
            .then(response => {
                response.json()
                console.log(response)
            })
            .then(data => this.setState({ dados: data }))
            .catch(erro => console.log(erro));
    }

    autenticar = (usuarioLogin, usuarioSenha) => {
        this.fetchData();

        if (usuarioLogin === this.state.dados.login && usuarioSenha === this.state.dados.senha) {
            this.setState({ login: usuarioLogin, senha: usuarioSenha, autenticou: true });

            return true;

        } else return false;
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <Menu />
                    <Switch>
                        <Route path="/login">
                            <Login logar={this.autenticar} />
                        </Route>
                        <Route path="/grupo">
                            <Grupo />
                        </Route>
                        <Route exact path="/">
                            {this.state.autenticou ? <Redirect to="/agenda" /> : <Login />}
                        </Route>
                        <Route exact path="/agenda">
                            <AgendaEventos />
                        </Route>
                        <Route path="/usuario">
                            <Usuario />
                        </Route>
                        <Route path="/evento">
                            <Evento />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }
}