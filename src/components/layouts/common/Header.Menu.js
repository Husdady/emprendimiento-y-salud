// React
import { Component, Fragment } from 'react'

// Components
import { Collapse } from '@common'
import NavigationItem from './Header.NavigationItem'

// Librarys
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// API
import { PUBLIC_URL } from '@api/credentials'

// Utils
import { classnames } from '@utils/Helper'

const omnilifeLogoMenu = require('@assets/img/header/logo-omnilife-menu.webp').default

// Menú para móviles
export default class HeaderMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }

    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
    this.renderMenuItems = this.renderMenuItems.bind(this)
    this.renderSubMenuItems = this.renderSubMenuItems.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.isOpen !== nextState.isOpen
  }

  // Abir menú
  openMenu() {
    this.setState({ isOpen: true })
  }

  // Cerrar menú
  closeMenu() {
    this.setState({ isOpen: false })
  }

  // Renderizar ícono en menú
  renderIcon({ isOpen }) {
    // Definir propiedades del ícono
    const icon = {
      name: isOpen ? 'times' : 'bars',
      id: isOpen ? 'close-menu' : 'menu',
      onClick: isOpen ? this.closeMenu : this.openMenu,
    }

    return <FontAwesomeIcon id={icon.id} icon={icon.name} className="pointer" onClick={icon.onClick} />
  }

  // Renderizar items anidados de menú
  renderSubMenuItems(subItems) {
    return subItems.map((subitem) => <NavigationItem key={subitem.id} onClick={this.closeMenu} {...subitem} />)
  }

  // Renderizar items de menú
  renderMenuItems() {
    return this.props.navigation.map((item, i) => {
      // Si un enlace tiene un submenu
      if (item.submenu) {
        const subItems = this.renderSubMenuItems(item.submenu)

        return (
          <Collapse key={item.id} subItems={subItems}>
            <NavigationItem {...item} showArrow type="text" />
          </Collapse>
        )
      }

      return <NavigationItem key={item.id} {...item} />
    })
  }

  render() {
    const { isOpen } = this.state
    const navigationItems = this.renderMenuItems()
    const menuClasses = classnames(['navigation-item-wrapper', isOpen ? 'open' : null])

    return (
      <Fragment>
        {/* Ícono para abrir / cerrar el Menú */}
        {this.renderIcon({ isOpen: this.state.isOpen })}

        <div className={menuClasses}>
          {/* Enlaces del Menú */}
          <ul>{navigationItems}</ul>

          {/* Logo Omnilife */}
          <figure>
            <Link href={PUBLIC_URL}>
              <a rel="noreferrer">
                <Image width={342} height={103} loading="eager" id="logo-omnilife" alt="omnilife-logo-menu" src={omnilifeLogoMenu.src} />
              </a>
            </Link>
          </figure>
        </div>
      </Fragment>
    )
  }
}
