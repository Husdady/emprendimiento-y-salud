// React
import { Component } from 'react'

// Librarys
import Image from 'next/image'

// API
import { APP_NAME } from '@api/credentials'

const maintenance = require('@assets/img/404/maintenance.gif').default.src

const containerStyle = {
  padding: "3em 2em"
}

const figureStyle = {
  width: 400,
  height: 400
}

const titleStyle = {
  maxWidth: 538,
  marginTop: -70,
  lineHeight: "32px",
  fontSize: "1.75em",
  fontFamily: "Rubik",
  color: "var(--bg-violet)"
}

export default class AppInMaintenance extends Component {
  componentDidMount() {
    document.body.style = "background-color: #ffffff";
  }

  componentWillUnmount() {
    document.body.style = null;
  }

  render() {
    return (
      <div className="d-flex jc-center flex-column" style={containerStyle}>
        <figure style={figureStyle} className="mx-auto">
          <Image
            width="100%"
            height="100%"
            loading="eager"
            placeholder="blur"
            objectFit="contain"
            layout="responsive"
            title="Sitio web en matenimiento"
            alt="sitio-web-en-mantenimiento"
            src={maintenance}
            blurDataURL={maintenance}
          />
        </figure>

        <h2 className="fw-bold mx-auto text-center" style={titleStyle}>Actualmente <q>{APP_NAME}</q> está en mantenimiento, pronto volverá a estar disponible de nuevo...</h2>
      </div>
    )
  }
}
