// React
import { Component } from 'react'

// Utils
import { classnames } from '@utils/Helper'

export default class Divider extends Component {
  static defaultProps = {
    width: '100%',
    color: 'var(--bg-gray-100)',
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const dividerClasses = classnames(['divider', this.props.className])

    return (
      <div
        className={dividerClasses}
        style={{
          height: 0.5,
          width: this.props.width,
          backgroundColor: this.props.color,
        }}
      />
    )
  }
}
