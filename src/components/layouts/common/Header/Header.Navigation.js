// React
import { Component } from 'react'

// Components
import { Dropdown } from '@common'
import Menu from './Header.Menu'
import NavigationItem, { NavigationItemContent } from './Header.NavigationItem'

// Librarys
import Image from 'next/image'

// Utils
import { isFalse } from '@utils/Validations'
import { getWindowSize } from '@utils/Helper'

// JSON
import navigation from '@assets/json/navigation'

const seytuLogo = require('@assets/img/header/logo-seytu.webp').default.src

// Navegación de cabezera
export default class HeaderNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: null,
    }

    this.onMount = this.onMount.bind(this)
    this.handleShowMenu = this.handleShowMenu.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
    this.renderSubItems = this.renderSubItems.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.showMenu !== nextState.showMenu
  }

  componentDidMount() {
    this.onMount()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleShowMenu)
  }

  onMount() {
    this.handleShowMenu()

    // Ejecutar evento 'resize'
    window.addEventListener('resize', this.handleShowMenu)
  }

  // Mostrar / ocultar menú de navegación
  handleShowMenu() {
    const { isGreaterThanMQ } = getWindowSize()

    if (this.state.showMenu !== isGreaterThanMQ) {
      this.setState({ showMenu: isGreaterThanMQ })
    }
  }

  // Renderizar enlaces anidados de navegación
  renderSubItems(subItems) {
    return subItems.map((subitem) => ({
      el: <NavigationItem tag="div" key={subitem.id} {...subitem} />,
    }))
  }

  // Renderizar enlaces de navegación
  renderNavigationItems() {
    return navigation.map((item, i) => {
      // Si un enlace tiene un submenu
      if (item.submenu) {
        const subItems = this.renderSubItems(item.submenu)

        return (
          <li key={item.id} className="navigation-item d-inline-block">
            <Dropdown subItems={subItems}>
              <span className="link pointer">
                <NavigationItemContent title={item.title} icon={item.icon} showArrow />
              </span>
            </Dropdown>
          </li>
        )
      }

      return <NavigationItem key={item.id} {...item} />
    })
  }

  // Renderizar menú de navegación
  renderMenu() {
    // Comprobar si se debe mostrar el menú
    if (isFalse(this.state.showMenu)) {
      return <Menu navigation={navigation} />
    }

    const navigationItems = this.renderNavigationItems()
    return <ul className="navigation-item-wrapper m-0 p-0">{navigationItems}</ul>
  }

  render() {
    return (
      <nav id="navigation" className="d-flex jc-between align-items-center">
        {/* Logo Seytú */}
        <figure id="logo-seytu" className="mb-0 position-relative">
          <Image priority alt="seytu-logo" loading="eager" layout="fill" objectFit="contain" src={seytuLogo} />
        </figure>

        {/* Enlaces de navegación */}
        {this.renderMenu()}
      </nav>
    )
  }
}
