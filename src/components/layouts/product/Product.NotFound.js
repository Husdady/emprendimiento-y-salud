// React
import { Component } from 'react'

// Components
import { Button } from '@common'
import { withRouter } from 'next/router'

// Librarys
import Head from 'next/head'
import Image from 'next/image'

const batman = require('@assets/img/404/batman.gif').default.src

class ProductNotFound extends Component {
  constructor(props) {
    super(props)
    this.isSeytuCompany = this.props.company === 'seytu'

    this.button = {
      textColor: this.isSeytuCompany ? '#ffffff' : 'var(--bg-yellow)',
      backgroundColor: this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)',
    }
  }

  shouldComponentUpdate() {
    return false
  }

  // Redireccionar a la sección de productos Omnilife o Seytú
  onRedirectToProductsSection = () => {
    const { pathname } = this.props.router
    const lastPath = pathname.slice(0, pathname.lastIndexOf('/'))
    this.props.router.push(lastPath)
  }

  render() {
    return (
      <div className="product-not-found position-absolute w-100 d-flex jc-center align-items-center flex-column">
        <Head>
          <title>Producto no encontrado</title>
        </Head>

        {/* Imagen de batman */}
        <Image src={batman} width={397} height={283} alt="batman" />

        {/* Mensaje */}
        <h2 className="title text-center mb-0">Lo sentimos, el producto que estás buscando no existe!</h2>

        {/* Botón 'Volver a la sección que muestra los productos' */}
        <Button
          icon={this.props.buttonIcon}
          title={this.props.buttonTitle}
          onClick={this.onRedirectToProductsSection}
          textColor={this.button.textColor}
          backgroundColor={this.button.backgroundColor}
          className="go-to-products-sections scale mt-4 rounded-pill py-3 px-5"
        />
      </div>
    )
  }
}

export default withRouter(ProductNotFound)
