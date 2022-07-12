// React
import { Component } from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Lists extends Component {
  static defaultProps = {
    data: [],
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar listas
  renderLists() {
    return this.props.data.map((list, i) => (
      <li key={i} className="list d-block">
        {/* Ícono */}
        <FontAwesomeIcon className="me-2" icon="check-circle" color="var(--bg-green)" />

        {/* Titulo */}
        <span>{list}</span>
      </li>
    ))
  }

  render() {
    const lists = this.renderLists.bind(this)()

    return <ul className="lists">{lists}</ul>
  }
}
