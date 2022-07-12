// React
import { Component } from 'react'

// Components
import { Button } from '@common'

// Librarys
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'

// Headers
import { HomeHeader } from '@headers'

// JSON
import initialPageSections from '@assets/json/home/initial-page-sections.json'
import aboutOmnilifeProducts from '@assets/json/home/about-omnilife-products.json'
import aboutSeytuProducts from '@assets/json/home/about-seytu-products.json'
import businessSections from '@assets/json/home/business-sections.json'

// Secciones iniciales
const Section = dynamic(() => import('@root/src/components/layouts/home/Section'))

// Contenedor principal
const MainContainer = dynamic(() => import('@root/src/containers/MainContainer'))

// Información sobre los productos Omnilife y Seytú
const Information = dynamic(() => import('@root/src/components/layouts/home/Information'))

// Afiliación sobre el negocio
const Membership = dynamic(() => import('@root/src/components/layouts/home/Membership'))

// Datos sobre el negocio
const Business = dynamic(() => import('@root/src/components/layouts/home/Business'))

// Testimonios Omnilife
const Testimonials = dynamic(() => import('@root/src/containers/Testimonials'))

const buttonStyle = {
  padding: 10,
  width: '95%',
  maxWidth: 400,
  marginTop: 30,
  color: 'var(--bg-yellow)',
  backgroundColor: 'var(--bg-violet)',
}

class Home extends Component {
  shouldComponentUpdate() {
    return false
  }

  // Renderizar botón 'Ver todos los testimonios'
  renderButton() {
    return (
      <Button
        icon="eye"
        style={buttonStyle}
        textColor="var(--bg-yellow)"
        backgroundColor="var(--bg-violet)"
        className="d-block mx-auto rounded-1"
        title="Ver todos los testimonios Omnilife"
        onClick={() => this.props.router.push('/testimonios')}
      />
    )
  }

  // Renderizar secciones iniciales de la página
  renderPageSections() {
    return initialPageSections.map((item, i) => <Section key={i} {...item} />)
  }

  render() {
    return (
      <MainContainer>
        <HomeHeader />

        {/* Secciones iniciales de la página */}
        {this.renderPageSections()}

        {/* Información sobre los productos Omnilife */}
        <Information company="omnilife" id="shortcut-1DA21" defaultColor="var(--bg-darkpurple)" {...aboutOmnilifeProducts} />

        {/* Afiliar empresarios o clientes */}
        <Membership />

        {/* Sobre el negocio Omnilife */}
        <Business items={businessSections} />

        {/* Información sobre los productos Seytú */}
        <Information company="seytu" id="shortcut-D12H3" defaultColor="var(--bg-darkred)" {...aboutSeytuProducts} />

        {/* Testimonios Omnilife */}
        <Testimonials renderExtraContent={this.renderButton.bind(this)} />
      </MainContainer>
    )
  }
}

export default withRouter(Home)
