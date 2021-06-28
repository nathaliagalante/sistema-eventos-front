import React, { Component } from 'react'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'
import { loadCldr } from '@syncfusion/ej2-base'
import { L10n } from '@syncfusion/ej2-base'

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/pt/ca-gregorian.json'),
    require('cldr-data/main/pt/numbers.json'),
    require('cldr-data/main/pt/timeZoneNames.json')
);

L10n.load({
    'pt':{
        'schedule': {
            'day': 'Dia',
            'week': 'Semana',
            'workWeek': 'Dias úteis',
            'month': 'Mês',
            'today': 'Hoje',
            'agenda': 'Agenda',
            'noEvents': 'Não há eventos',
            'allDay': 'Dia todo',
            'weekAgenda': 'Agenda da semana',
            'monthAgenda': 'Agenda do mês',
            'workWeekAgenda': 'Agenda da semana útil',
            'emptyContainer': 'Não há eventos agendados nesse dia',
            'start': 'Início',
            'end': 'Fim',
            'more': 'Mais',
            'close': 'Fechar',
            'cancel': 'Cancelar',
            'noTitle': 'Sem título',
            'delete': 'Deletar',
            'edit': 'Editar',
            'moreDetails': 'Mais detalhes',
            'save': 'Salvar',
            'previous': 'Anterior',
            'next': 'Próximo'
        }
    }
});

export default class AgendaEventos extends Component {
    state = {
        eventos: []
    }

    preencherListaEvento = () => {
        const url = window.servidor + '/evento/consultar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ eventos: data }))
            .then(console.log('Lista de eventos preenchida'));
    }

    componentDidMount() {
        this.preencherListaEvento()
    }

    contentTemplate(props) {
        return (<div>
            {
                props.elementType === 'cell' ?
                    <div className="e-cell-content">
                        <form className="e-schedule-form">
                            <div>
                                <input className="date e-field" type="text" name="DataInicio" placeholder="Data de início" />
                            </div>
                            <div>
                                <input className="date2 e-field" type="text" name="DataFim" placeholder="Data de encerramento" />
                            </div>
                            <div>
                                <input className="descricao e-field" type="text" name="Descricao" placeholder="Descrição" />
                            </div>
                            <div>
                                <input className="localevento e-field" type="text" name="LocalEvento" placeholder="Local" />
                            </div>
                            <div>
                                <input className="localinscricao e-field" type="text" name="LocalInscricao" placeholder="Local de inscrição" />
                            </div>
                            <div>
                                <input className="publicoalvo e-field" type="text" name="PublicoAlvo" placeholder="Público alvo" />
                            </div>
                            <div>
                                <input className="valorinvestimento e-field" type="number" name="ValorInvestimento" placeholder="Valor de investimento" />
                            </div>
                        </form>
                    </div> :
                    <div className="e-event-content">
                        <div className="e-subject-wrap">
                            <h6>
                            {
                                (props.dataInicio !== undefined && props.dataFim !== undefined) ?
                                    <div className="data mt-2" data-toggle="tooltip" data-placement="top" title="Duração do evento"> <strong><i class="bi bi-calendar-check"></i>  </strong>{((props.dataInicio.getDate())) + "/" + ((props.dataInicio.getMonth() + 1)) + "/" + props.dataInicio.getFullYear() + " - " + ((props.dataFim.getDate())) + "/" + ((props.dataFim.getMonth() + 1)) + "/" + props.dataFim.getFullYear()}</div> : ""
                            }
                            {
                                (props.descricao !== undefined) ?
                                    <div className="descricao mt-3" data-toggle="tooltip" data-placement="top" title="Descrição"><i class="bi bi-file-text"></i> <strong>  </strong>{props.descricao}</div> : ""
                            }
                            {
                                (props.localEvento !== undefined) ?
                                    <div className="localEvento mt-3" data-toggle="tooltip" data-placement="top" title="Local"><i class="bi bi-geo-alt"></i><strong> </strong>{props.localEvento}</div> : ""
                            }
                            {
                                (props.localInscricao !== undefined) ?
                                    <div className="localInscricao mt-3" data-toggle="tooltip" data-placement="top" title="Local de inscrição"><i class="bi bi-signpost-split"></i><strong> </strong>{props.localInscricao}</div> : ""
                            }
                            {
                                (props.publicoAlvo !== undefined) ?
                                    <div className="publicoAlvo mt-3" data-toggle="tooltip" data-placement="top" title="Público alvo"><i class="bi bi-person-lines-fill"></i><strong> </strong>{props.publicoAlvo}</div> : ""
                            }
                            {
                                (props.valorInvestimento !== undefined) ?
                                    <div className="valorInvestimento mt-3" data-toggle="tooltip" data-placement="top" title="Valor de investimento"><i class="bi bi-wallet2"></i><strong> </strong> R$ {props.valorInvestimento}</div> : ""
                            }
                            </h6>
                        </div>
                    </div>
            }
        </div>
        );
    }


    render() {
        return (
            <div className="mt-5 pt-3">
                <ScheduleComponent currentView='Month' readonly={true} width='100%' height='620px' locale='pt' eventSettings={{
                    dataSource: this.state.eventos,
                    fields: {
                        id: 'id',
                        subject: { name: 'nome' },
                        startTime: { name: 'dataInicio' },
                        endTime: { name: 'dataFim' },
                        description: { name: 'descricao' },
                        location: { name: 'localEvento' }
                    }
                }} quickInfoTemplates={{ content: this.contentTemplate.bind(this) }}>
                    <Inject services={[Day, Week, Month, WorkWeek, Agenda]} />
                </ScheduleComponent>
            </div>
        )
    }
}