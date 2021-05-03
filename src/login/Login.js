import React, { Component } from 'react'
import './Login.css';

export default class Login extends Component {
    state = {
        login: '',
        senha: ''
    }

    txtLogin_change = (event) => {
        this.setState({login: event.target.value});
    }

    txtSenha_change = (event) => {
        this.setState({senha: event.target.value});
    }

    login = () => {
        const url = window.servidor + '/usuario/consultar'
        fetch(url)
            .then(response => response.json())
    }

    render() {
        return (
            <div className="container display-flex-basic">
                <div className="box-login display-flex-basic">
                    <div className="mb-3">
                        <h1>Login</h1>
                    </div>
                    
                    <form>
                        <div className="form-group mb-3">
                            <label for="usuario" className="form-label">Usuário</label>
                            <input type="text" className="form-control" id="usuario" placeholder="Usuário" required/>
                        </div>

                        <div className="form-group mb-3">
                            <label for="senha" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="senha" placeholder="Senha" required/>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mt-2">Entrar</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }
}
