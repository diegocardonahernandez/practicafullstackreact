import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Serie from './Serie'
import Personajes from './Personajes'
import CrearPersonaje from './CrearPersonaje'
import ModificarPersonaje from './ModificarPersonaje'

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

    return (
      <BrowserRouter>
      <Menu/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path='/serie/:idserie' element={<SendSerie/>}/>
            <Route path='/personajesserie/:idserie' element={<SendPersonajesSerie/>}/>
            <Route path="/crearpersonaje" element={<CrearPersonaje/>}/>
            <Route path='/modificarpersonaje' element={<ModificarPersonaje/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
