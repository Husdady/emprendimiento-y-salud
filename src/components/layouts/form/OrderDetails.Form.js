// React
import { Component, Fragment } from 'react'

// Components
import { Button, Form, renderError } from '@common'
import { Stock } from '@root/src/components/layouts/products/filters/Filters.ByStock'

// Librarys
import { connect } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import { Input, Divider, message } from 'antd'

// Actions
import getProductsActions from '@redux/actions/products'

// Reducers
import { getClientState } from '@redux/reducers/client'

// Utils
import { truncate, createDispatch } from '@utils/Helper'

class OrderDetailsForm extends Component {
  static defaultProps = {
    showCancelButton: false,
  }

  constructor(props) {
    super(props)
    this.onActionButton = this.onActionButton.bind(this)
    this.renderActionButton = this.renderActionButton.bind(this)

    this.mq = window.innerWidth <= 600
    this.limitTotalCharactersOfProductName = this.mq ? 200 : 12
    this.isSeytuCompany = this.props.extraData.company === 'seytu'

    this.button = {
      textColor: this.isSeytuCompany ? '#ffffff' : 'var(--bg-yellow)',
      backgroundColor: this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)',
    }

    this.initialValues = {
      optionalMessage: '',
      nameOfTheIndividual: this.props.client.name || '',
      whatsappOfTheIndividual: this.props.client.phone || '',
      totalUnits: 1,
    }

    this.validationSchema = {
      nameOfTheIndividual: {
        required: 'Por favor ingresa tu nombre completo',
        min: {
          limit: 2,
          message: 'Tu nombre es muy corto',
        },
        max: {
          limit: 32,
          message: 'Tu nombre es muy largo',
        },
      },
      whatsappOfTheIndividual: {
        required: 'Por favor ingresa tu número de Whatsapp',
      },
      optionalMessage: {
        required: false,
        min: {
          limit: 50,
          message: 'El mensaje es muy corto',
        },
        max: {
          limit: 150,
          message: 'El mensaje es muy largo',
        },
      },
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.extraData.product._id !== nextProps.extraData.product._id
  }

  // Evento 'click' en el botón de acción
  onActionButton({ values, setErrors, resetForm, extraData }) {
    if (values.totalUnits === 0) {
      return setErrors({
        totalUnits: 'No se puede realizar un pedido con 0 unidades de un producto',
      })
    }

    const { dispatch } = this.props
    const { status, company, hideModal } = this.props.extraData

    const order = {
      ...values,
      _id: this.props.extraData._id,
      product: this.props.extraData.product,
    }

    // Asignar datos extras
    Object.assign(extraData, {
      resetForm: resetForm,
      hideModal: hideModal,
    })

    const orderType = {
      // Pedido en espera
      waiting: () => dispatch[company].cancelOrder(order, extraData),

      // Pedido cancelado
      cancelled: () => dispatch[company].deleteOrder(order, extraData),

      // Pedido completado
      completed: () => dispatch[company].confirmOrder(order, extraData),
    }

    // Obtener la acción que se debe ejecutar
    const action = orderType[status]

    if (!action) {
      return dispatch[company].createOrder(order, extraData)
    }

    // Ejecutar acción
    action()
  }

  // Renderizar botón de acción
  renderActionButton(handleSubmit) {
    const { status } = this.props.extraData
    const button = {
      onDoubleClick: handleSubmit,
      onClick: () => message.info('Por favor, haz doble click en el botón'),
    }

    const orderType = {
      // Pedido en espera
      waiting: function () {
        Object.assign(button, {
          icon: 'ban',
          title: 'Cancelar pedido',
          textColor: '#ffffff',
          backgroundColor: 'var(--bg-darkyellow)',
        })
      },

      // Pedido cancelado
      cancelled: function () {
        Object.assign(button, {
          icon: 'trash-alt',
          title: 'Eliminar pedido',
          textColor: '#ffffff',
          backgroundColor: 'var(--bg-red)',
        })
      },

      // Pedido completado
      completed: function () {
        Object.assign(button, {
          icon: 'check-circle',
          title: 'Confirmar pedido',
          textColor: '#ffffff',
          backgroundColor: 'var(--bg-green)',
        })
      },
    }

    // Obtener la acción que se debe ejecutar
    const action = orderType[status]

    // Si no existe la acción en el objeto 'orderType'
    if (!action) {
      Object.assign(button, {
        icon: 'shopping-cart',
        title: 'Realizar pedido',
        textColor: this.button.textColor,
        backgroundColor: this.button.backgroundColor,
      })
    } else {
      // Si existe la acción, ejecutarla
      action()
    }

    return (
      <Button
        icon={button.icon}
        title={button.title}
        className="scale-button w-100 rounded-1 py-2"
        onClick={button.onClick}
        onDoubleClick={button.onDoubleClick}
        textColor={button.textColor}
        backgroundColor={button.backgroundColor}
        loading={{
          style: { color: button.textColor },
        }}
      />
    )
  }

  render() {
    const { status, product } = this.props.extraData
    const { name, stock, price, defaultImage } = product

    return (
      <Form onSubmit={this.onActionButton} initialValues={this.initialValues} validationSchema={this.validationSchema} needRenderAgain={this.props.extraData.product._id}>
        {({ values, setFieldValue, errors, handleSubmit }) => (
          <Fragment>
            <div className="flex jc-between pb-4">
              {/* Imagen del producto */}
              <ProductImage name={name} defaultImage={defaultImage} />

              {/* Información del pedido */}
              <section className="information">
                {/* Nombre del producto */}
                <Title value={truncate(name, this.limitTotalCharactersOfProductName)}>Nombre del producto:</Title>

                <Divider className="my-1" />

                {/* Precio del producto */}
                <Title value={'S/. ' + price}>Precio del producto:</Title>

                <Divider className="my-1" />

                {/* Stock del producto */}
                <Title value={stock}>Total de unidades del producto:</Title>

                <Divider className="my-1" />

                {/* Nombre de la persona que va hacer el pedido */}
                <h4 className="title fw-bold">Nombre completo:</h4>
                <Input disabled={status} value={values.nameOfTheIndividual} placeholder="Ingresa tu nombre completo" onChange={(e) => setFieldValue('nameOfTheIndividual', e.target.value)} />

                {/* Error en campo 'nameOfTheIndividual' del formulario */}
                {renderError(errors.nameOfTheIndividual)}

                {/* Número de Whatsapp */}
                <h4 className="title mt-1 fw-bold">Whatsapp:</h4>
                <PhoneInput
                  country="pe"
                  disabled={status}
                  inputStyle={{ width: '100%' }}
                  value={values.whatsappOfTheIndividual}
                  placeholder="Ingresa tu número de Whatsapp"
                  onChange={(phone) => setFieldValue('whatsappOfTheIndividual', phone)}
                />

                {/* Error en campo 'whatsappOfTheIndividual' del formulario */}
                {renderError(errors.whatsappOfTheIndividual)}

                {/* Total de unidades */}
                <h4 className="title mt-1 fw-bold">Total de unidades:</h4>

                {/* Definir las unidades del producto del pedido */}
                <Stock
                  limit={stock}
                  defaultValue={values.totalUnits}
                  onIncrease={() => setFieldValue('totalUnits', values.totalUnits + 1)}
                  onDecrease={() => setFieldValue('totalUnits', values.totalUnits - 1)}
                />

                {/* Error en campo 'totalUnits' del formulario */}
                {renderError(errors.totalUnits)}

                {/* Mensaje opcional */}
                <h4 className="title mt-1 fw-bold">Mensaje:</h4>

                <Input.TextArea rows={4} disabled={status} value={values.optionalMessage} placeholder="Dejanos un mensaje *opcional" onChange={(e) => setFieldValue('optionalMessage', e.target.value)} />

                {/* Error en campo 'optionalMessage' del formulario */}
                {renderError(errors.optionalMessage)}

                <Divider className="mt-4 mb-2" />

                {/* Costo total del pedido */}
                <Cost price={price} totalUnits={values.totalUnits} />
              </section>
            </div>

            {/* Renderizar botón de acción */}
            {this.renderActionButton(handleSubmit)}
          </Fragment>
        )}
      </Form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const actions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        createOrder: actions[obj].createOrder,
        cancelOrder: actions[obj].cancelOrder,
        deleteOrder: actions[obj].deleteOrder,
        confirmOrder: actions[obj].confirmOrder,
      }),
    }),
  }
}

export default connect(getClientState, mapDispatchToProps)(OrderDetailsForm)

// <------------------------ Extra Components ------------------------>
export class Title extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  render() {
    return (
      <div className="d-flex align-items-center">
        <h4 className="title mb-0 me-2 fw-bold">{this.props.children}</h4>
        <span className="value">{this.props.value}</span>
      </div>
    )
  }
}

export class ProductImage extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { name, defaultImage } = this.props

    return (
      <figure>
        <img title={name} src={defaultImage?.url} width={defaultImage?.width} height={defaultImage?.height} alt={defaultImage?.alt} />
      </figure>
    )
  }
}

export class Cost extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { price, totalUnits } = this.props

    return <h4 className="title mb-0 mt-3 text-right">Costo total: S/. {(price * totalUnits).toFixed(2)}</h4>
  }
}
