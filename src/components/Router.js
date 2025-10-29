import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Serie from './Serie'
import Personajes from './Personajes'
import CrearPersonaje from './CrearPersonaje'
import ModificarPersonaje from './ModificarPersonaje'
import ActualizarPersonaje from './ActualizarPersonaje'

export default class Router extends Component {
  render() {

    function SendSerie(){
        let {idserie} = useParams()
        return <Serie idserie={idserie}/>
    }

    function SendPersonajesSerie(){
        let {idserie} = useParams()
        return <Personajes idserie={idserie}/>
    }

    function SendPersonajeModificar(){
        let {idserie , idpersonaje} = useParams()
        return <ActualizarPersonaje idserie={idserie} idpersonaje={idpersonaje}/>
    }

    return (
      <BrowserRouter>
      <Menu/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path='/serie/:idserie' element={<SendSerie/>}/>
            <Route path='/personajesserie/:idserie' element={<SendPersonajesSerie/>}/>
            <Route path="/crearpersonaje" element={<CrearPersonaje/>}/>
            <Route path='/modificarpersonaje' element={<ModificarPersonaje/>}/>
            <Route path='/actualizardatos/personaje/:idserie/:idpersonaje' element={<SendPersonajeModificar/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
