// React
import { Component } from 'react'

export default class Loading extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="d-flex align-items-center jc-center w-100">
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div>
      </div>
    )
  }
}
