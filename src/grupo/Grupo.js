import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import Select from 'react-select'

export default class Grupo extends Component {
    state = {
        nome: "",
        descricao: "",
        dataRenovacao: new Date(),
        grupos: [],
        membros: [],
        usuariosSemGrupo: [],
        incluindo: false,
        alterando: false,
        gerenciando: false,
        id: "",
        grupoSelecionado: "",
        isClearable: true,
        isDisabled: false,
        isSearchable: true,
        opcaoSelecionada: null,
        liderSelecionado: null,
        detalhes: false,
        administrador: "",
        lider: ""
    }

    handleChange = (valor) => {
        console.log('Opção selecionada', valor)
        this.setState({ opcaoSelecionada: valor },
            () => console.log('Valor: ', this.state.opcaoSelecionada))
    }

    handleChange_lider = (valor) => {
        console.log('Líder selecionado', valor)
        this.setState({ liderSelecionado: valor },
            () => console.log('Valor: ', this.state.liderSelecionado))
    }

    toggleDisabled = () => {
        this.setState(state => ({ isDisabled: !state.isDisabled }));
    }

    txtNome_change = (event) => {
        this.setState({ nome: event.target.value })
    }

    txtDescricao_change = (event) => {
        this.setState({ descricao: event.target.value })
    }

    lider_change = (grupoSelecionado) => {
        this.setState({ lider: grupoSelecionado.lider })
    }

    dataRenovacao_change = (date) => {
        this.setState({ dataRenovacao: date })
    }

    preencherListaGrupo = () => {
        const url = window.servidor + '/grupo/consultar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ grupos: data }));
    }

    preencherListaMembros = (grupo) => {
        const url = window.servidor + '/grupo/gerenciar/' + grupo.id + '/listar'
        fetch(url)
            .then(console.log('Preenchido'))
            .then(response => response.json())
            .then(data => this.setState({ membros: data }));
    }

    preencherComboboxUsuarios = () => {
        const url = window.servidor + '/grupo/gerenciar/listargroupless'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ usuariosSemGrupo: data }))
    }

    preencherComboboxLider = (grupo) => {
        const url = window.servidor + '/grupo/gerenciar/' + grupo.id + '/listar'
        fetch(url)
            .then(console.log('Combobox de lideres preenchida'))
            .then(response => response.json())
            .then(data => this.setState({ membros: data }));
    }

    componentDidMount() {
        this.preencherListaGrupo();
        this.carregarDadosLogin();
    }

    cadastrarNovo = () => {
        this.setState({ incluindo: true, nome: '', descricao: '' })
    }

    alterarNovo = (grupo) => {
        var dataConvertida = new Date(grupo.dataRenovacao);
        dataConvertida.setDate(dataConvertida.getDate() + 1)
        this.setState({ alterando: true, nome: grupo.nome, id: grupo.id, descricao: grupo.descricao, dataRenovacao: dataConvertida })
    }

    gerenciarGrupo = (grupo) => {
        this.setState({ gerenciando: true, grupoSelecionado: grupo, opcaoSelecionada: null, liderSelecionado: null })
        this.preencherListaMembros(grupo)
        this.preencherComboboxUsuarios()
    }

    verDetalhes = (grupo) => {
        var dataRenovacaoConvertida = new Date(grupo.dataRenovacao);
        var dataCriacaoConvertida = new Date(grupo.dataCriacao);
        dataRenovacaoConvertida.setDate(dataRenovacaoConvertida.getDate() + 1)
        dataCriacaoConvertida.setDate(dataCriacaoConvertida.getDate() + 1)
        this.setState({ detalhes: true, grupoSelecionado: grupo, nome: grupo.nome, id: grupo.id, descricao: grupo.descricao, dataRenovacao: dataRenovacaoConvertida, dataCriacao: dataCriacaoConvertida, lider: grupo.lider })
        this.preencherListaMembros(grupo)
    }

    gravarNovo = () => {
        const dados = {
            "nome": this.state.nome,
            "descricao": this.state.descricao,
            "dataRenovacao": this.state.dataRenovacao
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/grupo/gravar'

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ incluindo: false })
                this.preencherListaGrupo()
            })
            //.then(console.log('Gravado'))
            //.then(this.setState({ incluindo: false }))
            //.then(this.preencherListaGrupo())
            .catch(erro => console.log(erro));
    }

    gravarAlterar = () => {
        const dados = {
            "id": this.state.id,
            "nome": this.state.nome,
            "descricao": this.state.descricao,
            "dataRenovacao": this.state.dataRenovacao
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/grupo/alterar'

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ alterando: false, dataRenovacao: new Date() })
                this.preencherListaGrupo()
            })
            .catch(erro => console.log(erro));
    }

    excluirGrupo = (grupo) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/grupo/excluir/' + grupo.id

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaGrupo()
            })
            .catch(erro => console.log(erro));
    }

    esvaziarGrupo = (grupo) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/grupo/gerenciar/' + grupo.id + '/membros/esvaziar'

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaMembros(grupo)
                this.preencherComboboxUsuarios()
            })
            .catch(erro => console.log(erro));
    }

    adicionarMembro = (grupo, id_membro) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/grupo/gerenciar/' + grupo.id + '/membros/adicionar/' + id_membro

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaMembros(grupo)
                this.preencherComboboxUsuarios()
            })
            .catch(erro => console.log(erro));
    }

    removerMembro = (grupo, membro) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/grupo/gerenciar/' + grupo.id + '/membros/remover/' + membro.id

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaMembros(grupo)
                this.preencherComboboxUsuarios()
            })
            .catch(erro => console.log(erro));
    }

    escolherLider = (grupo, id_membro) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/grupo/gerenciar/' + grupo.id + '/membros/lider/' + id_membro

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaMembros(grupo)
                this.preencherComboboxLider(grupo)
                this.preencherListaGrupo()
            })
            .catch(erro => console.log(erro));
    }

    voltar = () => {
        this.setState({ incluindo: false, alterando: false, gerenciando: false, detalhes: false, dataRenovacao: new Date() })
        this.preencherListaGrupo()
    }

    carregarDadosLogin = () => {
        const url = window.servidor + '/usuario/login/visualizar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ administrador: data }));
    }

    renderCadastrarGrupo = () => {
        return (
            <div className="row mt-5 pt-4">
                <div>
                    <h5>Cadastro de grupo</h5>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Nome:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Descrição:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Data de renovação:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <DatePicker value={this.state.dataRenovacao} onChange={this.dataRenovacao_change}></DatePicker>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        <button className="btn btn-primary" hidden={!this.state.administrador.isAdm} onClick={() => this.gravarNovo()}>Gravar</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderExibirListaGrupos = () => {
        return (
            <div className="mt-5 pt-3">
                <div className="col-1">
                    <button type="button" className="btn btn-outline-primary mt-2" hidden={!this.state.administrador.isAdm} onClick={() => this.cadastrarNovo()}>Cadastrar</button>
                </div>
                <div class="table-responsive">
                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Data de criação</th>
                                <th scope="col">Data de renovação</th>
                                <th scope="col">Líder</th>
                                <th scope="col">Descrição</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.grupos && this.state.grupos.map(grupo => {
                                var dataRenovacaoConvertida = new Date(grupo.dataRenovacao)
                                var dataCriacaoConvertida = new Date(grupo.dataCriacao)
                                dataRenovacaoConvertida.setDate(dataRenovacaoConvertida.getDate() + 1)
                                dataCriacaoConvertida.setDate(dataCriacaoConvertida.getDate() + 1)
                                return <tr key={grupo.id}>
                                    <th scope="row">{grupo.id}</th>
                                    <td>{grupo.nome}</td>
                                    <td>{((dataCriacaoConvertida.getDate())) + "/" + ((dataCriacaoConvertida.getMonth() + 1)) + "/" + dataCriacaoConvertida.getFullYear()}</td>
                                    <td>{((dataRenovacaoConvertida.getDate())) + "/" + ((dataRenovacaoConvertida.getMonth() + 1)) + "/" + dataRenovacaoConvertida.getFullYear()}</td>
                                    <td>{grupo.lider}</td>
                                    <td>{grupo.descricao}</td>
                                    <td><button type="button" onClick={() => this.verDetalhes(grupo)} className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Ver Mais"><i className="bi bi-three-dots"></i></button></td>
                                    <td><button type="button" hidden={!this.state.administrador.isAdm} onClick={() => this.alterarNovo(grupo)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar grupo"><i className="bi bi-pencil-square"></i></button></td>
                                    <td><button type="button" hidden={!this.state.administrador.isAdm} onClick={() => this.gerenciarGrupo(grupo)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Gerenciar membros"><i className="bi bi-person-plus"></i></button></td>
                                    <td><button type="button" hidden={!this.state.administrador.isAdm} onClick={() => this.excluirGrupo(grupo)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir grupo"><i className="bi bi-trash"></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderAlterarGrupo = () => {
        return (
            <div className="row mt-5 pt-4">
                <div>
                    <h5>Alteração de grupo</h5>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        ID:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <input value={this.state.id} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Nome:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Descrição:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Data de renovação:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <DatePicker value={this.state.dataRenovacao} onChange={this.dataRenovacao_change}></DatePicker>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        <button className="btn btn-primary" hidden={!this.state.administrador.isAdm} onClick={() => this.gravarAlterar()}>Gravar</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderDetalhesGrupo = () => {
        return (
            <div className="row mt-5 pt-4">
                <div>
                    <h5>Detalhes do grupo</h5>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        ID:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <input value={this.state.id} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Nome:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <input value={this.state.nome} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Descrição:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input value={this.state.descricao} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Data de criação:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <DatePicker value={this.state.dataCriacao} disabled={true}></DatePicker>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Data de renovação:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <DatePicker value={this.state.dataRenovacao} disabled={true}></DatePicker>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-auto">
                        Líder:
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <input value={this.state.lider} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="md-2 col-2">
                        Membros:
                    </div>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.membros && this.state.membros.map(membro => {
                                    return <tr key={membro.id}>
                                        <th scope="row">{membro.id}</th>
                                        <td>{membro.nomeCompleto}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
                <div className="row pt-5"></div>
            </div>
        )
    }

    renderGerenciarMembros = () => {
        const { opcaoSelecionada, liderSelecionado } = this.state;
        return (
            <div className="mt-5 pt-4">
                <div>
                    <h5>Gerenciamento de membros</h5>
                </div>
                <div className="row mt-2 pt-3">
                    <div className="col-md-4">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Usuários sem grupo"
                            onChange={this.handleChange}
                            isSearchable={this.isSearchable}
                            options={this.state.usuariosSemGrupo.map(u => ({ value: u.id, label: u.nomeCompleto }))}
                            value={opcaoSelecionada}>
                        </Select>
                    </div>
                    <div className="col-2">
                        <button type="button" hidden={!this.state.administrador.isAdm} className="btn btn-outline-primary" onClick={() => this.adicionarMembro(this.state.grupoSelecionado, opcaoSelecionada.value)}>Adicionar</button>
                    </div>
                </div>
                <div className="row mt-2 pt-2">
                    <div className="col-md-4">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Escolha o líder..."
                            onChange={this.handleChange_lider}
                            isSearchable={this.isSearchable}
                            options={this.state.membros.map(m => ({ value: m.id, label: m.nomeCompleto }))}
                            value={liderSelecionado}>
                        </Select>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-outline-primary" hidden={!this.state.administrador.isAdm} onClick={() => this.escolherLider(this.state.grupoSelecionado, liderSelecionado.value)}>Escolher líder</button>
                    </div>
                </div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-outline-danger mt-2" hidden={!this.state.administrador.isAdm} onClick={() => this.esvaziarGrupo(this.state.grupoSelecionado)}>Esvaziar grupo</button>
                </div>
                <div className="table-responsive">
                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="" className="col-1"></th>
                                <th scope=""></th>
                                <th scope=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.membros && this.state.membros.map(membro => {
                                return <tr key={membro.id}>
                                    <th scope="row">{membro.id}</th>
                                    <td>{membro.nomeCompleto}</td>
                                    <td><button type="button" hidden={!this.state.administrador.isAdm} onClick={() => this.removerMembro(this.state.grupoSelecionado, membro)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remover membro"><i className="bi bi-person-x"></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="row mt-2">
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let pagina = ''
        if (this.state.incluindo) {
            pagina = this.renderCadastrarGrupo()
        } else {
            if (this.state.alterando) {
                pagina = this.renderAlterarGrupo()
            } else {
                if (this.state.gerenciando) {
                    pagina = this.renderGerenciarMembros()
                } else {
                    if (this.state.detalhes) {
                        pagina = this.renderDetalhesGrupo()
                    } else {
                        pagina = this.renderExibirListaGrupos()
                    }
                }
            }
        }
        return pagina
    }
}