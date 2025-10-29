import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from './Global'
import axios from 'axios'
import netflix from './../assets/images/homeimage.webp'

export default class Menu extends Component {

    state = {
        series: []
    }

    loadSeries = () => {
        console.log("Accediendo al servicio de series...")
        let request = "api/Series"
        axios.get(Global.url + request).then(response => {
            console.log("Series recibidas!")
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img src={netflix} width={75} /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className={"nav-link active"} to={"/"}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={"nav-link active"} to={"/crearpersonaje"}>Nuevo Personaje</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={"nav-link active"} to={"/modificarpersonaje"}>Modificar Personaje</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Series
                                    </a>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.series.map((serie, index) => {
                                                return (
                                                    <li key={index}>
                                                        <NavLink className="nav-link dropdown-item bg-white"
                                                            to={"/serie/" + serie.idSerie}>{serie.nombre}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
