// React
import { Component } from 'react'

// Librarys
import Link from 'next/link'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ghost = require('@assets/img/404/ghost.gif').default.src
const magnifyingGlass = require('@assets/img/404/magnifying-glass.webp').default.src

export default class PageNotFound extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div id="page-not-found">
        <Head>
          <title>Página no encontrada - Emprendimiento y Salud</title>
        </Head>
        <img id="magnifying-glass" src={magnifyingGlass} alt="lupa" width={340} height={314} />

        <div className="wrapper">
          <figure>
            <img src={ghost} alt="ghost" width={250} height={250} />
          </figure>
          <h1 className="type-error">404</h1>

          <h3 className="title">Página no encontrada...</h3>

          <p className="message">¿No encuentras la página? - Comprueba si la url está bien escrita o vuelve al Inicio desde este enlace:</p>

          <Link href="/">
            <a className="go-to-home">
              <FontAwesomeIcon icon="home" />
              &nbsp;<span>Volver al inicio</span>
            </a>
          </Link>
        </div>
      </div>
    )
  }
}
