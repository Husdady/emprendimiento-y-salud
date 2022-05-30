// React
import { Component } from 'react'

// Components
import { Help } from '@common'
import OrderDetailsForm from '@layouts/form/OrderDetails.Form.js'

// Librarys
import { Modal } from 'antd'

export default class OrderDetails extends Component {
  static defaultProps = {
    showCancelButton: false,
    attributes: {
      footer: null,
    },
  }

  constructor(props) {
    super(props)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)

    this.state = {
      isModalVisible: false,
      extraData: {},
    }

    this.extraData = {
      company: this.props.company,
      product: this.props.product,
      hideModal: this.hide.bind(this),
    }
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.extraData !== nextState.extraData || this.state.isModalVisible !== nextState.isModalVisible
  }

  // Mostrar modal
  show(extraData) {
    const existExtraData = !extraData ? {} : extraData

    const newState = {
      isModalVisible: true,
      extraData: existExtraData,
    }

    this.setState(newState)
  }

  // Ocultar modal
  hide() {
    this.setState({ isModalVisible: false })
  }

  // Renderizar título
  renderTitle() {
    return (
      <div className="d-flex align-items-center">
        <Help
          style={{ marginRight: 7 }}
          tooltipSettings={{
            placement: 'bottom',
          }}
          title="Por favor, lee esto antes de realizar un pedido de un producto, emprendimientoysalud.com no te pedirá una tarjeta de crédito para que pages directamente, al realizar un pedido, solamente se te pedirá tu nombre y número de Whatsapp. A continuación recibirás un mensaje por Whatsapp de nuestra distribuidora independiente Yessica Milagros, podrás charlar con nuestra socia para la finalizar el proceso de la compra del producto y tener asesoramiento gratuito."
        />
        <span>Detalles del pedido</span>
      </div>
    )
  }

  render() {
    const modalTitle = this.renderTitle()

    return (
      <Modal
        centered
        title={modalTitle}
        onCancel={this.hide}
        className="order-details"
        company={this.props.company}
        visible={this.state.isModalVisible}
        {...this.state.extraData}
        {...this.props.attributes}
      >
        <OrderDetailsForm
          showCancelButton={this.props.showCancelButton}
          extraData={{
            company: this.props.company,
            _id: this.state.extraData._id,
            status: this.state.extraData.status,
            product: this.state.extraData.product || this.props.product,
            hideModal: this.hide,
          }}
        />
      </Modal>
    )
  }
}
