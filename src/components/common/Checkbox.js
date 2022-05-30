// React
import { Component } from 'react'

// Utils
import { classnames } from '@utils/Helper'

export default class Checkbox extends Component {
  static defaultProps = {
    title: '',
    checked: true,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checked || this.props.needRenderAgain !== nextProps.needRenderAgain
  }

  render() {
    const checkboxClasses = classnames(['checkbox', this.props.checked ? 'active' : null, this.props.className])

    return (
      <span style={this.props.style} className={checkboxClasses} onClick={this.props.onCheck}>
        <span className="title pointer d-flex align-items-center">{this.props.title}</span>
      </span>
    )
  }
}
