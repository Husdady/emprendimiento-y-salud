// React
import { Component, Fragment, createRef } from 'react'

// Components
import Container from '@root/src/components/layouts/common/Container'
import Scroller from '@root/src/components/layouts/common/Scroller'
import Testimonials from '@root/src/components/layouts/home/Home.Testimonials'

// Headers
import { TestimonialsHeader } from '@headers'

// API
import { getMoreTestimonials, getPaginatedTestimonials } from '@api/testimonials'

// Utils
import { scrollToSection } from '@utils/Helper'

export default class OmnilifeTestimonials extends Component {
  isMounted = false

  constructor(props) {
    super(props)
    this.limit = 6
    this.refTestimonials = createRef()
    this.onLoadMore = this.onLoadMore.bind(this)
    this.setTestimonials = this.setTestimonials.bind(this)
    this.addTestimonials = this.addTestimonials.bind(this)

    this.loadMoreButton = {
      textColor: 'var(--bg-violet)',
      title: 'Cargar más testimonios',
      style: {
        marginTop: '-40px',
        marginBottom: 30,
      },
    }
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.isMounted = true

    if (this.isMounted) {
      this.onMount()
    }
  }

  componentWillUnmount() {
    this.isMounted = false
  }

  onMount = () => {
    scrollToSection({
      duration: 1000,
      shortcut: 'shortcut-a19mz',
    })

    // Obtener testimonios paginados
    getPaginatedTestimonials({
      limit: this.limit,
      setTestimonials: this.setTestimonials,
    })
  }

  // Setear testimonios iniciales
  setTestimonials(testimonials) {
    if (!this.refTestimonials.current) return

    // Setear testimonios
    this.refTestimonials.current?.setTestimonials(testimonials)
  }

  // Añadir más testimonios a los actuales
  addTestimonials(newTestimonials) {
    if (!this.refTestimonials.current) return

    // Testimonios actuales
    const { testimonials } = this.refTestimonials.current.state

    // Setear testimonios
    this.refTestimonials.current?.setTestimonials([...testimonials, ...newTestimonials])
  }

  // Evento 'click' en botón para cargar más testimonios
  onLoadMore(extraData) {
    getMoreTestimonials({
      ...extraData,
      addTestimonials: this.addTestimonials,
    })
  }

  render() {
    return (
      <Fragment>
        {/* Head */}
        <TestimonialsHeader />

        <Container>
          <Scroller limit={this.limit} className="shortcut-a19mz" onLoadMore={this.onLoadMore} loadMoreButton={this.loadMoreButton}>
            <Testimonials ref={this.refTestimonials} pagination="active" />
          </Scroller>
        </Container>
      </Fragment>
    )
  }
}
