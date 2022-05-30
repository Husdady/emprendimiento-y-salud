// React
import { Component, Fragment } from 'react'

// Components
import { Dropdown } from '@common'

// Librarys
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import { isArray } from '@utils/Validations'

// JSON
import clientLinks from '@assets/json/membership/client-links.json'
import entreprenuerLinks from '@assets/json/membership/entreprenuer-links.json'

// Flags
import * as flags from './flags'

export default class CountryLinks extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="flex jc-around align-items-center" style={{ marginBottom: '2em' }}>
        {/* Enlaces de afiliación para clientes admirables */}
        <DropdownFlags links={clientLinks} />

        {/* Enlaces de afiliación para empresarios */}
        <DropdownFlags links={entreprenuerLinks} />
      </div>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class DropdownFlags extends Component {
  constructor(props) {
    super(props)
    this.mq = process.browser.innerWidth <= 600
    this.styles = {
      container: {
        width: this.mq ? '100%' : '40%',
      },
      title: {
        fontSize: '1.25em',
        color: 'var(--bg-darkpurple)',
        fontWeight: 'bold',
      },
      selectCountry: {
        padding: '1em',
        fontWeight: 'bold',
        width: '100%',
        backgroundColor: '#ffffff',
      },
      containerFlag: {
        paddingTop: 7,
        paddingBottom: 7,
      },
      flagName: {
        marginLeft: 7,
        fontSize: '1.1em',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans',
      },
    }

    this.flags = [
      {
        name: 'Argentina',
        img: flags.argFlag,
      },
      {
        name: 'Bolivia',
        img: flags.bolFlag,
      },
      {
        name: 'Chile',
        img: flags.chiFlag,
      },
      {
        name: 'Colombia',
        img: flags.colFlag,
      },
      {
        name: 'Costa Rica',
        img: flags.costFlag,
      },
      {
        name: 'Ecuador',
        img: flags.ecuFlag,
      },
      {
        name: 'El Salvador',
        img: flags.salFlag,
      },
      {
        name: 'Guatemala',
        img: flags.guaFlag,
      },
      {
        name: 'México',
        img: flags.mexFlag,
      },
      {
        name: 'Nicaragua',
        img: flags.nicFlag,
      },
      {
        name: 'Panamá',
        img: flags.panFlag,
      },
      {
        name: 'Paraguay',
        img: flags.parFlag,
      },
      {
        name: 'Perú',
        img: flags.perFlag,
      },
      {
        name: 'República Dominicana',
        img: flags.repdFlag,
      },
      {
        name: 'Uruguay',
        img: flags.uruFlag,
      },
    ]
  }

  renderFlags() {
    return this.flags.map((flag, i) => ({
      el: (
        <div key={i} role="button" style={this.styles.containerFlag} className="d-flex align-items-center" onClick={() => window.open(this.props.links[i], '_blank')}>
          <Image src={flag.img} width={30} height={30} />
          <span style={this.styles.flagName}>{flag.name}</span>
        </div>
      ),
    }))
  }

  render() {
    const flags = this.renderFlags()

    return (
      <div style={this.styles.container}>
        {/* Subtítulo */}
        <h3 style={this.styles.title}>Enlace para Cliente Admirable</h3>

        <Dropdown subItems={flags} trigger={['click']}>
          <div style={this.styles.selectCountry} className="d-flex jc-between align-items-center">
            <span>Selecciona tu país:</span>
            <FontAwesomeIcon icon="angle-down" />
          </div>
        </Dropdown>
      </div>
    )
  }
}
