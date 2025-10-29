import axios from 'axios'
import React, { Component } from 'react'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {

    state = {
        personajes: []
    }

    loadPersonajes = () => {
        console.log("Buscando personajes...")
        let request = "api/Series/PersonajesSerie/" + this.props.idserie
        axios.get(Global.url + request).then(response => {
            console.log("Personajes recibidos!")
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes()
    }

    render() {
        return (
            <div>
                <h2 className='text-center text-danger p-3'>PERSONAJES</h2>
                <div className="text-center">
                    <NavLink className={"btn btn-danger"} to={"/serie/"+this.props.idserie}>Volver</NavLink>
                </div>
                <div className="w-100 d-flex justify-content-center p-2">
                    <table className='table table-bordered table-danger w-25'>
                        <thead>
                            <tr>
                                <th>ID PERSONAJE</th>
                                <th>NOMBRE</th>
                                <th>APARIENCIA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.personajes.map((per, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{per.idPersonaje}</td>
                                            <td>{per.nombre}</td>
                                            <td><img src={per.imagen} width={50} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
