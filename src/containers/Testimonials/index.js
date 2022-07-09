// React
import { Component, createRef } from 'react'

// Components
import { Empty } from '@common'
import Testimony from '@root/src/components/layouts/testimony/Testimony.Card'
import Modal from '@layouts/testimony/Testimony.Modal'

// API
import { getLastestTestimonials } from '@api/testimonials'

// Utils
import { isArray, isEmptyArray, isFunction } from '@utils/Validations'

const emptyTestimonialsImage = require('@assets/img/testimonials/empty-testimonials.webp').default.src

export default class Testimonials extends Component {
  constructor(props) {
    super(props)
    this.refModal = createRef()
    this.onMount = this.onMount.bind(this)
    this.setTestimonials = this.setTestimonials.bind(this)
    this.showTestimonyInformation = this.showTestimonyInformation.bind(this)
    this.renderTestimonials = this.renderTestimonials.bind(this)
    this.renderExtraContent = this.renderExtraContent.bind(this)

    this.state = {
      testimonials: [],
    }

    this.emptyTitleStyle = {
      width: '100%',
      fontSize: '1.65em',
      borderBottom: 'none',
    }
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.testimonials !== nextState.testimonials
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    // Si tiene activa la páginación
    if (this.props.pagination === 'active') {
      return null
    }

    // Obtener últimos testimonios
    getLastestTestimonials({
      limit: 6,
      setTestimonials: this.setTestimonials,
    })
  }

  // Setear testimonios
  setTestimonials(testimonials) {
    if (!isArray(testimonials)) return

    if (!isEmptyArray(testimonials)) {
      this.setState({ testimonials: testimonials })
    }
  }

  // Mostrar información del testimonio en modal
  showTestimonyInformation(testimony) {
    this.refModal.current?.show(testimony)
  }

  // Renderizar testimonios
  renderTestimonials() {
    const { testimonials } = this.state

    const emptyTestimonials = isEmptyArray(testimonials)

    // Comprobar si no hay testimonios para mostrar
    if (emptyTestimonials) {
      return <Empty width={835} height={541} image={emptyTestimonialsImage} titleStyle={this.emptyTitleStyle} title="No hay testimonios para mostrar..." />
    }

    return testimonials.map((testimony, i) => <Testimony key={testimony._id} position={i + 1} onReadMore={() => this.showTestimonyInformation(testimony)} {...testimony} />)
  }

  // Renderizar contenido extra
  renderExtraContent() {
    const isShowExtraContent = isEmptyArray(this.state.testimonials) || !isFunction(this.props.renderExtraContent)

    if (isShowExtraContent) return

    return this.props.renderExtraContent({
      testimonials: this.state.testimonials,
      setTestimonials: this.setTestimonials,
    })
  }

  render() {
    const testimonials = this.renderTestimonials()

    return (
      <div className="container-testimonials shortcut-3ip01">
        <div className="wrapper">
          {/* Título */}
          <h2 className="title">Testimonios Omnilife</h2>

          {/* Testimonios */}
          <div className="testimonials flex jc-center">{testimonials}</div>

          {/* Modal mostrando la información del testimonio */}
          <Modal ref={this.refModal} />

          {/* Renderizar contenido extra */}
          {this.renderExtraContent()}
        </div>
      </div>
    )
  }
}
