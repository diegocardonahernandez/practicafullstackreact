import axios from 'axios'
import React, { Component } from 'react'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class Serie extends Component {

    state = {
        serie: []
    }

    loadSerie = () => {
        console.log("Accediendo a los datos da la serie...")
        let request = "api/Series/" + this.props.idserie
        axios.get(Global.url + request).then(response => {
            console.log("Datos Serie recibidos!!!")
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSerie()
    }

    componentDidUpdate = (oldprops) => {
        if(oldprops.idserie != this.props.idserie){
            this.loadSerie()
        }
    }

    render() {
        return (
            <div>
                <main className="w-100 d-flex flex-wrap justify-content-center p-3">
                    <div className="card" >
                        <img src={this.state.serie.imagen} className='card-img-top'/>
                        <div className="card-body">
                            <h3 className="card-title text-center text-danger">{this.state.serie.nombre}</h3>
                            <p className="card-text text-center">Puntuación: {this.state.serie.puntuacion}</p>
                            <p className="card-text text-center">Año: {this.state.serie.anyo}</p>
                            <div className="d-grid">
                                <NavLink className={"btn btn-danger"} to={"/personajesserie/"+this.state.serie.idSerie}>Personajes</NavLink>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
