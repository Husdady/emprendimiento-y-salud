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
import { SeytuProductsHeader } from '@headers'

// Reducers
import { config } from '@redux/actions/filters'

// Utils
import { getSortOptions } from '@utils/Options'
import { scrollToSection } from '@utils/Helper'

const options = getSortOptions(config.seytu.products.types)

export default class SeytuProducts extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    scrollToSection({
      delay: 1000,
      shortcut: 'shortcut-13ms8k',
    })
  }

  render() {
    return (
      <Fragment>
        {/* Head */}
        <SeytuProductsHeader />

        <Container>
          <section id="products-container" className="shortcut-13ms8k" company="seytu">
            <div className="wrapper mx-auto rounded-2">
              {/* Filtros */}
              <div className="filters flex jc-between">
                {/* Categorías */}
                <Categories company="seytu" />

                {/* Más filtros */}
                <div className="more-filters">
                  {/* Buscador */}
                  <Search company="seytu" />

                  <Divider />

                  {/* Ordenar por ... */}
                  <OrderBy company="seytu" data={options} />

                  <Divider />

                  {/* Formulario de 'Más filtros' */}
                  <FiltersForm company="seytu" />
                </div>
              </div>

              {/* Tabs que muestran todos los productos, productos favoritos y pedidos que ha realizado un cliente */}
              <TabContainer company="seytu" />
            </div>
          </section>
        </Container>
      </Fragment>
    )
  }
}
