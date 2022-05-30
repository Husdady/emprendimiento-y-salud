// React
import React, { Component } from 'react'

// Librarys
import { Collapse } from 'antd'

// Utils
import { isArray } from '@utils/Validations'

export default class CustomCollapse extends Component {
  static defaultProps = {
    showArrow: false,
  }

  constructor(props) {
    super(props)
    this.renderItems = this.renderItems.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar elementos de 'Collapse'
  renderItems() {
    return this.props.children.map((item, i) => (
      <Collapse.Panel key={i} header={item} showArrow={this.props.showArrow}>
        {item?.props?.subItems}
      </Collapse.Panel>
    ))
  }

  // Renderizar contenido de 'Collapse'
  renderContent() {
    const { children, subItems } = this.props

    if (!isArray(children)) {
      return (
        <Collapse.Panel header={children} showArrow={this.props.showArrow}>
          {subItems}
        </Collapse.Panel>
      )
    }

    return this.renderItems()
  }

  render() {
    return <Collapse>{this.renderContent()}</Collapse>
  }
}
