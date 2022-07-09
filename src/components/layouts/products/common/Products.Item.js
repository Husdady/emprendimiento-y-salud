// React
import { Component } from 'react'

// Components
import { Button } from '@common'
import Star from './Products.Star'

// Librarys
import Image from 'next/image'
import { withRouter } from 'next/router'

// API
import { PUBLIC_URL } from '@api/credentials'

// Utils
import { truncate, convertEmptySpacesInHyphens } from '@utils/Helper'

class Product extends Component {
  constructor(props) {
    super(props)
    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeColor = this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)'
    this.textButtonColor = this.isSeytuCompany ? 'var(--bg-white)' : 'var(--bg-yellow)'
    this.textColor = {
      color: this.activeColor,
    }

    this.extraData = {
      company: this.props.company,
      addFavoriteProduct: this.props.addFavoriteProduct,
      deleteFavoriteProduct: this.props.deleteFavoriteProduct,
      product: {
        _id: this.props._id,
        name: this.props.name,
        price: this.props.price.toFixed(2),
        stock: this.props.stock,
        defaultImage: {
          url: this.props.defaultImage.url,
          width: this.props.defaultImage.width,
          height: this.props.defaultImage.height,
          alt: convertEmptySpacesInHyphens(this.props.name),
        },
      },
    }

    this.productLink = `${PUBLIC_URL}/productos-${this.props.company}/${this.extraData.product.defaultImage.alt}`
  }

  shouldComponentUpdate() {
    return false
  }

  // Navegar hacia un producto
  goToProduct = () => this.props.router.push(this.productLink)

  render() {
    return (
      <div className="product d-flex flex-column position-relative">
        {/* Estrella que añade o elimina el producto a favoritos */}
        <Star productId={this.props._id} extraData={this.extraData} />

        {/* Nombre del producto */}
        <h3 className="title fw-bold text-center mx-auto mb-0 text-break" style={this.textColor}>
          {this.props.name}
        </h3>

        {/* Imagen del producto */}
        <figure className="mb-0 position-relative product-image mx-auto pointer opacity" onClick={this.goToProduct}>
          <Image
            loading="eager"
            placeholder="blur"
            objectFit="contain"
            layout="responsive"
            title={this.props.name}
            src={this.props.defaultImage.url}
            blurDataURL={this.props.defaultImage.url}
            width={this.props.defaultImage.width}
            height={this.props.defaultImage.height}
            alt={this.extraData.product.defaultImage.alt}
          />
        </figure>

        {/* Descripción del producto */}
        <p className="description fw-bold text-center m-auto mb-0 text-break" style={this.textColor}>
          {truncate(this.props.description, 75)}
        </p>

        {/* Precio del producto */}
        <h4 className="price fw-bold text-center">S/. {this.extraData.product.price}</h4>

        {/* Botón añadir producto a pedidos */}
        <Button
          icon="eye"
          title="Visualizar"
          textColor={this.textButtonColor}
          backgroundColor={this.activeColor}
          className="visualize mx-auto rounded-1"
          onClick={this.goToProduct}
        />
      </div>
    )
  }
}

export default withRouter(Product)
