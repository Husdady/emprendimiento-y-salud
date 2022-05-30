// React
import { Component, createElement, Fragment } from 'react'

// Librarys
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// API
import { PUBLIC_URL } from '@api/credentials'

// Elemento de navegación
export default class NavigationItem extends Component {
  static defaultProps = {
    tag: 'li',
    type: 'link',
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderTypeItem = this.renderTypeItem.bind(this)
    this.renderItemContent = this.renderItemContent.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar contenido de item
  renderItemContent() {
    return <NavigationItemContent icon={this.props.icon} title={this.props.title} showArrow={this.props.showArrow} />
  }

  // Renderizar elemento dependiendo de su tipo
  renderTypeItem() {
    const content = this.renderItemContent()

    if (this.props.type === 'text') {
      return <span className="link pointer">{content}</span>
    }

    const { path, isExternalUrl } = this.props
    const activePath = (!isExternalUrl ? PUBLIC_URL : '') + (path.pathname || path)

    return (
      <Link href={activePath}>
        <a className="link" target={path?.target} rel="noreferrer">
          {content}
        </a>
      </Link>
    )
  }

  // Renderizar elemento de navegación
  renderItem() {
    const attributes = {
      onClick: this.props.onClick,
      className: 'navigation-item d-inline-block pointer',
    }

    const el = this.renderTypeItem()
    const item = createElement(this.props.tag, attributes, el)

    return item
  }

  render() {
    return this.renderItem()
  }
}

// <------------------------ Extra Components ------------------------>
// Contenido de elemento de navegación
export class NavigationItemContent extends Component {
  constructor(props) {
    super(props)
    this.renderCaretDown = this.renderCaretDown.bind(this)
    this.renderItemContent = this.renderItemContent.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar flecha hacia abajo en elemento de navegación
  renderCaretDown() {
    if (!this.props.showArrow) return

    return <FontAwesomeIcon icon="caret-down" className="ms-2" />
  }

  // Renderizar contenido de elemento de navegación
  renderItemContent() {
    return (
      <Fragment>
        {/* Ícono */}
        <FontAwesomeIcon icon={this.props.icon} className="me-2" />

        {/* Título */}
        <span>{this.props.title}</span>

        {/* Flecha abajo */}
        {this.renderCaretDown()}
      </Fragment>
    )
  }

  render() {
    return this.renderItemContent()
  }
}
