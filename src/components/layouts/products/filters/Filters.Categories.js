// React
import { Component, Fragment, createRef } from 'react'

// Components
import { Button, Checkbox, CheckboxGroup } from '@common'

// Librarys
import { connect } from 'react-redux'

// Actions
import getFiltersActions from '@redux/actions/filters'
import getProductsActions from '@redux/actions/products'

// Utils
import { isArray, isEmptyArray } from '@utils/Validations'
import { createState, createDispatch } from '@utils/Helper'

class Categories extends Component {
  constructor(props) {
    super(props)
    this.refCheckboxGroup = createRef()
    this.onMount = this.onMount.bind(this)
    this.filterByCategory = this.filterByCategory.bind(this)
    this.renderCategory = this.renderCategory.bind(this)
    this.renderCategories = this.renderCategories.bind(this)

    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeColor = this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)'
    this.textButtonColor = this.isSeytuCompany ? 'var(--bg-white)' : 'var(--bg-yellow)'
    this.textColor = {
      color: this.activeColor,
    }
  }

  shouldComponentUpdate(nextProps) {
    const { company } = this.props
    return this.props[company].loadingCategories !== nextProps[company].loadingCategories
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const { company, dispatch } = this.props
    dispatch[company].getCategories()
  }

  // Buscar productos por categoría
  filterByCategory({ showLoading, hideLoading }) {
    const activeCategories = []
    const { company, dispatch } = this.props

    // Obtener categorías actuales
    const { categories } = this.props[company]

    // Obtiene el estado actual de las categorías, comprobando cuáles han sido marcadas y cuáles no lo están
    const categoriesStatus = this.refCheckboxGroup.current.state

    // Obtener nombre de cada Catgoría
    const keys = Object.keys(categoriesStatus)

    if (!isArray(categories)) return

    for (const key of keys) {
      // Comprobar una categoría está marcada
      const isCheckedCategory = categoriesStatus[key]

      // Si la key es igual a "all" o si está una categoría activada
      if (key === 'all' || !isCheckedCategory) continue

      const matchCategory = categories.find((category) => category.key === key)
      activeCategories.push(matchCategory._id)
    }

    // Comprobar si todas las categorías están marcadas
    const allCategoriesAreChecked = activeCategories.length === categories.length

    // Comprobar si se están enviando correctamente las categorías
    const validCategories = !allCategoriesAreChecked || isEmptyArray(activeCategories)

    // Convertir a string las categoríaas
    const stringifyCategories = JSON.stringify(activeCategories)

    dispatch[company].searchProductsByCategories({
      showLoading: showLoading,
      hideLoading: hideLoading,
      activeCategories: validCategories ? stringifyCategories : null,
    })
  }

  // Renderizar categoría
  renderCategory(category, extraData) {
    return <Category id={category._id} key={category._id} name={category.name} checked={extraData.status} onChecked={extraData.onChecked} company={this.props.company} />
  }

  // Renderizar categorías
  renderCategories({ data, state, onChecked, onCheckedAll }) {
    const { company, dispatch } = this.props

    return (
      <Fragment>
        {/* Categoría 'Todos' */}
        <Category
          company={company}
          checked={state.all}
          name="Todas las categorías"
          onChecked={function () {
            {
              /* Marcar/desmarcar todas las casillas de verificación */
            }
            onCheckedAll()

            {
              /* Si la casilla 'Todas las categorías' está desmarcada, eliminar todas las categoría de los filtros */
            }
            if (state.all) {
              return dispatch[company].setCategoriesFilters([])
            }
          }}
        />

        {/* Categorías */}
        {data.map((category) =>
          this.renderCategory(category, {
            status: state[category.key],
            onChecked: function () {
              {
                /* Marcar/desmarcar casilla de verificación */
              }
              onChecked(category.key)

              {
                /* Si la casilla está desmarcada, eliminar categoría de filtros */
              }
              if (state[category.key]) {
                return dispatch[company].deleteCategoryId(category._id)
              }

              {
                /* Agregar categoría a filtros */
              }
              return dispatch[company].addCategoryId(category._id)
            },
          }),
        )}
      </Fragment>
    )
  }

  render() {
    const { company } = this.props
    const buttonDisabled = this.props[company].loadingCategories

    return (
      <div id="categories-container">
        {/* Título */}
        <h2 className="title mb-0" style={this.textColor}>
          Categorías:
        </h2>

        {/* Mensaje */}
        <p className="text">Selecciona entre las distintas categorías de los productos:</p>

        {/* Categorías del producto */}
        <ul className="categories">
          <CheckboxGroup
            ref={this.refCheckboxGroup}
            renderItems={this.renderCategories}
            items={this.props[company]?.categories}
            totalItems={this.props[company].totalCategories}
            loadingItems={this.props[company].loadingCategories}
          />
        </ul>

        {/* Botón buscar productos por categoría*/}
        <Button
          icon="search"
          title="Buscar por categorías"
          className="search-by-category w-100 rounded-pill"
          onClick={this.filterByCategory}
          textColor={this.textButtonColor}
          backgroundColor={this.activeColor}
          attributes={{ disabled: buttonDisabled }}
          loading={{
            style: { color: this.textButtonColor, fontSize: '1.85em' },
          }}
        />
      </div>
    )
  }
}

function mapStateToProps({ manageProducts }) {
  return createState({
    objects: [
      { name: 'seytu', value: manageProducts.seytu },
      { name: 'omnilife', value: manageProducts.omnilife },
    ],
    state: (obj) => ({
      categories: obj.categories,
      totalCategories: obj.totalCategories,
      loadingCategories: obj.loadingCategories,
    }),
  })
}

function mapDispatchToProps(dispatch) {
  const filtersActions = getFiltersActions(dispatch)
  const productsActions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        getCategories: productsActions[obj].getCategories,
        searchProductsByCategories: filtersActions[obj].searchProductsByCategories,
        addCategoryId: filtersActions[obj].addCategoryId,
        deleteCategoryId: filtersActions[obj].deleteCategoryId,
        setCategoriesFilters: filtersActions[obj].setCategoriesFilters,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

// <------------------------ Extra Components ------------------------>
export class Category extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checed
  }

  render() {
    return (
      <li className="category d-block w-100">
        <Checkbox title={this.props.name} checked={this.props.checked} onCheck={this.props.onChecked} className="align-items-center ms-2" />
      </li>
    )
  }
}
