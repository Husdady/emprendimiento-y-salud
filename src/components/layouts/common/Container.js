// React
import { Component, Fragment } from 'react'

// Components
import Header from './Header'

// Librarys
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('./Footer'))

export default class Container extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main id="root" role="main">
          {this.props.children}
        </main>
        <Footer />
      </Fragment>
    )
  }
}
