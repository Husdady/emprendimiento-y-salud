// React
import { Component } from 'react'

// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@api/credentials'

export default class SeytuProductsHeader extends Component {
  render() {
    const pageTitle = `Productos Seytú | ${APP_NAME}`

    return (
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="https://emprendimientoysalud.com/productos-seytu" />
        <meta name="keywords" content="productos seytu, productos seytú, productos Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza" />
        <meta
          name="description"
          content={
            'SEYTU es una compañía que nos da la oportunidad de ser empresarios independientes generando de un 20% a 40% de ganancias sobre el producto. El maquillaje es "hipoalergénico", botánico y 100% natural no se prueba en animales, también es libre de gluten y aprueba de agua.'
          }
        />
        <title>{pageTitle}</title>
      </Head>
    )
  }
}
