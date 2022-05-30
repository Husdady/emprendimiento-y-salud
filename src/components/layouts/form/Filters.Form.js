// React
import { Component } from 'react'

// Components
import { Form } from '@common'
import MoreFilters from '@root/src/components/layouts/products/filters/Filters.MoreFilters'

// Librarys
import { connect } from 'react-redux'

// Actions
import getFiltersActions from '@redux/actions/filters'

// Utils
import { createState, createDispatch } from '@utils/Helper'

class FiltersForm extends Component {
  constructor(props) {
    super(props)
    this.company = this.props.company
    this.initialValues = {
      stock: this.props[this.company].stock,
      date: this.props[this.company].date,
      maxPrice: this.props[this.company].maxPrice,
      minPrice: this.props[this.company].minPrice,
      applyFiltersInSearch: this.props[this.company].applyFiltersInSearch,
      applyFiltersInCategories: this.props[this.company].applyFiltersInCategories,
      applyFiltersInSortBy: this.props[this.company].applyFiltersInSortBy,
    }
  }

  shouldComponentUpdate() {
    return false
  }

  // Aplicar filtros a productos
  onApplyFilters({ values, extraData }) {
    const { company, dispatch } = this.props

    dispatch[company].applyExtraFilters({
      values: values,
      showLoading: extraData.showLoading,
      hideLoading: extraData.hideLoading,
    })
  }

  render() {
    return (
      <Form initialValues={this.initialValues} onSubmit={this.onApplyFilters.bind(this)}>
        {(formData) => <MoreFilters formData={formData} company={this.props.company} />}
      </Form>
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
      stock: obj.stock,
      date: obj.date,
      maxPrice: obj.maxPrice,
      minPrice: obj.minPrice,
      applyFiltersInSearch: obj.applyFiltersInSearch,
      applyFiltersInCategories: obj.applyFiltersInCategories,
      applyFiltersInSortBy: obj.applyFiltersInSortBy,
    }),
  })
}

function mapDispatchToProps(dispatch) {
  const actions = getFiltersActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        applyExtraFilters: actions[obj].applyExtraFilters,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForm)
