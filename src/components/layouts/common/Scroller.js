// React
import { Component } from 'react'

// Librarys
import AOS from 'aos'
import InfiniteScroll from 'react-infinite-scroll-component'

// Components
import { Button } from '@common'

export default class Scroller extends Component {
  static defaultProps = {
    limit: 10,
    loadMoreButton: {},
    onMount: function () {
      return null
    },
    onLoadMore: function () {
      return null
    },
  }

  constructor(props) {
    super(props)
    this.onMount = this.onMount.bind(this)
    this.skipMore = this.skipMore.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.hideLoadMoreButton = this.hideLoadMoreButton.bind(this)
    this.renderLoadMoreButton = this.renderLoadMoreButton.bind(this)

    this.state = {
      hasMore: true,
      skip: this.props.limit,
    }

    this.styles = {
      infiniteScroll: {
        overflow: 'hidden',
      },
      button: {
        width: '80%',
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: '1.25em',
        ...this.props.loadMoreButton.style,
      },
    }

    this.loading = {
      style: {
        fontSize: '2em',
        color: this.props.loadMoreButton.textColor,
      },
    }
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.skip
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    AOS.init({
      once: true,
    })
  }

  // Saltar elementos
  skipMore() {
    return this.setState({ skip: this.state.skip + this.props.limit })
  }

  // Ocultar botón que carga más items
  hideLoadMoreButton() {
    this.setState({ hasMore: false, showLoadMoreButton: false })
  }

  // Cargar más items
  loadMore({ showLoading, hideLoading }) {
    this.props.onLoadMore({
      skip: this.state.skip,
      skipMore: this.skipMore,
      limit: this.props.limit,
      showLoading: showLoading,
      hideLoading: hideLoading,
      hideLoadMoreButton: this.hideLoadMoreButton,
    })
  }

  renderLoadMoreButton() {
    if (!this.state.hasMore) return

    return (
      <Button
        {...this.props.loadMoreButton}
        icon="angle-double-down"
        backgroundColor="#e6e6e6"
        className="d-block fw-bold mx-auto"
        style={this.styles.button}
        onClick={this.loadMore}
        loading={this.loading}
        attributes={{
          'data-aos': 'fade-up',
          'data-aos-duration': 3000,
          'data-aos-delay': 300,
        }}
      />
    )
  }

  render() {
    return (
      <InfiniteScroll hasMore={this.state.hasMore} dataLength={this.state.skip} className={this.props.className} style={this.styles.infiniteScroll}>
        {this.props.children}

        {/* Botón 'cargar más elementos' */}
        {this.renderLoadMoreButton()}
      </InfiniteScroll>
    )
  }
}
