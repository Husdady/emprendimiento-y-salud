// React
import { Component } from 'react'

// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@api/credentials'

export default class OmnilifeProductsHeader extends Component {
  render() {
    const pageTitle = `Productos Omnilife | ${APP_NAME}`

    return (
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="https://emprendimientoysalud.com/productos-omnilife" />
        <meta name="keywords" content="productos omnilife, productos Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza" />
        <meta
          name="description"
          content="Los productos Omnilife son suplementos nutricionales micelizados que aportan a nuestro organismo los nutrientes necesarios para su buen funcionamiento. Existen más de 50 productos con diferentes beneficios para la salud."
        />
        <title>{pageTitle}</title>
      </Head>
    )
  }
}
