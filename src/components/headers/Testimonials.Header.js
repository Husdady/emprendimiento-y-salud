// React
import { Component } from 'react'

// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@api/credentials'

export default class SeytuProductsHeader extends Component {
  render() {
    const pageTitle = `Testimonios | ${APP_NAME}`
    return (
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="https://emprendimientoysalud.com/testimonios" />
        <meta name="keywords" content="omnilife testimonios, testimonios Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza" />
        <meta name="description" content="Testimonios que nos inspiran a ser Gente que Cuida a la Gente, ven y conoce más sobre las historias de personas que cambiaron su vida gracias a Omnilife" />
        <title>{pageTitle}</title>
      </Head>
    )
  }
}
