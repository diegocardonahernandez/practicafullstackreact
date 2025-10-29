import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default class ActualizarPersonaje extends Component {

    cajaidpersonaje = React.createRef()
    cajanombre = React.createRef()
    cajaimagen = React.createRef()
    cajaserie = React.createRef()

    state = {
        personaje: [],
        operacionExitosa: false
    }

    loadPersonajeData = () => {
        console.log("Accediendo al servicio de personaje...")
        let request = "api/Personajes/" + this.props.idpersonaje
        axios.get(Global.url + request).then(response => {
            console.log("personaje recibidas!")
            this.setState({
                personaje: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajeData()
    }

    modificarPersonaje = (e) => {
        e.preventDefault()
        console.log("Procesando petición de modificacion...")
        let request = "api/Personajes"
        let personajeModified = {
            "idPersonaje": parseInt(this.props.idpersonaje),
            "nombre": this.cajanombre.current.value,
            "imagen": this.cajaimagen.current.value,
            "idSerie": parseInt(this.props.idserie)
        }

        axios.put(Global.url + request, personajeModified).then(response => {
            console.log("Usuario Modificado")
            Swal.fire({
                icon: "success",
                iconColor: "green",
                title: "Usuario modificado correctamente!",
                text: "Serás redirigo a la vista de personajes de la serie",
                timer: 4000,
                timerProgressBar: true,
                confirmButtonColor: "green"
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
                    <Navigate to={"/personajesserie/" + this.props.idserie} />
                }

                <h3 className='text-center p-3' style={{ color: 'darkblue' }}>MODIFICAR PERSONAJE</h3>

                <div className="w-100 d-flex justify-content-center">
                    <form onSubmit={this.modificarPersonaje}>
                        <label>ID</label>
                        <input className='form-control' type="number" defaultValue={this.props.idpersonaje} disabled />
                        <label>Nombre: </label>
                        <input type="text" className='form-control' ref={this.cajanombre} defaultValue={this.state.personaje.nombre} />
                        <label>Imagen: </label>
                        <input type="text" className='form-control' ref={this.cajaimagen} defaultValue={this.state.personaje.imagen} />
                        <label>Serie: </label>
                        <input type="number" className='form-control' defaultValue={this.props.idserie} disabled />
                        <div className="d-grid p-2">
                            <input type="submit" value="Modificar" className='btn btn-primary' />
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
