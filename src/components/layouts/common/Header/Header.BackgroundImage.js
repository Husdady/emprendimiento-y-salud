// React
import { Component } from 'react'

// Librarys
import Image from 'next/image'

// Utils
import { getWindowSize } from '@utils/Helper'

const omnilifeLogo = require('@assets/img/header/logo-omnilife.webp').default.src

// Fondo de cabezera
export default class HeaderBackgroundImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHeaderBackground: true,
    }

    this.onMount = this.onMount.bind(this)
    this.handleShowHeaderBackground = this.handleShowHeaderBackground.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.showHeaderBackground !== nextState.showHeaderBackground
  }

  componentDidMount() {
    this.onMount()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleShowHeaderBackground)
  }

  onMount() {
    // Mostrar / ocultar imagen de fondo de cabezera
    this.handleShowHeaderBackground()

    // Ejecutar evento 'resize'
    window.addEventListener('resize', this.handleShowHeaderBackground)
  }

  // Mostrar / ocultar imagen de fondo de la cabezera dependiendo de la media query
  handleShowHeaderBackground() {
    const { isGreaterThanMQ } = getWindowSize()

    if (this.state.showHeaderBackground !== isGreaterThanMQ) {
      this.setState({ showHeaderBackground: isGreaterThanMQ })
    }
  }

  render() {
    if (!this.state.showHeaderBackground) {
      return null
    }

    return (
      <header>
        <figure className="logo-omnilife mb-0 position-relative">
          <Image priority alt="omnilife-logo" loading="eager" layout="fill" objectFit="contain" src={omnilifeLogo} />
        </figure>
      </header>
    )
  }
}
