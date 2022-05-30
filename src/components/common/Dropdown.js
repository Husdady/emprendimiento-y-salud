// React
import React, { Component } from 'react'

// Librarys
import { Menu, Dropdown } from 'antd'

// Utils
import { isArray } from '@utils/Validations'

export default class CustomDropdown extends Component {
  static defaultProps = {
    subItems: [],
    trigger: ['hover'],
    placement: 'bottomCenter',
  }

  constructor(props) {
    super(props)
    this.renderOverlay = this.renderOverlay.bind(this)
    this.renderSubMenuItems = this.renderSubMenuItems.bind(this)
  }

  // Renderizar elemento anidado
  renderSubMenuItems() {
    const { subItems } = this.props

    if (!isArray(subItems)) return

    return subItems.map((subItem, i) => <Menu.Item key={i}>{subItem?.el}</Menu.Item>)
  }

  // Renderizar recubrimiento
  renderOverlay() {
    return <Menu>{this.renderSubMenuItems()}</Menu>
  }

  render() {
    return (
      <Dropdown {...this.props} className="pointer" overlay={this.renderOverlay}>
        {this.props.children}
      </Dropdown>
    )
  }
}
