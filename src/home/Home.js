import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class Home extends Component {
    render(){
        return(
            <div>
                <Redirect to="/agenda"></Redirect>
            </div>
        )
    }
}