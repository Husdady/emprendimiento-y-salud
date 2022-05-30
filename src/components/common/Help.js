// React
import { Component, Fragment } from 'react'

// Librarys
import { Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import { isTrue } from '@utils/Validations'

export default class Help extends Component {
  static defaultProps = {
    size: 'lg',
    defaultVisible: false,
    title: 'Ingresa un titulo',
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      placement: 'top',
    }

    this.showTooltip = this.showTooltip.bind(this)
    this.updateTooltipPlacement = this.updateTooltipPlacement.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.visible !== nextState.visible || this.state.placement !== nextState.placement
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateTooltipPlacement)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTooltipPlacement)
  }

  // Actualizar posicionamiento de ícono de ayuda
  updateTooltipPlacement() {
    const { placement } = this.state
    const isMobile = window.innerWidth <= 600
    const isTopPlacement = placement === 'top'

    if (!isMobile) {
      return !isTopPlacement && this.setState({ placement: 'top' })
    }

    return isTopPlacement && this.setState({ placement: 'left' })
  }

  // Mostrar 'tooltip'
  showTooltip() {
    if (this.props.defaultVisible === true) {
      this.setState({ visible: !this.state.visible })
    }
  }

  render() {
    const { defaultVisible } = this.props
    const show = isTrue(defaultVisible) ? this.state.visible : undefined

    return (
      <Fragment>
        <Tooltip visible={show} title={this.props.title} placement={this.state.placement} defaultVisible={this.props.defaultVisible}>
          <FontAwesomeIcon className="help pointer" icon="question-circle" size={this.props.size} onClick={this.showTooltip} style={this.props.style} />
        </Tooltip>
      </Fragment>
    )
  }
}
