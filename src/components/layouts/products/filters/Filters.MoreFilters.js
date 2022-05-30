// React
import { Component } from 'react'

// Components
import { Button } from '@common'
import ByPrice from './Filters.ByPrice'
import ByStock from './Filters.ByStock'
import ByDate from './Filters.ByDate'
import Settings from './Filters.Settings'

// Librarys
import { message } from 'antd'
import { connect } from 'react-redux'

// Actions
import getFiltersActions from '@redux/actions/filters'

// Utils
import { createDispatch } from '@utils/Helper'

class MoreFilters extends Component {
  constructor(props) {
    super(props)
    this.buttons = [
      {
        id: 'o12na920',
        title: 'Guardar filtros',
        icon: { size: 'lg', name: 'save' },
        backgroundColor: 'var(--bg-orange)',
        onClick: this.saveFilters.bind(this),
        className: 'save-filters me-2 fw-bold rounded-1',
      },
      {
        id: 'ap1o2u9j',
        title: 'Aplicar filtros',
        icon: 'check',
        backgroundColor: '#134e6f',
        textColor: 'var(--bg-white)',
        className: 'apply-filters rounded-1',
        loading: {
          containerStyle: { width: 105 },
          style: { fontSize: '1rem', color: 'var(--bg-white)' },
        },
      },
    ]
  }

  shouldComponentUpdate(nextProps) {
    const { values } = this.props.formData
    const nextPropsValues = nextProps.formData.values

    return (
      values.stock !== nextPropsValues.stock ||
      values.date !== nextPropsValues.date ||
      values.maxPrice !== nextPropsValues.maxPrice ||
      values.minPrice !== nextPropsValues.minPrice ||
      values.applyFiltersInSearch !== nextPropsValues.applyFiltersInSearch ||
      values.applyFiltersInCategories !== nextPropsValues.applyFiltersInCategories ||
      values.applyFiltersInSortBy !== nextPropsValues.applyFiltersInSortBy
    )
  }

  // Setear precio máximo
  setMaxPrice({ value, extraData }) {
    if (value < 0 || value > 9999) return

    extraData.setFieldValue('maxPrice', value)
  }

  // Setear precio mínimo
  setMinPrice({ value, extraData }) {
    if (value < 0 || value > 9999) return

    extraData.setFieldValue('minPrice', value)
  }

  // Guardar filtros en localstorage
  saveFilters = () => {
    const { dispatch, company, formData } = this.props

    dispatch[company].saveExtraFilters(formData.values)

    return message.success('Se han guardado los filtros', 4)
  }

  // Renderizar botones
  renderButtons({ handleSubmit }) {
    return (
      <div className="wrap-buttons text-right">
        {this.buttons.map((button) => (
          <Button key={button.id} onClick={handleSubmit} attributes={{ disabled: !this.props.formData.formHasBeenEdited }} {...button} />
        ))}
      </div>
    )
  }

  render() {
    const { values, setFieldValue, setMultipleFields } = this.props.formData

    return (
      <div className="wrap">
        {/* Botones */}
        {this.renderButtons(this.props.formData)}

        {/* Filtros */}
        <div className="wrap-filters d-grid align-items-center">
          {/* Filtrar por precio mayor y menor */}
          <ByPrice
            maxPrice={values.maxPrice}
            minPrice={values.minPrice}
            onChangeMaxPrice={(e) => {
              this.setMaxPrice({ value: e.target.value, extraData: this.props.formData })
            }}
            onChangeMinPrice={(e) => {
              this.setMinPrice({ value: e.target.value, extraData: this.props.formData })
            }}
          />

          <div className="wrap-inner">
            {/* Filtrar por stock */}
            <ByStock limit={100} defaultValue={values.stock} onIncrease={() => setFieldValue('stock', values.stock + 1)} onDecrease={() => setFieldValue('stock', values.stock - 1)} />

            {/* Filtrar por fecha */}
            <ByDate defaultValue={values.date} onUpdateDate={(date) => setFieldValue('date', date)} />
          </div>

          {/* Configuracion de filtros */}
          <Settings
            extraData={{
              applyFiltersInSearch: values.applyFiltersInSearch,
              applyFiltersInCategories: values.applyFiltersInCategories,
              applyFiltersInSortBy: values.applyFiltersInSortBy,
              applyFilter: (key) => setFieldValue(key, !values[key]),
              applyAllFilters: function (state) {
                return setMultipleFields({
                  applyFiltersInSearch: state['apply-filters-in-search'],
                  applyFiltersInCategories: state['apply-filters-in-categories'],
                  applyFiltersInSortBy: state['apply-filters-in-sort-by'],
                })
              },
            }}
          />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const actions = getFiltersActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        saveExtraFilters: actions[obj].saveExtraFilters,
      }),
    }),
  }
}

export default connect(null, mapDispatchToProps)(MoreFilters)
