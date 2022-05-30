// React
import { Component } from 'react'

// Components
import { Button } from '@common'

// Librarys
import { connect } from 'react-redux'

// Actions
import getFiltersActions from '@redux/actions/filters'

// Reducers
import { getFiltersState } from '@redux/reducers/filters'

// Utils
import { createState, createDispatch } from '@utils/Helper'

class Seeker extends Component {
  constructor(props) {
    super(props)
    this.company = this.props.company
    this.search = this.search.bind(this)
    this.setValue = this.setValue.bind(this)
    this.onPressEnter = this.onPressEnter.bind(this)

    this.state = {
      value: this.props[this.company].searchValue,
    }
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.value !== nextState.value
  }

  // Setear valor de búsqueda
  setValue(e) {
    this.setState({ value: e.target.value })
  }

  // Si se presiona la tecla 'Enter'
  onPressEnter(e) {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  // Buscar por valor de búsqueda
  search() {
    const { company, dispatch } = this.props
    dispatch[company].searchProducts(this.state.value)
  }

  render() {
    return (
      <div id="search" className="position-relative overflow-hidden rounded-2">
        <input type="text" maxLength={36} value={this.state.value} onChange={this.setValue} onKeyDown={this.onPressEnter} placeholder="Buscar producto..." className="search-entry border-none" />

        {/* Icono de búsqueda */}
        <Button icon="search" className="search-button position-absolute" onClick={this.search} />
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
      searchValue: obj.searchValue,
    }),
  })
}

function mapDispatchToProps(dispatch) {
  const actions = getFiltersActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        searchProducts: actions[obj].searchProducts,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seeker)
