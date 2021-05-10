import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import Select from 'react-select'

export default class Usuario extends Component {
    state = {
        id: "",
        nomeCompleto: "",
        sexo: "",
        endereco: "",
        dataNascimento: new Date(),
        login: "",
        senha: "",
        nivelAcesso: "",
        usuarios: [],
        incluindo: false,
        alterando: false,
        analisando: false,
        isClearable: true,
        isDisabled: false,
        isSearchable: true,
        opcaoSelecionada: null,
    }

    txtNomeCompleto_change = (event) => {
        this.setState({nomeCompleto: event.target.value})
    }

    txtSexo_change = (event) => {
        this.setState({sexo: event.target.value})
    }

    txtEndereco_change = (event) => {
        this.setState({endereco: event.target.value})
    }
    dataNascimento_change = (date) => {
        this.setState({dataNascimento: date})
    }

    txtLogin_change = (event) => {
        this.setState({login: event.target.value})
    }

    txtSenha_change = (event) => {
        this.setState({senha: event.target.value})
    }

    cadastrarNovo = () => {
        this.setState({ incluindo: true, nomeCompleto: '', sexo: '', endereco: '', login: '', senha: '', dataNascimento: new Date()})
    }

    alterarNovo = (usuario) => {
        this.setState({ alterando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento })
    }

    verDetalhes = (usuario) => {
        this.setState({ analisando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento })
    }

    gravarNovo = () => {
        const dados = {
            "nomeCompleto": this.state.nomeCompleto,
            "sexo": this.state.sexo,
            "dataNascimento": this.state.dataNascimento,
            "endereco": this.state.endereco,
            "login": this.state.login,
            "senha": this.state.senha
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/gravar'

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ incluindo: false })
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }

    gravarAlterar = () => {
        const dados = {
            "nomeCompleto": this.state.nomeCompleto,
            "sexo": this.state.sexo,
            "dataNascimento": this.state.dataNascimento,
            "endereco": this.state.endereco,
            "login": this.state.login,
            "senha": this.state.senha
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/alterar/' + this.state.id

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ alterando: false })
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }

    excluirUsuario = (usuario) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/usuario/excluir/' + usuario.id

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }



    preencherListaUsuario = () => {
        const url = window.servidor + '/usuario/consultar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ usuarios: data }));
    }

    componentDidMount() {
        this.preencherListaUsuario()
    }

    voltar = () => {
        this.setState({ incluindo: false, alterando: false, analisando: false})
    }

    renderCadastrarUsuario = () => {
        return (
            <div className="row mt-5 pt-4">
                <div>
                    <h5>Cadastro de Usuário</h5>
                </div>

                <div className="col-2">
                    Nome Completo:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.nomeCompleto} onChange={this.txtNomeCompleto_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Sexo:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="sexo" id="sexoMasc" value="Masculino" onChange={this.txtSexo_change}></input>
                            <label class="form-check-label" for="sexoMasc">Masculino</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="sexo" id="sexoFem" value="Feminino"  onChange={this.txtSexo_change}></input>
                            <label class="form-check-label" for="sexoFem">Feminino</label>
                        </div>
                    </div>    
                </div>

                <div className="col-2">
                    Data de Nascimento:
                </div>
                <div className="row mt-2">
                    <div className="col-2">
                        <DatePicker value={this.state.dataNascimento} onChange={this.dataNascimento_change}></DatePicker>
                    </div>
                </div>

                <div className="col-2">
                    Endereço:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.endereco} onChange={this.txtEndereco_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Login:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.login} onChange={this.txtLogin_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Senha:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control name-pull-image" type="password" placeholder="Senha"></input>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={() => this.gravarNovo()}>Gravar</button>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderAlterarUsuario = () => {
        return (
            <div className="row mt-5 pt-4">
                <div>
                    <h5>Alteração de Usuário</h5>
                </div>

                <div className="col-2">
                    ID:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.id} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Nome Completo:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.nomeCompleto} onChange={this.txtNomeCompleto_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Sexo:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.sexo} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Data de Nascimento:
                </div>
                <div className="row mt-2">
                    <div className="col-2">
                        <DatePicker value={this.state.dataNascimento} onChange={this.dataNascimento_change}></DatePicker>
                    </div>
                </div>

                <div className="col-2">
                    Endereço:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.endereco} onChange={this.txtEndereco_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Login:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.login} onChange={this.txtLogin_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Senha:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control name-pull-image" type="password" placeholder="Senha"></input>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={() => this.gravarAlterar()}>Gravar</button>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderVerDetalhes = () => {
        return (
            <div className="row mt-5 pt-4">
                <div>
                    <h5>Detalhes do Usuário</h5>
                </div>

                <div className="col-2">
                    ID:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.id} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Nome Completo:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.nomeCompleto} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Sexo:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.sexo} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Data de Nascimento:
                </div>
                <div className="row mt-2">
                    <div className="col-2">
                        <DatePicker value={this.state.dataNascimento} disabled={true}></DatePicker>
                    </div>
                </div>

                <div className="col-2">
                    Endereço:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.endereco} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Login:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.login} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>

                <div className="col-2">
                    Senha:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.senha} readOnly={true} className="form-control name-pull-image" type="password" placeholder="Senha"></input>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderExibirListaUsuarios = () => {
        return (
            <div className="mt-5 pt-3">
                <div className="col-1">
                    <button type="button" className="btn btn-outline-primary mt-2" onClick={() => this.cadastrarNovo()}>Cadastrar</button>
                </div>
                
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome Completo</th>
                            <th scope="col">Data de Nascimento</th>  
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>  
                                                    
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios && this.state.usuarios.map(usuario => {
                            return <tr key={usuario.id}>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nomeCompleto}</td>
                                <td>{usuario.dataNascimento}</td>
                                <td><button type="button" onClick={() => this.verDetalhes(usuario)} className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Ver Mais"><i className="bi bi-three-dots"></i></button></td>
                                <td><button type="button" onClick={() => this.alterarNovo(usuario)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar Usuário"><i className="bi bi-pencil-square"></i></button></td>
                                <td><button type="button" onClick={() => this.excluirUsuario(usuario)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir Usuário"><i className="bi bi-trash"></i></button></td>                                                                
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        let pagina = ''
        if (this.state.incluindo) {
            pagina = this.renderCadastrarUsuario()
        } else {
            if (this.state.alterando) {
                pagina = this.renderAlterarUsuario()
            } else {
                if (this.state.analisando) {
                    pagina = this.renderVerDetalhes()
                }
                else {
                    pagina = this.renderExibirListaUsuarios()
                }
                
                }
        }
        return pagina  
    }
}
