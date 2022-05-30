// React
import { Component, Fragment } from 'react'

// Librarys
import Head from 'next/head'
import Loading from '@layouts/loaders/Loading.Cubes'

// API
import { APP_NAME } from '@api/credentials'

export default class ProductHeader extends Component {
  render() {
    const pageTitle = `${this.props.name} | ${APP_NAME}`

    return (
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={window.location.href} />
        <meta name="keywords" content="productos Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza" />
        <meta name="description" content={this.props.description} />
        <title>{pageTitle}</title>
      </Head>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class LoadingProductHeader extends Component {
  render() {
    return (
      <Fragment>
        {/* Head */}
        <Head>
          <title>Cargando producto...</title>
        </Head>

        {/* Loading */}
        <Loading />
      </Fragment>
    )
  }
}
