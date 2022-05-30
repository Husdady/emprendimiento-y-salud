// React
import { Component, Fragment } from 'react'

// Components
import { Help, Checkbox, CheckboxGroup } from '@common'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.renderSetting = this.renderSetting.bind(this)
    this.renderSettings = this.renderSettings.bind(this)
    this.renderHelpTitle = this.renderHelpTitle.bind(this)

    this.settingsOptions = [
      {
        key: 'apply-filters-in-search',
        title: 'Aplicar filtros en el buscador',
        description: 'Se toman en cuenta los filtros en el buscador.',
        className: 'apply-filters-in-search',
        status: this.props.extraData.applyFiltersInSearch,
      },
      {
        key: 'apply-filters-in-categories',
        title: 'Aplicar filtros en las categorías',
        description: 'Se toman en cuenta los filtros en las categorías.',
        className: 'apply-filters-in-categories',
        status: this.props.extraData.applyFiltersInCategories,
      },
      {
        key: 'apply-filters-in-sort-by',
        title: 'Aplicar filtros en el orden',
        description: 'Se toman en cuenta los filtros en ordenar los productos.',
        className: 'apply-filters-in-sort-by',
        status: this.props.extraData.applyFiltersInSortBy,
      },
    ]
  }

  // Renderizar titulo de ícono de ayuda
  renderHelpTitle() {
    return (
      <Fragment>
        {this.settingsOptions.map((setting, i, totalOptions) => (
          <Fragment key={setting.key}>
            {/* Título */}
            <b>{setting.title}:</b>

            {/* Descripción */}
            <span>&nbsp;{setting.description}</span>

            {/* Saltos de línea */}
            {i !== totalOptions.length - 1 && (
              <Fragment>
                <br />
                <br />
              </Fragment>
            )}
          </Fragment>
        ))}
      </Fragment>
    )
  }

  // Renderizar opción de configuración
  renderSetting(setting, extraData) {
    return <Checkbox key={setting.key} title={setting.title} className={setting.className} checked={extraData.status} onCheck={extraData.onCheck} />
  }

  // Renderizar opciones de configuración
  renderSettings({ data, state, onChecked, onCheckedAll }) {
    return (
      <Fragment>
        {/* Categoría 'Todos' */}
        <Checkbox
          title="Aplicar filtros en todos"
          checked={state.all}
          onCheck={() => {
            // Marcar/desmarcar todos los checkboxes
            const newState = onCheckedAll()

            // Aplicar todos filtros
            this.props.extraData.applyAllFilters(newState)
          }}
        />

        {/* Opciones de configuración */}
        {data.map((setting) => {
          return this.renderSetting(setting, {
            status: state[setting.key],
            onCheck: () => {
              // Marcar/desmarcar checkbox
              onChecked(setting.key)

              const regex = /-([a-z])/g
              const callback = (str) => str[1].toUpperCase()

              const key = setting.key.replace(regex, callback)

              // Aplicar filtro
              this.props.extraData.applyFilter(key)
            },
          })
        })}
      </Fragment>
    )
  }

  render() {
    return (
      <div id="settings" className="position-relative">
        {/* Ícono de ayuda */}
        <Help title={this.renderHelpTitle()} />

        {/* Subtítulo */}
        <h3 className="subtitle">Configuración:</h3>

        {/* Casillas de verificación */}
        <CheckboxGroup items={this.settingsOptions} renderItems={this.renderSettings} />
      </div>
    )
  }
}
