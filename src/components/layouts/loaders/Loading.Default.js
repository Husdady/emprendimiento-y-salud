// React
import { Component, Fragment } from 'react'

// Librarys
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// Utils
import { isFunction } from '@utils/Validations'

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.renderTitle = this.renderTitle.bind(this)
    this.renderIndicator = this.renderIndicator.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar título
  renderTitle() {
    if (!this.props.title && !this.props.renderTitle) return

    if (isFunction(this.props.renderTitle)) {
      return this.props.renderTitle()
    }

    return (
      <span className="title ms-3" style={this.props.titleStyle}>
        {this.props.title}
      </span>
    )
  }

  // Renderizar loading
  renderIndicator() {
    return (
      <Fragment>
        <LoadingOutlined style={this.props.style} spin />

        {/* Renderizar título */}
        {this.renderTitle()}
      </Fragment>
    )
  }

  render() {
    const indicator = this.renderIndicator()

    return <Spin indicator={indicator} className={this.props.className} style={this.props.containerStyle} />
  }
}
