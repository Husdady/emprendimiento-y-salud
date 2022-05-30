// React
import { Component, createRef } from 'react'

// Components
import { Button } from '@common'
import Star from './Products.Star'
import OrderDetails from '@layouts/orders/Orders.Details'

// Librarys
import Link from 'next/link'
import Image from 'next/image'

// API
import { PUBLIC_URL } from '@api/credentials'

// Utils
import { truncate, convertEmptySpacesInHyphens } from '@utils/Helper'

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.refOrderDetails = createRef()
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
  }

  shouldComponentUpdate() {
    return false
  }

  // Mostrar detalles del pedido
  onShowOrderDetails = () => this.refOrderDetails.current?.show()

  render() {
    const productLink = `${PUBLIC_URL}/productos-${this.props.company}/${this.extraData.product.defaultImage.alt}`

    return (
      <div className="product d-flex flex-column position-relative">
        {/* Estrella que añade o elimina el producto a favoritos */}
        <Star productId={this.props._id} extraData={this.extraData} />

        {/* Nombre del producto */}
        <h3 className="title fw-bold text-center mx-auto mb-0 text-break" style={this.textColor}>
          {this.props.name}
        </h3>

        {/* Imagen del producto */}
        <Link href={productLink}>
          <figure className="mb-0 position-relative product-image mx-auto pointer opacity">
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
        </Link>

        {/* Descripción del producto */}
        <p className="description fw-bold text-center m-auto mb-0 text-break" style={this.textColor}>
          {truncate(this.props.description, 75)}
        </p>

        {/* Precio del producto */}
        <h4 className="price fw-bold text-center">S/. {this.extraData.product.price}</h4>

        {/* Botón añadir producto a pedidos */}
        <Button
          icon="plus"
          title="Añadir a pedidos"
          textColor={this.textButtonColor}
          backgroundColor={this.activeColor}
          className="add-to-orders mx-auto rounded-1"
          onClick={this.onShowOrderDetails}
        />

        {/* Detalles del pedido */}
        <OrderDetails ref={this.refOrderDetails} company={this.props.company} product={this.extraData.product} />
      </div>
    )
  }
}
