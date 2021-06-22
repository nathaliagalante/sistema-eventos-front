import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css';

export default class Menu extends Component {
    state = {
        logado: false
    }

    logout = () => {
        this.props.logado = false;
    }

    render(){
        console.log(this.props.logado);
        return(      

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid text-white p-2">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/agenda">Agenda</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/grupo">Grupos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/usuario">Usuários</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active"to="/evento">Eventos</Link>
                            </li>
                        </ul>
                        
                        <div className="d-flex">
                            <div> 
                                {!this.props.logado ? <Link className="navbar-brand" to="/login">Login</Link> : <Link className="navbar-brand" to="/login" onClick={() => this.props.logout()}>Logout</Link>}
                               
                            </div> 
                        </div>
                    </div>
                </div>
            </nav>
            
        )
    }
}