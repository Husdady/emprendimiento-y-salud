// React
import { Component, Fragment } from 'react'

// Components
import { Divider } from '@common'
import Container from '@root/src/components/layouts/common/Container'
import FiltersForm from '@root/src/components/layouts/form/Filters.Form'
import TabContainer from '@root/src/components/layouts/products/tabs/Tab.Container'
import Categories from '@root/src/components/layouts/products/filters/Filters.Categories'
import Search from '@root/src/components/layouts/products/filters/Filters.Search'
import OrderBy from '@root/src/components/layouts/products/filters/Filters.OrderBy'

// Headers
import { OmnilifeProductsHeader } from '@headers'

// Reducers
import { config } from '@redux/actions/filters'

// Utils
import { getSortOptions } from '@utils/Options'
import { scrollToSection } from '@utils/Helper'

const options = getSortOptions(config.omnilife.products.types)

export default class OmnilifeProducts extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    scrollToSection({
      delay: 1000,
      shortcut: 'shortcut-vy76w',
    })
  }

  render() {
    return (
      <Fragment>
        {/* Head */}
        <OmnilifeProductsHeader />

        <Container>
          <section id="products-container" className="shortcut-vy76w" company="omnilife">
            <div className="wrapper mx-auto rounded-2">
              {/* Filtros */}
              <div className="filters flex jc-between">
                {/* Categorías */}
                <Categories company="omnilife" />

                {/* Filtros extras */}
                <div className="more-filters">
                  {/* Buscador */}
                  <Search company="omnilife" />

                  <Divider />

                  {/* Ordenar por ... */}
                  <OrderBy company="omnilife" data={options} />

                  <Divider />

                  {/* Formulario de 'Más filtros' */}
                  <FiltersForm company="omnilife" />
                </div>
              </div>

              {/* Tabs que muestran todos los productos, productos favoritos y pedidos que ha realizado un cliente */}
              <TabContainer company="omnilife" />
            </div>
          </section>
        </Container>
      </Fragment>
    )
  }
}
