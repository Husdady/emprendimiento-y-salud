// React
import { Component } from 'react'

// Component
import { Button } from '@common'

// Librarys
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ProductImages extends Component {
  shouldComponentUpdate() {
    return false
  }
  
  // Abrir Whatsapp de la distribuidora Omnilife
  openWhatsapp() {
    const message = `Hola :), me interesa el producto "${this.props.product.name}". Necesito que me des más información sobre el producto..`

    const wspMessage = message.split(' ').join('%20')

    const link = 'https://api.whatsapp.com/send?phone=51951871023&text=' + wspMessage

    window.open(link, '_blank')
  }

  render() {
    return (
      <div className="product-images p-4">
        <Images company={this.props.company} data={this.props.product.images} />

        {/* Botón 'contactar distribuidora' */}
        <Button icon={['fab', 'whatsapp']} title="Contactar distribuidora" className="contact-distributor d-block mx-auto rounded-2" onClick={this.openWhatsapp} />

        {/* Nota */}
        <span className="note">NOTA: Antes de comprar algún producto, contáctame comnigo para poder darte asesoramiento. Evita comprar sin antes saber los beneficios y el uso de cada producto.</span>
      </div>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class Images extends Component {
  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)
    this.renderArrowPrev = this.renderArrowPrev.bind(this)
    this.renderArrowNext = this.renderArrowNext.bind(this)
    this.renderImages = this.renderImages.bind(this)

    this.isOnlyItem = this.props.data.length === 1
    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeColor = this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)'

    this.arrowStyle = {
      top: '50%',
      zIndex: 999,
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }

  // Renderizar flecha <--
  renderArrowPrev(decrement) {
    if (this.isOnlyItem) return

    return (
      <FontAwesomeIcon size="2x" id="arrow-circle-left" icon="arrow-circle-left" className="pointer position-absolute start-0" onClick={decrement} style={this.arrowStyle} color={this.activeColor} />
    )
  }

  // Renderizar flecha -->
  renderArrowNext(increment) {
    if (this.isOnlyItem) return

    return (
      <FontAwesomeIcon size="2x" id="arrow-circle-right" icon="arrow-circle-right" className="pointer position-absolute end-0" onClick={increment} style={this.arrowStyle} color={this.activeColor} />
    )
  }

  // Renderizar imágenes
  renderImages() {
    return this.props.data.map((image, i) => (
      <div key={i} className="product-image" style={{ backgroundImage: `url(${image.url})` }}>
        <img src={image.url} width={image.width} height={image.height} />
      </div>
    ))
  }

  render() {
    return (
      <Carousel
        infiniteLoop
        showStatus={false}
        stopOnHover={false}
        showThumbs={!this.isOnlyItem}
        showIndicators={!this.isOnlyItem}
        renderArrowPrev={this.renderArrowPrev}
        renderArrowNext={this.renderArrowNext}
      >
        {this.renderImages()}
      </Carousel>
    )
  }
}
