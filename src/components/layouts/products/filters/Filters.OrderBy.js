// React
import { Component } from 'react'

// Components
import { Help } from '@common'
import { connect } from 'react-redux'

// Librarys
import { Radio } from 'antd'

// Actions
import getFiltersActions from '@redux/actions/filters'

// Utils
import { createState, createDispatch } from '@utils/Helper'

class OrderBy extends Component {
  static defaultProps = {
    data: [],
  }

  shouldComponentUpdate(_, nextState) {
    return false
  }

  render() {
    const { data, company, dispatch } = this.props

    return (
      <div id="order-by" className="position-relative">
        {/* Icono de ayuda */}
        <Help title="Selecciona una opción para filtrar los productos dependiendo del valor establecido." />

        {/* Título */}
        <h3 className="title">Ordenar por:</h3>

        {/* Opciones para ordenar */}
        <div className="options mx-auto text-center">
          <Options data={data} defaultValue={this.props[company].sortKey} sortProductsBy={dispatch[company].sortProductsBy} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ manageFilters }) {
  return createState({
    objects: [
      { name: 'seytu', value: manageFilters.seytu },
      { name: 'omnilife', value: manageFilters.omnilife },
    ],
    state: (obj) => ({
      sortKey: obj.sortKey,
    }),
  })
}

// Obtener función que ordena los productos
function mapDispatchToProps(dispatch) {
  const actions = getFiltersActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        sortProductsBy: actions[obj].sortProductsBy,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy)

// <------------------------ Extra Components ------------------------>
export class Options extends Component {
  static defaultProps = {
    data: [],
    optionStyle: {
      margin: 3,
    },
  }

  constructor(props) {
    super(props)
    this.onChangeOption = this.onChangeOption.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Cuando se cambia una opción por otra
  onChangeOption(option) {
    this.props.sortProductsBy(option.target.value)
  }

  // Renderizar opciones de orden
  renderOptions() {
    return this.props.data.map((option) => (
      <Radio.Button key={option.id} style={this.props.optionStyle} value={option.value}>
        {option.name}
      </Radio.Button>
    ))
  }

  render() {
    const options = this.renderOptions()

    return (
      <Radio.Group size="large" onChange={this.onChangeOption} defaultValue={this.props.defaultValue}>
        {options}
      </Radio.Group>
    )
  }
}
