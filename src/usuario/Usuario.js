import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import Select from 'react-select'
import './Usuario.css';

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
        telefoneDDD: "",
        telefoneNumero: "",
        parente: "",
        tiposUsuario: [],
        parentesOpcoes: [],
        parentes: [],
        telefones: [],
        usuarios: [],
        incluindo: false,
        alterando: false,
        analisando: false,
        gerenciando: false,
        options: [
            { value: 'Membro', label: 'Membro' },
            { value: 'Administrador', label: 'Administrador' }
        ]
    }
    

    /* ------------------------------------------------- SET STATE --------------------------------------------- */
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

    nivelAcesso_change = (temp) => {
        this.setState({nivelAcesso: temp})
    }

    parente_change = (temp) => {
        this.setState({parente: temp})
    }

    txtTelefoneDDD_change = (event) => {
        this.setState({telefoneDDD: event.target.value})
    }

    txtTelefoneNumero_change = (event) => {
        this.setState({telefoneNumero: event.target.value})
    }

    /* ------------------------------------------------- FUNCIONALIDADES --------------------------------------------- */

    /* ----- CADASTRAR USUÁRIO ----- */
    cadastrarNovo = () => {
        this.setState({ incluindo: true, nomeCompleto: '', sexo: '', endereco: '', login: '', senha: '', dataNascimento: new Date(), nivelAcesso: "", telefones: [], parentes: []})
    }

    /* ----- ALTERAR USUÁRIO ----- */
    alterarNovo = (usuario) => {
        this.setState({ alterando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento, nivelAcesso: usuario.nivelAcesso, telefones: usuario.telefones, parentes: usuario.parentes })
        this.preencherTelefones(usuario.id)
        this.preencherParentes(usuario.id)
    }

    /* ----- VER DETALHES ----- */
    verDetalhes = (usuario) => {
        this.setState({ analisando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento, nivelAcesso: usuario.nivelAcesso, telefones: usuario.telefones, parentes: usuario.parentes })
        this.preencherTelefones(usuario.id)
        this.preencherParentes(usuario.id)
    }

    /* ----- GERENCIAR USUÁRIO ----- */
    gerenciarUsuario = (usuario) => {
        this.setState({ gerenciando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento, nivelAcesso: usuario.nivelAcesso, telefones: usuario.telefones, parentes: usuario.parentes, parente: "", telefoneDDD: "", telefoneNumero: ""})
        this.preencherTelefones(usuario.id)
        this.preencherParentes(usuario.id)
        this.preencherParentesOpcoes(usuario.id);
    }

    /* ----- PREENCHER COMBOBOX NIVEL ACESSO ----- */
    preencherComboboxNivelAcesso = () => {
        const url = window.servidor + '/usuario/listarNivelAcesso'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ tiposUsuario: data }))
    }

    /* ----- PREENCHER TELEFONES ----- */
    preencherTelefones = (usuarioID) => {
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/telefone/listar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ telefones: data }))
    }

    /* ----- PREENCHER PARENTES ----- */
    preencherParentes = (usuarioID) => {
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/listar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ parentes: data }))
    }

    /* ----- PREENCHER PARENTES OPÇOES ----- */
    preencherParentesOpcoes = (usuarioID) => {
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/listarOpcoes'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ parentesOpcoes: data }))
    }

    /* ----- GRAVAR NOVO USUÁRIO ----- */
    gravarNovo = () => {
        const dados = {
            "nomeCompleto": this.state.nomeCompleto,
            "sexo": this.state.sexo,
            "dataNascimento": this.state.dataNascimento,
            "endereco": this.state.endereco,
            "login": this.state.login,
            "senha": this.state.senha,
            "nivelAcesso": this.state.nivelAcesso.value
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/gravar'
        console.log(this.state.nivelAcesso)

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                console.log(this.state.nivelAcesso)
                this.setState({ incluindo: false })
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }


    /* ----- GRAVAR ALTERAÇÕES ----- */
    gravarAlterar = () => {
        const dados = {
            "nomeCompleto": this.state.nomeCompleto,
            "sexo": this.state.sexo,
            "dataNascimento": this.state.dataNascimento,
            "endereco": this.state.endereco,
            "login": this.state.login,
            "senha": this.state.senha,
            "nivelAcesso": this.state.nivelAcesso.value
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

    /* ----- EXCLUIR USUÁRIO ----- */
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
    
    /* ----- ADICIONAR PARENTE ----- */
    adicionarParente = (usuarioID, id_parente) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/adicionar/' + id_parente

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherParentes(usuarioID)
            })
            .catch(erro => console.log(erro));

        this.setState({parente: ""})
    }

    /* ----- REMOVER PARENTE ----- */
    removerParente = (usuarioID, id_parente) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/remover/' + id_parente

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherParentes(usuarioID)
            })
            .catch(erro => console.log(erro));
    }

    /* ----- ADICIONAR TELEFONE ----- */
    adicionarTelefone = (usuarioID) => {
        const dados = {
            "ddd": this.state.telefoneDDD,
            "numero": this.state.telefoneNumero
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + "/telefone/adicionar"

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherTelefones(usuarioID)
            })
            .catch(erro => console.log(erro));
            
            this.setState({telefoneDDD: "", telefoneNumero: ""})
    }

    /* ----- REMOVER TELEFONE ----- */
    removerTelefone = (usuarioID, telefoneID) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + "/telefone/remover/" + telefoneID

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherTelefones(usuarioID)
            })
            .catch(erro => console.log(erro));
    }

    /* ----- PREENCHER LISTA USUÁRIO ----- */
    preencherListaUsuario = () => {
        const url = window.servidor + '/usuario/consultar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ usuarios: data }));
    }

    componentDidMount() {
        this.preencherListaUsuario()
    }

    /* ----- BOTÃO VOLTAR ----- */
    voltar = () => {
        this.setState({ incluindo: false, alterando: false, analisando: false, gerenciando: false})
    }

    /* ----------------------------------------------- TELA CADASTRAR USUÁRIO --------------------------------------------- */
    renderCadastrarUsuario = () => {
        return (
            <div className="container">
            <div className="row mt-5 pt-5 g-3">
                <div className="col-12">
                    <h4>Cadastro de Usuário</h4>
                    <hr></hr>
                </div>

                <div className="col-12">
                    <label for="nome" className="form-label">Nome Completo</label>
                    <input value={this.state.nomeCompleto} onChange={this.txtNomeCompleto_change} className="form-control" type="text" id="nome"></input>
                </div>

                <div className="col-md-6">
                    <label for="sexo" className="form-label">Sexo</label>
                    <div className="row">
                        <div className="col-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="sexo" id="sexoMasc" value="Masculino" onChange={this.txtSexo_change} checked></input>
                                <label className="form-check-label" for="sexoMasc">Masculino</label>
                            </div>
                        </div> 
                        <div className="col-3">
                            <div class="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="sexo" id="sexoFem" value="Feminino"  onChange={this.txtSexo_change}></input>
                                <label className="form-check-label" for="sexoFem">Feminino</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <label for="dataNascimento" className="form-label">Data de Nascimento</label> 
                    <div className="" id="dataNascimento">
                        <DatePicker value={this.state.dataNascimento} onChange={this.dataNascimento_change}></DatePicker>
                    </div>
                </div>

                <div className="col-12">
                    <label for="endereco" className="form-label">Endereço</label>
                    <input value={this.state.endereco} onChange={this.txtEndereco_change} className="form-control" type="text" id="endereco"></input> 
                </div>
                
                <div className="col-md-4">
                    <label for="login" className="form-label">Login</label>
                    <input value={this.state.login} onChange={this.txtLogin_change} className="form-control name-pull-image" type="text" id="login"></input>
                </div>

                <div className="col-md-4">
                    <label for="senha" className="form-label">Senha</label>
                    <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control name-pull-image" type="password" placeholder="Senha" id="senha"></input>
                </div>

                <div className="col-md-4">
                    <label for="nivelAcesso" className="form-label">Nivel Acesso</label>
                    <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Nível de Acesso"
                            onChange={this.nivelAcesso_change}
                            isSearchable={false}            
                            options={this.state.options}
                            value={this.state.nivelAcesso}>
                    </Select>
                </div>

                <div className="row mt-4">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.gravarNovo()}>Gravar</button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        
        )
    }

    /* ----------------------------------------------- TELA ALTERAR USUÁRIO ----------------------------------------------- */
    renderAlterarUsuario = () => {
        return (
            <div className="container">
            <div className="row mt-5 pt-5 g-4">
                <div className="col-12">
                    <h4>Alteração de Usuário</h4>
                    <hr></hr>
                </div>

                <div className="col-md-6">
                    <label for="id" className="form-label">ID</label>
                    <input value={this.state.id} readOnly={true} className="form-control" type="text" id="id"></input>
                </div>

                <div className="col-md-6">
                    <label for="nome" className="form-label">Nome Completo</label>
                    <input value={this.state.nomeCompleto} onChange={this.txtNomeCompleto_change} className="form-control" type="text" id="nome"></input>
                </div>

                <div className="col-md-4">
                    <label for="sexo" className="form-label">Sexo</label>
                    <input value={this.state.sexo} readOnly={true} className="form-control" type="text" id="sexo"></input>
                </div>

                <div className="col-md-4 box-data">
                    <label for="dataNascimento" className="form-label">Data de Nascimento</label>
                    <div className="mt-1" id="dataNascimento">
                        <DatePicker value={this.state.dataNascimento} onChange={this.dataNascimento_change}></DatePicker>
                    </div>
                </div>

                <div className="col-md-4">
                    <label for="endereco" className="form-label">Endereço</label>
                    <input value={this.state.endereco} onChange={this.txtEndereco_change} className="form-control" type="text"></input>
                </div>

                <div className="col-md-4">
                    <label for="login" className="form-label">Login</label>
                    <input value={this.state.login} onChange={this.txtLogin_change} className="form-control" type="text" id="login"></input>
                </div>

                <div className="col-md-4">
                    <label for="senha" className="form-label">Senha</label>
                    <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control" type="password" id="senha" placeholder="Senha"></input>
                </div>

                <div className="col-md-4">
                    <label for="nivelAcesso" className="form-label">Nivel Acesso</label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Nível de Acesso"
                        onChange={this.nivelAcesso_change}
                        isSearchable={false}            
                        options={this.state.options}
                        value={this.state.nivelAcesso}
                        defaultValue={this.state.nivelAcesso}>
                    </Select>
                </div>

                <div className="row mt-4">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.gravarAlterar()}>Gravar</button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    /* ----------------------------------------------- TELA DETALHES DO USUÁRIO ------------------------------------------- */
    renderVerDetalhes = () => {
        return (
            <div className="container">
            <div className="row mt-5 pt-3 g-4">
                <div className="col-12">
                    <h4>Detalhes do Usuário</h4>
                    <hr></hr>
                </div>

                <div className="col-md-6">
                    <label for="id" className="form-label">ID</label>
                    <input value={this.state.id} readOnly={true} className="form-control" type="text" id="id"></input>
                </div>

                <div className="col-md-6">
                    <label for="nome" className="form-label">Nome Completo</label>
                    <input value={this.state.nomeCompleto} readOnly={true} className="form-control" type="text" id="nome"></input>
                </div>

                <div className="col-md-4">
                    <label for="sexo" className="form-label">Sexo</label>
                    <input value={this.state.sexo} readOnly={true} className="form-control" type="text" id="sexo"></input>
                </div>

                <div className="col-md-4 box-data">
                    <label for="dataNascimento" className="form-label">Data de Nascimento</label>
                    <div className="mt-1" id="dataNascimento">
                        <DatePicker value={this.state.dataNascimento} disabled={true}></DatePicker>
                    </div>
                </div>

                <div className="col-md-4">
                    <label for="endereco" className="form-label">Endereço</label>
                    <input value={this.state.endereco} readOnly={true} className="form-control" type="text" id="endereco"></input>
                </div>

                <div className="col-md-4">
                    <label for="login" className="form-label">Login</label>
                    <input value={this.state.login} readOnly={true} className="form-control" type="text" id="login"></input>
                </div>

                <div className="col-md-4">
                    <label for="senha" className="form-label">Senha</label>
                    <input value={this.state.senha} readOnly={true} className="form-control" type="password" id="senha"></input>
                </div>

                <div className="col-md-4">
                    <label for="nivelAcesso" className="form-label">Nivel Acesso</label>
                    <input value={this.state.nivelAcesso} readOnly={true} className="form-control" type="text" id="nivelAcesso"></input>
                </div>

                <div className="col-md-6">
                    <label className="form-label table-name">Telefones</label>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">DDD</th>
                                <th scope="col">Número</th>                                                    
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.telefones.length === 0 ? <p className="mt-1">Nenhum telefone adicionado</p> : this.state.telefones && this.state.telefones.map(telefone => {
                                return <tr key={telefone.id}>
                                    <th scope="row">{telefone.ddd}</th>
                                    <td>{telefone.numero}</td>                                
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="col-md-6">
                    <label className="form-label table-name">Parentes</label>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome Completo</th>                                                   
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.parentes.length === 0 ? <p className="mt-1">Nenhum parente adicionado</p> : this.state.parentes && this.state.parentes.map(parente => {
                                return <tr key={parente.id}>
                                    <td>{parente.id}</td>
                                    <td>{parente.nomeCompleto}</td>                                
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                

                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    /* ------------------------------------------------- TELA GERENCIAR USUÁRIO --------------------------------------------- */
    renderGerenciarUsuario = () => {
        const {parente} = this.state;
        return (
            <div className="container">
            <div className="row mt-5 pt-4 g-4">
                <div className="col-12">
                    <h4>Gerenciamento de Usuário</h4>
                    <hr></hr>
                </div>

                <div className="col-12">
                    <h5>Parentes</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Parente"
                                onChange={this.parente_change}
                                isSearchable={this.isSearchable}
                                options={this.state.parentesOpcoes.map(u => ({ value: u.id, label: u.nomeCompleto }))}
                                value={parente}>
                            </Select>
                        </div>

                        <div className="col-md-3">
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.adicionarParente(this.state.id, parente.value)}>Adicionar</button>
                        </div>
                    </div>

                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="" className="col-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.parentes.length === 0 ? <p className="mt-1">Nenhum parente adicionado</p> : this.state.parentes && this.state.parentes.map(parente => {
                                return <tr key={parente.id}>
                                    <th scope="row">{parente.id}</th>
                                    <td>{parente.nomeCompleto}</td>
                                    <td><button type="button" onClick={() => this.removerParente(this.state.id, parente.id)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remover membro"><i className="bi bi-person-x"></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="col-12">
                    <h5>Telefones</h5>
                    <div className="row">
                        <div class="col-md-2">
                            <input placeholder="DDD" value={this.state.telefoneDDD} onChange={this.txtTelefoneDDD_change} className="form-control" type="text"></input>
                        </div>
        
                        <div class="col-md-3">
                            <input placeholder="Número" value={this.state.telefoneNumero} onChange={this.txtTelefoneNumero_change} className="form-control" type="text"></input>
                        </div>

                        <div class="col-md-3">
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.adicionarTelefone(this.state.id)}>Adicionar</button>
                        </div>
                    </div>

                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">DDD</th>
                                <th scope="col">Numero</th>
                                <th scope="" className="col-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.telefones.length === 0 ? <p className="mt-1">Nenhum telefone adicionado</p> : this.state.telefones && this.state.telefones.map(tel => {
                                return <tr key={tel.id}>
                                    <th scope="row">{tel.ddd}</th>
                                    <td>{tel.numero}</td>
                                    <td><button type="button" onClick={() => this.removerTelefone(this.state.id, tel.id)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remover membro"><i className="bi bi-telephone-x"></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    /* ------------------------------------------------- TELA LISTA DE USUÁRIOS --------------------------------------------- */
    renderExibirListaUsuarios = () => {
        return (
            <div className="container">
            <div className="mt-5 pt-5">
                <div className="col-12">
                    <h4>Usuários</h4>
                    <hr></hr>
                </div>
                <div className="col-2 mt-3 mb-3">
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
                                <td><button type="button" onClick={() => this.gerenciarUsuario(usuario)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Gerenciar Telefones e Parentes"><i className="bi bi-journal-text"></i></button></td>    
                                <td><button type="button" onClick={() => this.excluirUsuario(usuario)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir Usuário"><i className="bi bi-trash"></i></button></td>                                                                
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
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
                    if(this.state.gerenciando){
                        pagina = this.renderGerenciarUsuario()
                    }
                    else{
                        pagina = this.renderExibirListaUsuarios()
                    }                 
                }
                
                }
        }
        return pagina  
    }
}
