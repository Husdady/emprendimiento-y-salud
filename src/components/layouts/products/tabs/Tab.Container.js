// React
import { Component, Fragment } from 'react'

// Components
import Loading from '@layouts/loaders/Loading.Preload'

// Librarys
import { Tabs } from 'antd'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Actions
import getProductsActions from '@redux/actions/products'

// Utils
import { createState, createDispatch } from '@utils/Helper'

const loading = () => <Loading />

// Tabs
const Products = dynamic(() => import('./Tab.Products'), { loading })
const MyFavoriteProducts = dynamic(() => import('./Tab.MyFavoriteProducts'), { loading })

const { TabPane } = Tabs

class TabContainer extends Component {
  constructor(props) {
    super(props)
    this.tabsPlane = [
      {
        id: 'tab-o12j9a',
        name: <Title icon="box">Todos los productos</Title>,
        component: <Products company={this.props.company} />,
      },
      {
        id: 'tab-dfj418',
        name: <Title icon="star">Mis productos favoritos</Title>,
        component: <MyFavoriteProducts company={this.props.company} />,
      }
    ]
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar pestañas de navegación
  renderTabs = () => {
    return this.tabsPlane.map((tab) => (
      <TabPane key={tab.id} tab={tab.name}>
        {tab.component}
      </TabPane>
    ))
  }

  render() {
    const { company, dispatch } = this.props
    const { activeTab } = this.props[company]

    return (
      <Tabs type="card" animated={false} className="tab-container" defaultActiveKey={activeTab} onChange={(key) => dispatch[company].changeActiveTab(key)}>
        {this.renderTabs()}
      </Tabs>
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
      activeTab: obj.activeTab,
    }),
  })
}

function mapDispatchToProps(dispatch) {
  const actions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        changeActiveTab: actions[obj].changeActiveTab,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)

// <------------------------ Extra Components ------------------------>
export class Title extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Fragment>
        {/* Ícono */}
        <FontAwesomeIcon icon={this.props.icon} className="me-2" />

        {/* Título */}
        <span>{this.props.children}</span>
      </Fragment>
    )
  }
}
