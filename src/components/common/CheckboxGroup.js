// React
import { Component } from 'react'

// Librarys
import { Empty, Skeleton } from 'antd'

// Utils
import { generateArray } from '@utils/Helper'
import { isTrue, isFalse, isArray, isEmptyArray, isEmptyObject } from '@utils/Validations'

export default class CheckboxGroup extends Component {
  static defaultProps = {
    items: [],
    totalItems: 0,
    defaultStatus: true,
    renderItems: function () {
      return null
    },
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.setDefaultState = this.setDefaultState.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.handleCheckedAll = this.handleCheckedAll.bind(this)
    this.renderCheckboxes = this.renderCheckboxes.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props.items !== nextProps.items || this.props.loadingItems !== nextProps.loadingItems
  }

  componentDidMount() {
    this.setDefaultState()
  }

  componentDidUpdate() {
    this.setDefaultState()
  }

  // Definir estado inicial de cada checkbox
  setDefaultState() {
    const { items } = this.props

    if (!isArray(items) || isEmptyArray(items) || !isEmptyObject(this.state)) return

    const state = {}

    for (let item of items) {
      if (isTrue(item.status) || isFalse(item.status)) {
        state[item.key] = item.status
        continue
      }

      state[item.key] = this.props.defaultStatus
    }

    state.all = false

    const keys = Object.keys(state)

    for (let key of keys) {
      if (isTrue(state[key])) {
        state.all = true
        break
      }
    }

    // Setear estado por defecto de checkboxes
    this.setState(state)
  }

  // Marcar / desmarcar un checkbox
  handleChecked(key) {
    const checkboxChanged = { [key]: !this.state[key] }

    // Obtener todos los checkboxes
    const checkboxes = { ...this.state, ...checkboxChanged }

    // Eliminar el checkbox 'all'
    delete checkboxes.all

    // Comprobar si todos los checkboxes están activos
    const allCheckboxesAreChecked = Object.values(checkboxes).some((status) => status)

    if (allCheckboxesAreChecked) {
      this.setState({ ...checkboxChanged, all: true })
    } else {
      this.setState({ ...checkboxChanged, all: false })
    }
  }

  // Marcar / desmarcar todos los checkboxes
  handleCheckedAll() {
    const checkboxes = {}

    const keys = Object.keys(this.state)

    for (let key of keys) {
      checkboxes[key] = !this.state.all
    }

    this.setState({ ...checkboxes, all: !this.state.all })

    return checkboxes
  }

  // Renderizar checkboxes
  renderCheckboxes() {
    // Comprobar si no existen 'items'
    const emptyItems = isEmptyArray(this.props.items)

    if (emptyItems) {
      return <Empty className="fw-bold pb-2" description="No hay nada para mostrar" />
    }

    // Comprobar si están cargando los 'items'
    if (this.props.loadingItems) {
      return generateArray(this.props.totalItems).map((_, i) => <Skeleton.Button key={i} active />)
    }

    const items = this.props.renderItems({
      state: this.state,
      data: this.props.items,
      onChecked: this.handleChecked,
      onCheckedAll: this.handleCheckedAll,
    })

    return items
  }

  render() {
    return this.renderCheckboxes()
  }
}
