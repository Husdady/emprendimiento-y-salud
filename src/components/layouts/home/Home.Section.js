// React
import { Component } from 'react'

// Components
import { Button } from '@common'

// Librarys
import AOS from 'aos'
import Link from 'next/link'
import Image from 'next/image'

// Utils
import { classnames, scrollToSection } from '@utils/Helper'

export default class Section extends Component {
  static defaultProps = {
    img: {
      alt: 'img',
      width: 300,
      height: 300,
    },
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    // Inicializar AOS
    AOS.init({
      once: true,
    })

    // Realizar scroll hacia la primera sección
    scrollToSection('shortcut-h21ga')
  }

  componentWillUnmount() {
    window.removeEventListener('load', scrollToSection)
  }

  // Renderizar botón
  renderButton() {
    const { button } = this.props

    // Si es un botón, que al hacer clickeado, redirige a una sección de la página
    if (button.shortcut) {
      return (
        <Button
          style={button.style}
          textColor={button.style?.color}
          backgroundColor={button.style?.backgroundColor}
          title="Más información"
          className="more-information d-table mt-1 mb-4 rounded-1 opacity"
          onClick={() => scrollToSection({ duration: 4000, shortcut: button.shortcut })}
        />
      )
    }

    // Si es un botón, que al hacer clickeado, navega a otra página
    if (button.link) {
      return (
        <Link href={button.link}>
          <a className="more-information d-table rounded-1 opacity" style={button.style}>
            Más información
          </a>
        </Link>
      )
    }
  }

  render() {
    const { img, title, shortcut, description } = this.props
    const imgSrc = require('@assets/img/' + img.path).default.src
    const sectionClasses = classnames(['about-omnilife', shortcut])

    return (
      <section className={sectionClasses} style={this.props.containerStyle}>
        <div className="container mx-auto" style={this.props.wrapperStyle}>
          <div className="wrapper flex jc-around align-items-center" data-aos="zoom-in" data-aos-duration={3000}>
            <article className="info lh-normal" style={title.containerStyle}>
              {/* Titulo de la sección */}
              <h2 style={title.style} className="title fw-bold">
                {title.name}
              </h2>

              {/* Descripción de la sección */}
              <p style={description.style} className="description">
                {description.name}
              </p>

              {/* Botón de la sección */}
              {this.renderButton.bind(this)()}
            </article>

            {/* Imagen de sección */}
            <figure style={img.containerStyle}>
              <Image alt={img.alt} width={img.width} height={img.height} src={imgSrc} />
            </figure>
          </div>
        </div>
      </section>
    )
  }
}
