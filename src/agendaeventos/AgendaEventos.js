import React, { Component } from 'react'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'
import { loadCldr } from '@syncfusion/ej2-base'

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/pt/ca-gregorian.json'),
    require('cldr-data/main/pt/numbers.json'),
    require('cldr-data/main/pt/timeZoneNames.json')
);

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

    render() {
        return (
            <div className="mt-5 pt-3">
                <ScheduleComponent currentView='Month' readonly={true} width='100%' height='593px' locale='pt' eventSettings={{
                    dataSource: this.state.eventos,
                    fields: {
                        id: 'id',
                        subject: { name: 'nome' },
                        startTime: { name: 'dataInicio' },
                        endTime: { name: 'dataFim' },
                        description: { name: 'descricao' },
                        location: { name: 'localEvento' }
                    }
                }}>
                    <Inject services={[Day, Week, Month, WorkWeek, Agenda]} />
                </ScheduleComponent>
            </div>
        )
    }
}