import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate, NavLink } from 'react-router-dom'
import { data } from 'jquery'

export default class ModificarPersonaje extends Component {

    cajaserie = React.createRef()
    cajapersonaje = React.createRef()

    state = {
        series: [],
        personajesSerie: [],
        operacionExitosa: false,
        mostrarBoton: false,
        datos: false
    }

    loadSeries = () => {
        console.log("Accediendo al servicio de series...")
        let request = "api/Series"
        axios.get(Global.url + request).then(response => {
            console.log("Series select recibidas!")
            this.setState({
                series: response.data
            })
        })
    }

    loadPersonajes = () => {
        console.log("Buscando personajes...")
        let idse = this.cajaserie.current.value
        let request = "api/Series/PersonajesSerie/" + idse
        axios.get(Global.url + request).then(response => {
            console.log("Personajes recibidos!")
            this.setState({
                personajesSerie: response.data,
                mostrarBoton: true
            })
        })
    }

    enviarAactualizar = (e) => {
        e.preventDefault()
        this.setState({
            datos: true
        })
    }

    componentDidMount = () => {
        this.loadSeries()
    }

    render() {
        return (
            <div>
                {
                    this.state.datos &&
                    <Navigate to={"/actualizardatos/personaje/" + this.cajaserie.current.value + "/" + this.cajapersonaje.current.value}></Navigate>
                }
                <h2 className='text-center text-danger p-2'>MODIFICAR PERSONAJES</h2>
                <h3 className='text-center p-'>Elige una serie para ver sus personajes</h3>

                <div className="w-100 d-flex justify-content-center">
                    <form onSubmit={this.enviarAactualizar} >
                        <label>Serie: </label>
                        <select className='form-select' ref={this.cajaserie} onClick={this.loadPersonajes}>
                            {
                                this.state.series.map((serie, index) => {
                                    return (
                                        <option value={serie.idSerie} key={index}>{serie.nombre}</option>
                                    )
                                })
                            }
                        </select>

                        {
                            this.state.personajesSerie.length != 0 &&
                            <label>Personajes: </label>
                        }
                        {
                            this.state.personajesSerie.length != 0 &&

                            <select className='form-select' ref={this.cajapersonaje}>
                                {
                                    this.state.personajesSerie.map((per, index) => {
                                        return (
                                            <option value={per.idPersonaje} key={index} >{per.nombre}</option>
                                        )
                                    })
                                }
                            </select>
                        }

                        <div className="d-grid p-2">
                            <input type="submit" value="Modificar" className='btn btn-danger' />
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
