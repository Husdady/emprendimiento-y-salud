// React
import { Component, Fragment } from 'react'

// Librarys
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// API
import { PUBLIC_URL } from '@api/credentials'

// JSON
import sections from '@assets/json/footer-sections'

// Utils
import { isArray, isEmptyArray } from '@utils/Validations'

export default class Footer extends Component {
  shouldComponentUpdate() {
    return false
  }

  // Renderizar secciones de footer
  renderSections() {
    return sections.map((section, i) => <Section key={i} {...section} />)
  }

  render() {
    const sections = this.renderSections()

    return (
      <footer>
        {/* Secciones */}
        <div className="footer-content flex jc-between mx-auto pb-4">{sections}</div>

        {/* Autor */}
        <div id="copyright" className="mx-auto text-center py-2">
          <span>&copy; Página web hecha por</span>
          <a id="developer" target="_blank" rel="noreferrer" className="ms-1" href="https://www.linkedin.com/in/imanol-enrique/">
            Husdady
          </a>
        </div>
      </footer>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class Section extends Component {
  static defaultProps = {
    items: [],
  }

  constructor(props) {
    super(props)
    this.renderLinks = this.renderLinks.bind(this)
    this.renderTypeLink = this.renderTypeLink.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar contenido de un enlace dependiendo de su tipo
  renderTypeLink(type, link) {
    if (type === 'text') {
      return <span>{link.name}</span>
    }

    const { path, isExternalUrl } = link
    const activePath = (!isExternalUrl ? PUBLIC_URL : '') + (path.pathname || path)

    return (
      <Link href={activePath}>
        <a rel="noreferrer" target={link.path?.target}>
          {link.name}
        </a>
      </Link>
    )
  }

  // Renderizar enlaces
  renderLinks(links) {
    if (!isArray(links)) return

    return links.map((link, i) => (
      <li key={i} className="link py-2 px-0 lh-normal">
        {/* Ícono del enlace */}
        <FontAwesomeIcon icon={link.icon} className="me-2" />

        {/* Contenido del enlace */}
        {this.renderTypeLink(this.props.type, link)}
      </li>
    ))
  }

  // Renderizar botones
  renderButtons() {
    return (
      <Fragment>
        {/* Enlace para clientes */}
        <ButtonRegister title="Cliente admirable:" link={this.props.clientLink} />

        {/* Enlace para empresarios */}
        <ButtonRegister title="Empresario Omnilife:" link={this.props.businessmanLink} />
      </Fragment>
    )
  }

  // Renderizar contenido de 'footer'
  renderContent() {
    const { items } = this.props

    // Si 'items' no es un array, no mostrar nada
    if (!isArray(items)) return

    // Si 'items' no es un array vacío
    if (!isEmptyArray(items)) {
      return <ul className="wrapper-links m-0">{this.renderLinks(items)}</ul>
    }

    return this.renderButtons()
  }

  render() {
    return (
      <section className={this.props.className}>
        <h4 className="title text-uppercase">- {this.props.title} -</h4>
        {this.renderContent()}
      </section>
    )
  }
}

export class ButtonRegister extends Component {
  render() {
    return (
      <Fragment>
        {/* Título */}
        <h5 className="subtitle text-uppercase">{this.props.title}</h5>

        {/* Enlace */}
        <a className="register fw-bold d-table pointer" href={this.props.link} target="_blank" rel="noreferrer">
          ¡Registrarme ahora!
        </a>
      </Fragment>
    )
  }
}
