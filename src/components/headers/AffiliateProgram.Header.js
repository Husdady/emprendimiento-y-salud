// React
import { Component } from 'react'

// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@api/credentials'

export default class AffiliateProgramHeader extends Component {
  render() {
    const pageTitle = `Programa de afiliados | ${APP_NAME}`

    return (
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="https://emprendimientoysalud.com/programa-de-afiliados" />
        <meta
          name="keywords"
          content="afiliación omnilife, afiliar omnilife, programa de afiliados, Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza"
        />
        <meta
          name="description"
          content="Emprendimiento y Salud distribuye productos Omnilife y Seytú, en nuestra página hablamos sobre el negocio Omnilife, nuestra distribuidora independiente Yessica Milagros brinda asesoramiento para emprendender con las redes de mercadeo."
        />
        <title>{pageTitle}</title>
      </Head>
    )
  }
}
