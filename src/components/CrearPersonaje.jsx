import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

export default class CrearPersonaje extends Component {

    cajanombre = React.createRef()
    cajaimagen = React.createRef()
    cajaserie = React.createRef()

    state = {
        series: [],
        operacionExitosa: false
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

    insertarPersonaje = (e) => {
        e.preventDefault()
        console.log("Procesando petición de inserción...")
        let request = "api/Personajes"
        let newPersonaje = {
            "idPersonaje": 0,
            "nombre": this.cajanombre.current.value,
            "imagen": this.cajaimagen.current.value,
            "idSerie": parseInt(this.cajaserie.current.value)
        }

        console.log(Global.url + request)

        axios.post(Global.url + request, newPersonaje).then(response => {
            console.log("Usuario insertado")
            Swal.fire({
                icon: "success",
                iconColor: "blue",
                title: "Usuario insertado correctamente!",
                text: "Serás redirigo a la vista de personajes de la serie que has elegido",
                timer: 4000,
                timerProgressBar: true,
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

                {this.state.operacionExitosa &&
                    <Navigate to={"/personajesserie/" + this.cajaserie.current.value} />
                }

                <h3 className='text-center p-3' style={{ color: 'darkblue' }}>NUEVO PERSONAJE</h3>

                <div className="w-100 d-flex justify-content-center">
                    <form onSubmit={this.insertarPersonaje}>
                        <label>Nombre: </label>
                        <input type="text" className='form-control' ref={this.cajanombre} />
                        <label>Imagen: </label>
                        <input type="text" className='form-control' ref={this.cajaimagen} />
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
                        <div className="d-grid p-2">
                            <input type="submit" value="Insertar" className='btn btn-primary' />
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
