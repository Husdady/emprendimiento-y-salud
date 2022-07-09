// React
import { Component, Fragment } from 'react'

// Components
import Header from '@layouts/common/Header'

// Librarys
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@layouts/common/Footer'))

export default class MainContainer extends Component {
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
