// React
import { Component, Fragment } from 'react'

// Components
import Container from '@layouts/common/Container'
import Information from '@layouts/membership/Membership.Information'
import ContentTable from '@layouts/membership/Membership.ContentTable'

// Headers
import { AffiliateProgramHeader } from '@headers'

// Utils
import { scrollToSection } from '@utils/Helper'

export default class AffiliateProgram extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    scrollToSection({
      delay: 200,
      duration: 1000,
      shortcut: 'shortcut-qe18n',
    })
  }

  render() {
    return (
      <Fragment>
        {/* Head */}
        <AffiliateProgramHeader />

        <Container>
          <div className="affiliate-program flex jc-around shortcut-qe18n">
            {/* Información acerca del programa de afiliados */}
            <Information />

            {/* Tabla de contenido */}
            <ContentTable />
          </div>
        </Container>
      </Fragment>
    )
  }
}
