// React
import { Component, Fragment } from 'react'

// Librarys
import Head from 'next/head'

const totalDots = 6
const elems = new Array(totalDots)
const callback = (_, i) => <div key={i} className="sk-chase-dot" />
const dots = Array.from(elems, callback)

export default class Loading extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Fragment>
        {/* Head */}
        <Head>
          <title>Cargando...</title>
        </Head>

        <div style={this.props.style} className="w-100 h-100vh d-flex align-items-center jc-center">
          <div className="sk-chase">{dots}</div>
        </div>
      </Fragment>
    )
  }
}
