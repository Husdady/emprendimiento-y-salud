// React
import { Component } from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Business extends Component {
  static defaultProps = {
    items: [],
  }

  // Renderizar beneficios del negocio
  renderBusinessItems() {
    return this.props.items.map((item, i) => <BusinessItem key={i} {...item} />)
  }

  render() {
    return (
      <div className="about-omnilife-business">
        <div className="wrapper flex jc-center position-relative">
          {/* Beneficios del negocio */}
          {this.renderBusinessItems()}

          {/* Efecto de ola */}
          <Wave />
        </div>
      </div>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class BusinessItem extends Component {
  render() {
    return (
      <section className="business-item text-center" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" data-aos-duration={3000}>
        {/* Ícono */}
        <FontAwesomeIcon icon={this.props.icon} size="4x" />

        {/* Título */}
        <h3 className="title fw-bold my-2">{this.props.title}</h3>

        {/* Descripción */}
        <p className="description">{this.props.description}</p>
      </section>
    )
  }
}

export class Wave extends Component {
  render() {
    return (
      <div className="wave position-absolute w-100 bottom-0">
        <svg className="d-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#e4e4e4"
            fillOpacity="1"
            d="M0,192L48,202.7C96,213,192,235,288,234.7C384,235,480,213,576,224C672,235,768,277,864,266.7C960,256,1056,192,1152,170.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    )
  }
}
