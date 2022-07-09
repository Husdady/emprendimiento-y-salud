// React
import { Component, Fragment } from 'react'

// Components
import HeaderNavigation from './Header.Navigation'
import HeaderBackgroundImage from './Header.BackgroundImage'

export default class Header extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Fragment>
        {/* Imagen de fondo de cabezera */}
        <HeaderBackgroundImage />

        {/* Navegación de cabezera */}
        <HeaderNavigation />
      </Fragment>
    )
  }
}
