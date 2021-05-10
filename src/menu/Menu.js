import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top">
                    <div className="col-12 bg-dark text-white p-2 d-flex">
                        <Link className="navbar-brand" to="/agenda">Agenda</Link>
                        <Link className="navbar-brand ml-auto" to="/login">Login</Link>
                        <Link className="navbar-brand" to="/grupo">Grupos</Link>
                        <Link className="navbar-brand" to="/usuario">Usuarios</Link>
                    </div>
            </nav>        
            
        )
    }
}