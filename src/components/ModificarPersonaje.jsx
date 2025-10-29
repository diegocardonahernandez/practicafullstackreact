import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate, NavLink } from 'react-router-dom'
import { data } from 'jquery'
import Swal from 'sweetalert2'

export default class ModificarPersonaje extends Component {

    cajaserie = React.createRef()
    cajapersonaje = React.createRef()

    state = {
        series: [],
        personajes: [],
        operacionExitosa: false,
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
        let request = "api/PErsonajes"
        axios.get(Global.url + request).then(response => {
            console.log("Personajes recibidos!")
            this.setState({
                personajes: response.data,
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries()
        this.loadPersonajes()
    }

    updatePersonaje = (e) => {
        e.preventDefault()
        let request = "api/Personajes/" + this.cajapersonaje.current.value + "/" + this.cajaserie.current.value
        axios.put(Global.url + request).then(response => {
            console.log("Datos actualizados correctamente")
            Swal.fire({
                title: "Datos actualizados correctamente",
                confirmButtonColor: "red"
            }).then(() => {
                this.setState({
                    operacionExitosa: true
                })
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.operacionExitosa &&
                    <Navigate to={"/personajesserie/" + this.cajaserie.current.value} />
                }
                <h2 className='text-center text-danger p-2'>MODIFICAR PERSONAJES</h2>
                <h3 className='text-center p-'>Elige una serie para ver sus personajes</h3>

                <div className="w-100 d-flex justify-content-center">
                    <form onSubmit={this.updatePersonaje} >
                        <label>Serie: </label>
                        <select className='form-select' ref={this.cajaserie}>
                            {
                                this.state.series.map((serie, index) => {
                                    return (
                                        <option value={serie.idSerie} key={index}>{serie.nombre}</option>
                                    )
                                })
                            }
                        </select>

                        <label>Personajes: </label>

                        <select className='form-select' ref={this.cajapersonaje}>
                            {
                                this.state.personajes.map((per, index) => {
                                    return (
                                        <option value={per.idPersonaje} key={index} >{per.nombre}</option>
                                    )
                                })
                            }
                        </select>


                        <div className="d-grid p-2">
                            <input type="submit" value="Modificar" className='btn btn-danger' />
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
