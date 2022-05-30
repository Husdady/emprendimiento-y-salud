// React
import { Component, Fragment } from 'react'

// Librarys
import { Modal } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class TestimonyModal extends Component {
  static defaultProps = {
    attributes: {
      footer: null,
    },
  }

  constructor(props) {
    super(props)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.mq = process.browser.innerWidth <= 600

    this.state = {
      extraData: {},
      isModalVisible: false,
    }

    this.maskStyle = {
      zIndex: 9999999999999,
      backgroundColor: 'rgba(0, 0, 0, .9)',
    }
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.extraData !== nextState.extraData || this.state.isModalVisible !== nextState.isModalVisible
  }

  // Mostrar modal
  show(extraData) {
    const existExtraData = !extraData ? {} : extraData

    this.setState({
      isModalVisible: true,
      extraData: existExtraData,
    })
  }

  // Ocultar modal
  hide() {
    this.setState({ isModalVisible: false })
  }

  render() {
    const { author, testimony } = this.state.extraData

    return (
      <Modal closable={false} width={this.mq ? '100%' : '80%'} className="testimony-information" visible={this.state.isModalVisible} maskStyle={this.maskStyle} {...this.props.attributes}>
        <Fragment>
          <FontAwesomeIcon size="4x" icon="window-close" id="close-testimony" className="pointer" onClick={this.hide} color="var(--bg-violet)" />

          {/* Foto del autor del testimonio */}
          <figure className="avatar">
            <img loading="lazy" title={author?.name} src={author?.photo?.url} alt={author?.short_name} width={author?.photo?.width || '239'} height={author?.photo?.height || '239'} />
          </figure>

          {/* Edad y Localización del autor */}
          <span className="subtitle">
            {author?.age} años - {author?.country}
          </span>

          {/* Nombre del autor */}
          <h3 className="title">- {author?.name} -</h3>

          {/* Comilla izquierda */}
          <span className="quote-left">
            <FontAwesomeIcon size="3x" icon="quote-left" color="var(--bg-violet)" />
          </span>

          {/* Testimonio del autor */}
          <p className="autor-testimony">{testimony}</p>

          {/* Comilla derecha */}
          <span className="quote-right">
            <FontAwesomeIcon size="3x" icon="quote-right" color="var(--bg-violet)" />
          </span>
        </Fragment>
      </Modal>
    )
  }
}
