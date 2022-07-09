// React
import { Component, Fragment } from 'react'

// Components
import Loading from '@root/src/components/layouts/loaders/Loading.Preload'

// Containers
import MainContainer from '@root/src/containers/MainContainer'

// Librarys
import { Row, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Headers
import { ContactHeader } from '@headers'

// API
import getContactInformation from '@api/contact/getContactInformation'

// Utils
import { scrollToSection } from '@utils/Helper'

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      contactInformation: {},
    }

    this.hideLoading = this.hideLoading.bind(this)
    this.setContactInformation = this.setContactInformation.bind(this)
    this.renderTitles = this.renderTitles.bind(this)
    this.renderSubtitles = this.renderSubtitles.bind(this)
    this.renderSocialNetworks = this.renderSocialNetworks.bind(this)
    this.renderEmails = this.renderEmails.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.loading !== nextState.loading
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    getContactInformation({
      hideLoading: this.hideLoading,
      setContactInformation: this.setContactInformation,
    })

    scrollToSection({
      delay: 300,
      shortcut: 'shortcut-xg31b',
    })
  }

  // Setear información de contacto
  hideLoading() {
    this.setState({ loading: false })
  }

  // Setear información de contacto
  setContactInformation(contactInformation) {
    this.setState({ contactInformation: contactInformation })
  }

  // Renderizar subtítulos
  renderSubtitles() {
    const subtitles = [
      {
        icon: 'phone-alt',
        title: 'Teléfono de contacto',
        value: ['+51', this.state.contactInformation.phone].join(' '),
      },
      {
        icon: 'key',
        title: 'Código de empresario',
        value: this.state.contactInformation.omnilifeCode,
      },
      {
        icon: 'user-tie',
        title: 'Distribuidora Independiente',
        value: this.state.contactInformation.fullname,
      },
    ]

    return subtitles.map((subtitle, i) => (
      <div className="subtitle fw-bold" key={i}>
        <span>
          <FontAwesomeIcon icon={subtitle.icon} />
          &nbsp;{subtitle.title}:
        </span>
        <span className="ms-2">{subtitle.value}</span>
      </div>
    ))
  }

  // Renderizar página de red social
  renderSocialNetwork(socialNetwork) {
    const isFacebookPage = socialNetwork._id.split('.')[1] === 'facebook'
    const isInstagramPage = socialNetwork._id.split('.')[1] === 'instagram'
    const isTwitterPage = socialNetwork._id.split('.')[1] === 'twitter'

    const icon = isFacebookPage ? 'facebook-square' : isInstagramPage ? 'instagram' : isTwitterPage ? 'twitter' : null

    const textColor = isFacebookPage ? '#3b5998' : isInstagramPage ? '#cd201f' : isTwitterPage ? '#00acee' : null

    return (
      <article key={socialNetwork._id}>
        {/* Icono */}
        <FontAwesomeIcon className="me-1" color={textColor} icon={['fab', icon]} />

        {/* Enlace de página */}
        <a target="_blank" style={{ color: textColor }} href={socialNetwork.linkOfThePage}>
          <b>{socialNetwork.nameOfThePage}</b>
        </a>
      </article>
    )
  }

  // Renderizar redes sociales
  renderSocialNetworks() {
    const { facebook, instagram, twitter } = this.state.contactInformation.socialNetworks
    return (
      <Row gutter={[10]} className="mb-2">
        <Col xxl={{ span: 6 }} xl={{ span: 8 }} md={{ span: 7 }} sm={{ span: 11 }} xs={{ span: 22 }}>
          {/* Renderizar páginas de facebook */}
          {facebook.map(this.renderSocialNetwork)}
        </Col>

        {/*<div className="instagram">*/}
        <Col xxl={{ span: 6 }} xl={{ span: 8 }} md={{ span: 7 }} sm={{ span: 11 }} xs={{ span: 22 }}>
          {/* Renderizar páginas de instagram */}
          {instagram.map(this.renderSocialNetwork)}
        </Col>

        {/*<div className="twitter">*/}
        <Col xxl={{ span: 6 }} xl={{ span: 8 }} md={{ span: 7 }} sm={{ span: 11 }} xs={{ span: 22 }}>
          {/* Renderizar páginas de twitter */}
          {twitter.map(this.renderSocialNetwork)}
        </Col>
      </Row>
    )
  }

  // Renderizar correos electrónicos
  renderEmails() {
    return (
      <Row gutter={[20]}>
        {this.state.contactInformation.emails.map((email, i) => (
          <Col key={i} xxl={{ span: 6 }} xl={{ span: 9 }} md={{ span: 7 }} sm={{ span: 11 }} xs={{ span: 22 }}>
            <span className="paragraph d-flex align-items-center">
              <FontAwesomeIcon icon="envelope" className="me-2" />

              <b style={{ fontSize: '.85em' }}>{email}</b>
            </span>
          </Col>
        ))}
      </Row>
    )
  }

  // Renderizar títulos
  renderTitles() {
    const titles = [
      {
        icon: 'address-card',
        name: 'Acerca de mí',
        underlineStyle: { width: '10%' },
        component: <p className="paragraph">{this.state.contactInformation.aboutMe}</p>,
      },
      {
        icon: 'user-injured',
        name: 'Mi testimonio Omnilife',
        underlineStyle: { width: '20%' },
        component: <p className="paragraph">{this.state.contactInformation.testimony}</p>,
      },
      {
        icon: 'network-wired',
        name: 'Mis redes sociales',
        underlineStyle: { width: '25%' },
        component: this.renderSocialNetworks(),
      },
      {
        icon: 'envelope',
        name: 'Correo electrónicos de contacto',
        underlineStyle: { width: '40%' },
        component: this.renderEmails(),
      },
    ]

    return titles.map((title, i) => (
      <Fragment key={i}>
        <h1 className="title fw-bold mb-0">
          <FontAwesomeIcon icon={title.icon} />
          <span className="ms-2">{title.name}</span>
        </h1>

        <div className="underline mb-3" style={title.underlineStyle} />

        {/* Componente */}
        {title.component}
      </Fragment>
    ))
  }

  // Renderizar contenido
  renderContent() {
    if (this.state.loading) return <Loading />

    return (
      <Fragment>
        {/* Sección de imagen y nombre del contacto */}
        <section className="contact-avatar">
          {/* Imagen de contacto */}
          <div
            className="avatar mx-auto rounded-circle mb-3"
            style={{
              backgroundImage: `url(${this.state.contactInformation.contactPhoto})`,
            }}
          />

          {/* Renderizar subtítulos */}
          {this.renderSubtitles()}
        </section>

        {/* Sección de información del contacto */}
        <section className="about-me">
          {/* Renderizar títulos */}
          {this.renderTitles()}
        </section>
      </Fragment>
    )
  }

  render() {
    const wrapperClasses = `wrapper mx-auto rounded-2 p-5 flex ${this.state.loading ? 'jc-center align-items-center' : 'jc-between'}`

    return (
      <Fragment>
        {/* Head */}
        <ContactHeader />

        <MainContainer>
          <div id="contact-information" className="py-5 shortcut-xg31b">
            <div className={wrapperClasses}>{this.renderContent()}</div>
          </div>
        </MainContainer>
      </Fragment>
    )
  }
}
