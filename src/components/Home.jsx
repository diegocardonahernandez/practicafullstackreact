import React, { Component } from 'react'
import foto from './../assets/images/homeimage.webp'

export default class Home extends Component {
  render() {
    return (
      <div>
            <h1 className=' p-3 text-center text-danger'>PRACTICA FULL STACK - SERIES</h1>
            <div className="w-100 d-flex justify-content-center">
                <img src={foto} width={"38%"} />
            </div>

      </div>
    )
  }
}
