// React
import { Component, Fragment } from 'react'

// Containers
import MainContainer from '@root/src/containers/MainContainer'

// Headers
import { OmnilifeHistoryHeader } from '@headers'

// Utils
import omnilifeHistory from '@utils/omnilife-history'
import { scrollToSection } from '@utils/Helper'

const amaury = require('@assets/img/omnilife-history/amaury-vergara.png').default

const imageStyle = {
  backgroundAttachment: 'fixed',
  backgroundImage: `url(${amaury.src})`,
}

export default class OmnilifeHistory extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    scrollToSection('shortcut-p120j')
  }

  // Renderizar elemento dependiendo de su tipo
  renderElementType(el, i) {
    const elementType = {
      // Renderizar componente personalizado
      custom: el.component,

      // Renderizar título
      title: (
        <h2 key={i} className="title" id={el.shortcut}>
          {el.text}
        </h2>
      ),

      // Renderizar párrafo
      paragraph: (
        <Fragment key={i}>
          <span className="paragraph" style={el.style}>
            {el.text}
          </span>
          <br />
          <br />
        </Fragment>
      ),
    }

    return elementType[el.type]
  }

  render() {
    return (
      <Fragment>
        {/*Head*/}
        <OmnilifeHistoryHeader />

        <MainContainer>
          <div id="omnilife-history" className="shortcut-p120j" style={imageStyle}>
            <div className="wrapper" />

            {/* Renderizar historia de omnilife */}
            {omnilifeHistory.map(this.renderElementType)}
          </div>
        </MainContainer>
      </Fragment>
    )
  }
}
