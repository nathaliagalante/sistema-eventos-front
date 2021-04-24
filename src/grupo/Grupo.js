import React, { Component } from 'react'
import DatePicker from 'react-date-picker'

export default class Grupo extends Component {
    state = {
        nome: "",
        descricao: "",
        dataRenovacao: new Date(),
        grupos: [],
        membros: [],
        incluindo: false,
        alterando: false,
        gerenciando: false,
        id: ""
    }

    txtNome_change = (event) => {
        this.setState({ nome: event.target.value })
    }

    txtDescricao_change = (event) => {
        this.setState({ descricao: event.target.value })
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
        const url = "/grupo/gerenciar/" + grupo.id + "/listar"
        fetch(url)
            .then(console.log('Preenchido'))
            .then(response => response.json())
            .then(data => this.setState({ membros: data }));
    }

    componentDidMount() {
        this.preencherListaGrupo()
    }

    cadastrarNovo = () => {
        this.setState({ incluindo: true, nome: '', descricao: '' })
    }

    alterarNovo = (grupo) => {
        this.setState({ alterando: true, nome: grupo.nome, id: grupo.id, descricao: grupo.descricao })
    }

    gerenciarGrupo = (grupo) => {
        this.setState({ gerenciando: true })
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
            .then(console.log('Gravado'))
            .then(this.setState({ incluindo: false }))
            .then(this.preencherListaGrupo())
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
            .then(this.setState({ alterando: false }))
            .then(this.preencherListaGrupo())
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
            .then(this.preencherListaGrupo())
            .catch(erro => console.log(erro));
    }

    voltar = () => {
        this.setState({ incluindo: false, alterando: false, gerenciando: false })
    }

    renderCadastrarGrupo = () => {
        return (
            <div className="row mt-5 pt-3">
                <div>
                    <h5>Cadastro de grupo</h5>
                </div>
                <div className="col-2">
                    Nome:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="col-2">
                    Descrição:
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <input value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="col-2">
                    Data de renovação:
                </div>
                <div className="row mt-2">
                    <div className="col-2">
                        <DatePicker value={this.state.dataRenovacao} onChange={this.dataRenovacao_change}></DatePicker>
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

    renderExibirListaGrupos = () => {
        return (
            <div className="mt-5 pt-3">
                <button type="button" className="btn btn-outline-primary mt-2" onClick={() => this.cadastrarNovo()}>Cadastrar</button>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data de criação</th>
                            <th scope="col">Data de renovação</th>
                            <th scope="col">Descrição</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.grupos && this.state.grupos.map(grupo => {
                            return <tr key={grupo.id}>
                                <th scope="row">{grupo.id}</th>
                                <td>{grupo.nome}</td>
                                <td>{grupo.dataCriacao}</td>
                                <td>{grupo.dataRenovacao}</td>
                                <td>{grupo.descricao}</td>
                                <td><button type="button" onClick={() => this.alterarNovo(grupo)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar grupo"><i className="bi bi-pencil-square"></i></button></td>
                                <td><button type="button" onClick={() => this.gerenciarGrupo(grupo)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Gerenciar membros"><i className="bi bi-person-plus"></i></button></td>
                                <td><button type="button" onClick={() => this.excluirGrupo(grupo)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir grupo"><i className="bi bi-trash"></i></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    renderAlterarGrupo = () => {
        return (
            <div className="row mt-5 pt-3">
                <div>
                    <h5>Alteração de grupo</h5>
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
                    Nome:
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="col-2">
                    Descrição:
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <input value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control name-pull-image" type="text"></input>
                    </div>
                </div>
                <div className="col-2">
                    Data de renovação:
                </div>
                <div className="row mt-2">
                    <div className="col-2">
                        <DatePicker value={this.state.dataRenovacao} onChange={this.dataRenovacao_change}></DatePicker>
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

    renderGerenciarMembros = () => {
        return (
            <div className="mt-5 pt-3">
                <div>
                    <h5>Gerenciamento de membros</h5>
                </div>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope=""></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.membros && this.state.membros.map(membro => {
                            return <tr key={membro.id}>
                                <th scope="row">{membro.id}</th>
                                <td>{membro.nomeCompleto}</td>
                                <td><button type="button" className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remover membro"><i className="bi bi-person-x"></i></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
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
                    pagina = this.renderExibirListaGrupos()
                }
            }
        }
        return pagina
    }
}