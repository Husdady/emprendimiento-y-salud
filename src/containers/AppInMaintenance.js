// React
import { Component, Fragment } from 'react'

// Headers
import { AppInMaintenanceHeader } from '@headers'

// API
import { APP_NAME } from '@api/credentials'


const maintenance = require('@assets/img/404/maintenance.gif').default.src

const containerStyle = {
  padding: "3em 2em"
}

const figureStyle = {
  width: 400
}

const titleStyle = {
  maxWidth: 538,
  marginTop: 20,
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
      <Fragment>
        {/* Header */}
        <AppInMaintenanceHeader />

        {/* Sitio web en matenimiento */}
        <div className="d-flex jc-center flex-column h-100vh" style={containerStyle}>
          <figure style={figureStyle} className="mx-auto mb-0">
            <img
              width="100%"
              height="100%"
              title="Sitio web en matenimiento"
              alt="sitio-web-en-mantenimiento"
              src={maintenance}
            />
          </figure>

          <h2 className="fw-bold mx-auto text-center" style={titleStyle}>Actualmente <q>{APP_NAME}</q> está en mantenimiento, pronto volverá a estar disponible de nuevo...</h2>
        </div>
      </Fragment>
    )
  }
}
