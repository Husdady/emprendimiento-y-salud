// React
import { Component } from 'react'

// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@api/credentials'

export default class AffiliateProgramHeader extends Component {
  render() {
    const pageTitle = `Sitio web en mantenimiento | ${APP_NAME}`

    return (
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="https://emprendimientoysalud.com" />
        <meta
          name="description"
          content="Emprendimiento y Salud en mantenimiento."
        />
        <title>{pageTitle}</title>
      </Head>
    )
  }
}
