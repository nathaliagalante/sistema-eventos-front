import React, { Component } from 'react'
import { Redirect } from 'react-router';
import './Login.css';

export default class Login extends Component {
    state = {
        login: '',
        senha: '',
        logado: false
    }

    txtLogin_change = (event) => {
        this.setState({login: event.target.value});
    }

    txtSenha_change = (event) => {
        this.setState({senha: event.target.value});
    }

    handleLogin = () => {
       let res = this.props.logar(this.state.login, this.state.senha);

       console.log(res);

       if(res) {
           this.setState({ logado: true });
            console.log('redirecionando...');
       }else alert('login ou senha incorretos!');
    }

    render() {
        if(this.state.logado){
            return <Redirect to="/agenda" />
        }else{
            return (
                <div className="container display-flex-basic">
                    <div className="box-login display-flex-basic">
                        <div className="mb-3">
                            <h1>Login</h1>
                        </div>
                        
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="usuario" className="form-label">Usuário</label>
                                <input value={this.state.login} onChange={this.txtLogin_change} type="text" className="form-control" id="usuario" placeholder="Usuário" required/>
                            </div>
    
                            <div className="form-group mb-3">
                                <label htmlFor="senha" className="form-label">Senha</label>
                                <input value={this.state.senha} onChange={this.txtSenha_change} type="password" className="form-control" id="senha" placeholder="Senha" required/>
                            </div>
    
                            <div className="form-group">
                                <button type="button" onClick={() => this.handleLogin()} className="btn btn-primary mt-2 form-control">Entrar</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            )
        }

        
    }
}
