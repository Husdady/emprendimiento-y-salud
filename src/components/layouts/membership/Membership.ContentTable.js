// React
import { Component } from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import { scrollToSection } from '@utils/Helper'

// JSON
import tableContentLinks from '@assets/json/membership/table-content-links.json'

// Tabla de contenido del programa de afiliados
export default class ContentTable extends Component {
  // Renderizar sub enlace
  renderSubLink(subLink, i) {
    return (
      <li key={i} className="sub-link pointer">
        <span className="title" onClick={() => scrollToSection(subLink.shortcut)}>
          {subLink.title}
        </span>
      </li>
    )
  }

  // Renderizar enlace
  renderLink = (link, i) => {
    return (
      <li key={i} className="link pointer">
        {/* Título del enlace */}
        <span className="title">{link.title}</span>

        {/* Enlaces anidados */}
        {link.subItems && <ol className="sub-links">{link.subItems.map(this.renderSubLink)}</ol>}
      </li>
    )
  }

  // Renderizar enlaces
  renderLinks() {
    return tableContentLinks.map(this.renderLink)
  }

  render() {
    return (
      <aside className="table-of-contens">
        {/* Título*/}
        <h3 className="title">
          <FontAwesomeIcon icon="receipt" />
          <span>Índice de contenido:</span>
        </h3>

        {/* Enlaces */}
        <ol className="links">{this.renderLinks()}</ol>
      </aside>
    )
  }
}
