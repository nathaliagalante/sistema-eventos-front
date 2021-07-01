import React, { Component } from 'react'
import DatePicker from 'react-date-picker'

export default class Evento extends Component {
    state = {
        eventos: [],
        nome: "",
        descricao: "",
        dataInicio: new Date(),
        dataFim: new Date(),
        localEvento: "",
        localInscricao: "",
        publicoAlvo: "",
        valorInvestimento: "",
        incluindo: false,
        alterando: false,
        eventoSelecionado: "",
        ano: "",
        administrador: "",
        detalhes: false
    }

    /* ------------------------------------------------- SET STATE --------------------------------------------- */

    txtNome_change = (event) => {
        this.setState({ nome: event.target.value })
    }

    txtDescricao_change = (event) => {
        this.setState({ descricao: event.target.value })
    }

    txtLocalEvento_change = (event) => {
        this.setState({ localEvento: event.target.value })
    }

    txtLocalInscricao_change = (event) => {
        this.setState({ localInscricao: event.target.value })
    }

    txtPublicoAlvo_change = (event) => {
        this.setState({ publicoAlvo: event.target.value })
    }

    txtValorInvestimento_change = (event) => {
        this.setState({ valorInvestimento: event.target.value })
    }

    dataInicio_change = (date) => {
        this.setState({ dataInicio: date })
    }

    dataFim_change = (date) => {
        this.setState({ dataFim: date })
    }

    txtAno_change = (event) => {
        this.setState({ ano: event.target.value })
    }

    /* ------------------------------------------------- FUNCIONALIDADES --------------------------------------------- */

    /* ----- PREENCHER LISTA EVENTO ----- */
    preencherListaEvento = () => {
        const url = window.servidor + '/evento/consultar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ eventos: data }))
            .then(console.log('Lista de eventos preenchida'));
    }

    componentDidMount() {
        this.preencherListaEvento();
        this.carregarDadosLogin();
    }

    /* ----- CADASTRAR EVENTO ----- */
    cadastrarNovo = () => {
        this.setState({ incluindo: true, nome: '', descricao: '', localEvento: '', localInscricao: '', publicoAlvo: '', valorInvestimento: '' })
    }

    /* ----- ALTERAR EVENTO ----- */
    alterarEvento = (evento) => {
        var dataInicioConvertida = new Date(evento.dataInicio);
        var dataFimConvertida = new Date(evento.dataFim);
        dataInicioConvertida.setDate(dataInicioConvertida.getDate() + 1);
        dataFimConvertida.setDate(dataFimConvertida.getDate() + 1);
        this.setState({ alterando: true, eventoSelecionado: evento, id: evento.id, nome: evento.nome, descricao: evento.descricao, localEvento: evento.localEvento, localInscricao: evento.localInscricao, publicoAlvo: evento.publicoAlvo, valorInvestimento: evento.valorInvestimento, dataInicio: dataInicioConvertida, dataFim: dataFimConvertida })
    }

    /* ----- VER DETALHES ----- */
    verDetalhes = (evento) => {
        var dataInicioConvertida = new Date(evento.dataInicio);
        var dataFimConvertida = new Date(evento.dataFim);
        dataInicioConvertida.setDate(dataInicioConvertida.getDate() + 1);
        dataFimConvertida.setDate(dataFimConvertida.getDate() + 1);
        this.setState({ detalhes: true, id: evento.id, nome: evento.nome, descricao: evento.descricao, localEvento: evento.localEvento, localInscricao: evento.localInscricao, publicoAlvo: evento.publicoAlvo, valorInvestimento: evento.valorInvestimento, dataInicio: dataInicioConvertida, dataFim: dataFimConvertida })
    }

    /* ----- BOTÃO VOLTAR ----- */
    voltar = () => {
        this.setState({ incluindo: false, alterando: false, detalhes: false, dataInicio: new Date(), dataFim: new Date() })
    }

    /* ----- GRAVAR NOVO EVENTO ----- */
    gravarNovo = () => {
        const dados = {
            "nome": this.state.nome,
            "descricao": this.state.descricao,
            "dataInicio": this.state.dataInicio,
            "dataFim": this.state.dataFim,
            "localEvento": this.state.localEvento,
            "localInscricao": this.state.localInscricao,
            "publicoAlvo": this.state.publicoAlvo,
            "valorInvestimento": this.state.valorInvestimento
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/evento/gravar'

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ incluindo: false })
                this.preencherListaEvento()
            })
            .catch(erro => console.log(erro));
    }

    /* ----- EXCLUIR EVENTO ----- */
    excluirEvento = (evento) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/evento/excluir/' + evento.id

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaEvento()
            })
            .catch(erro => console.log(erro));
    }

    gravarAlterar = (evento) => {
        const dados = {
            "nome": this.state.nome,
            "descricao": this.state.descricao,
            "dataInicio": this.state.dataInicio,
            "dataFim": this.state.dataFim,
            "localEvento": this.state.localEvento,
            "localInscricao": this.state.localInscricao,
            "publicoAlvo": this.state.publicoAlvo,
            "valorInvestimento": this.state.valorInvestimento
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/evento/alterar/' + evento.id

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ alterando: false, dataInicio: new Date(), dataFim: new Date() })
                this.preencherListaEvento()
            })
            .catch(erro => console.log(erro));
    }

    /* ----- GERAR ANIVERSARIOS ----- */
    gerarAniversarios = (ano) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/evento/aniversarios/' + ano

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Aniversários gerados')
                this.preencherListaEvento()
            })
            .catch(erro => console.log(erro));

    }

    carregarDadosLogin = () => {
        const url = window.servidor + '/usuario/login/visualizar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ administrador: data }));
    }

    /* ----------------------------------------------- TELA LISTA EVENTOS --------------------------------------------- */
    renderListaEventos = () => {
        return (
            <div className="container">
                <div className="mt-5 pt-5">
                    <div className="col-12">
                        <h4>Eventos</h4>
                        <hr></hr>
                    </div>

                    <div className="mt-3 mb-3 d-flex flex-md-row flex-column justify-content-between">
                        <div className="col-auto mb-3">
                            <button type="button" hidden={!this.state.administrador.isAdm} className="btn btn-outline-primary" onClick={() => this.cadastrarNovo()}>Cadastrar</button>
                        </div>

                        <div className="d-md-flex justify-content-around">
                            <div className="col-sm-5">
                                <input value={this.state.ano} placeholder="Ano" type="number" className="form-control" onChange={this.txtAno_change}></input>
                            </div>

                            <div className="col-md-auto">
                                <button type="button" hidden={!this.state.administrador.isAdm} className="btn btn-outline-primary" onClick={() => this.gerarAniversarios(this.state.ano)}>Gerar aniversários</button>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table className="table mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Data de início</th>
                                    <th scope="col">Data de encerramento</th>
                                    <th scope="col">Local</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.eventos && this.state.eventos.map(evento => {
                                    var dataInicioConvertida = new Date(evento.dataInicio);
                                    var dataFimConvertida = new Date(evento.dataFim);
                                    dataInicioConvertida.setDate(dataInicioConvertida.getDate() + 1);
                                    dataFimConvertida.setDate(dataFimConvertida.getDate() + 1);
                                    return <tr key={evento.id}>
                                        <th scope="row">{evento.id}</th>
                                        <td>{evento.nome}</td>
                                        <td>{((dataInicioConvertida.getDate())) + "/" + ((dataInicioConvertida.getMonth() + 1)) + "/" + dataInicioConvertida.getFullYear()}</td>
                                        <td>{((dataFimConvertida.getDate())) + "/" + ((dataFimConvertida.getMonth() + 1)) + "/" + dataFimConvertida.getFullYear()}</td>
                                        <td>{evento.localEvento}</td>
                                        <td><button type="button" onClick={() => this.verDetalhes(evento)} className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Ver Mais"><i className="bi bi-three-dots"></i></button></td>
                                        <td><button type="button" hidden={!this.state.administrador.isAdm} onClick={() => this.alterarEvento(evento)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar evento"><i className="bi bi-pencil-square"></i></button></td>
                                        <td><button type="button" hidden={!this.state.administrador.isAdm} onClick={() => this.excluirEvento(evento)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir evento"><i className="bi bi-trash"></i></button></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    /* ----------------------------------------------- TELA ALTERAR EVENTO ----------------------------------------------- */
    renderAlterarEvento = () => {
        return (
            <div class="container">
                <div className="row mt-5 pt-4 g-4">
                    <div className="col-12">
                        <h4>Editar Evento</h4>
                        <hr></hr>
                    </div>

                    <div className="col-md-6">
                        <label for="id" className="form-label">ID</label>
                        <input value={this.state.id} readOnly={true} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="nome" className="form-label">Nome</label>
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control" type="text"></input>
                    </div>


                        <div className="col-md-12">
                            <label for="descricao" className="form-label">Descrição</label>
                            <input value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control name-pull-image" type="text"></input>
                        </div>

                        <div className="col-md-6">
                            <label for="dataInicio" className="form-label">Data Início</label>
                            <div className="mt-1">
                                <DatePicker value={this.state.dataInicio} onChange={this.dataInicio_change}></DatePicker>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label for="dataFim" className="form-label">Data Fim</label>
                            <div className="mt-1">
                                <DatePicker value={this.state.dataFim} onChange={this.dataFim_change}></DatePicker>
                            </div>
                        </div>


                    <div className="col-md-6">
                        <label for="local" className="form-label">Local</label>
                        <input value={this.state.localEvento} onChange={this.txtLocalEvento_change} className="form-control" type="text" id="local"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="localInscricao" className="form-label">Local Inscrição</label>
                        <input value={this.state.localInscricao} onChange={this.txtLocalInscricao_change} className="form-control name-pull-image" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="publicoAlvo" className="form-label">Público Alvo</label>
                        <input value={this.state.publicoAlvo} onChange={this.txtPublicoAlvo_change} className="form-control" type="text" id="publicoAlvo"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="valorInvestimento" className="form-label">Valor de Investimento</label>
                        <input value={this.state.valorInvestimento} onChange={this.txtValorInvestimento_change} className="form-control" type="number" id="valorInvestimento"></input>
                    </div>

                    <div className="row mt-4">
                        <div className="col-auto mb-3">
                            <button className="btn btn-primary" hidden={!this.state.administrador.isAdm} onClick={() => this.gravarAlterar(this.state.eventoSelecionado)}>Gravar</button>
                        </div>
                        <div className="col-auto mb-3">
                            <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /* ----------------------------------------------- TELA DETALHES DO EVENTO ------------------------------------------- */
    renderDetalhesEvento = () => {
        return (
            <div className="container">
                <div className="row mt-5 pt-4 g-4">
                    <div className="col-12">
                        <h4>Detalhes do Evento</h4>
                        <hr></hr>
                    </div>

                    <div className="col-md-6">
                        <label for="id" className="form-label">ID</label>
                        <input value={this.state.id} readOnly={true} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="nome" className="form-label">Nome</label>
                        <input value={this.state.nome} readOnly={true} className="form-control name-pull-image" type="text"></input>
                    </div>

                    <div className="col-md-12">
                        <label for="descricao" className="form-label">Descrição</label>
                        <input value={this.state.descricao} readOnly={true} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Data Início</label>
                        <div className="mt-1">
                            <DatePicker value={this.state.dataInicio} disabled={true}></DatePicker>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Data Fim</label>
                        <div className="mt-1">
                            <DatePicker value={this.state.dataFim} disabled={true}></DatePicker>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Local Evento</label>
                        <input value={this.state.localEvento} readOnly={true} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Local Inscrição</label>
                        <input value={this.state.localInscricao} readOnly={true} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Público Alvo</label>
                        <input value={this.state.publicoAlvo} readOnly={true} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Valor de Investimento</label>
                        <input value={this.state.valorInvestimento} readOnly={true} className="form-control name-pull-image" type="number"></input>
                    </div>

                    <div className="row mt-4">
                        <div className="col-auto mb-3">
                            <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    /* ----------------------------------------------- TELA CADASTRAR EVENTO --------------------------------------------- */
    renderCadastrarEvento = () => {
        return (
            <div className="container">
                <div className="row mt-5 pt-4 g-4">
                    <div className="col-12">
                        <h4>Cadastrar Evento</h4>
                        <hr></hr>
                    </div>

                    <div className="col-md-6">
                        <label for="nome" className="form-label">Nome</label>
                        <input value={this.state.nome} onChange={this.txtNome_change} className="form-control" type="text"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="descricao" className="form-label">Descrição</label>
                        <input value={this.state.descricao} onChange={this.txtDescricao_change} className="form-control" type="text" id="descricao"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="dataInicio" className="form-label">Data Início</label>
                        <div className="mt-1">
                            <DatePicker value={this.state.dataInicio} onChange={this.dataInicio_change}></DatePicker>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label for="dataFim" className="form-label">Data Fim</label>
                        <div className="mt-1">
                            <DatePicker value={this.state.dataFim} onChange={this.dataFim_change}></DatePicker>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label for="local" className="form-label">Local Evento</label>
                        <input value={this.state.localEvento} onChange={this.txtLocalEvento_change} className="form-control" type="text" id="local"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="localInscricao" className="form-label">Local Inscrição</label>
                        <input value={this.state.localInscricao} onChange={this.txtLocalInscricao_change} className="form-control" type="text" id="localInscricao"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="publicoAlvo" className="form-label">Público Alvo</label>
                        <input value={this.state.publicoAlvo} onChange={this.txtPublicoAlvo_change} className="form-control name-pull-image" type="text" id="publicoAlvo"></input>
                    </div>

                    <div className="col-md-6">
                        <label for="valorInvestimento" className="form-label">Valor de Investimento</label>
                        <input value={this.state.valorInvestimento} onChange={this.txtValorInvestimento_change} className="form-control" type="number" id="valorInvestimento"></input>
                    </div>

                    <div className="row mt-4">
                        <div className="col-auto mb-3">
                            <button className="btn btn-primary" hidden={!this.state.administrador.isAdm} onClick={() => this.gravarNovo()}>Gravar</button>
                        </div>
                        <div className="col-auto mb-3">
                            <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        let pagina = ''
        if (this.state.incluindo) {
            pagina = this.renderCadastrarEvento()
        } else {
            if (this.state.alterando) {
                pagina = this.renderAlterarEvento()
            } else {
                if (this.state.detalhes) {
                    pagina = this.renderDetalhesEvento()
                } else {
                    pagina = this.renderListaEventos()
                }
            }
        }
        return pagina
    }
}