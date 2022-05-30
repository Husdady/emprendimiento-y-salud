// React
import { Component, Fragment } from 'react'

// Librarys
import { Table } from 'antd'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Flags
import * as flags from './flags'

export default class MembershipTable extends Component {
  constructor(props) {
    super(props)
    this.fields = [
      {
        title: (
          <Fragment>
            <FontAwesomeIcon icon="globe-americas" className="me-2" />
            <b>Países disponibles:</b>
          </Fragment>
        ),
        dataIndex: 'country',
        key: 'country',
        render: (country, fields) => {
          return (
            <article className="d-flex align-items-center">
              {/* Imagen de la bandera */}
              <Image width={24} height={24} alt={fields.key} src={country.flag} />

              {/* Nombre de la bandera */}
              <b className="ms-2">{country.name}</b>
            </article>
          )
        },
      },
      {
        title: (
          <Fragment>
            <FontAwesomeIcon icon="phone-alt" className="ms-2" />
            <b>Línea de Creo Omnilife</b>
          </Fragment>
        ),
        dataIndex: 'line',
        key: 'line',
        render: (line) => {
          return (
            <span className="d-flex align-items-center">
              <FontAwesomeIcon icon="phone-volume" size="2x" className="ms-2" />
              <i>{line}</i>
            </span>
          )
        },
      },
    ]

    this.countries = [
      {
        key: 'argentina',
        country: {
          flag: flags.argFlag,
          name: 'Argentina',
        },
        line: '0800 666 6664',
      },
      {
        key: 'bolivia',
        country: {
          flag: flags.bolFlag,
          name: 'Bolivia',
        },
        line: '800 10 6664',
      },
      {
        key: 'chile',
        country: {
          flag: flags.chiFlag,
          name: 'Chile',
        },
        line: '800-83-5500',
      },
      {
        key: 'colombia',
        country: {
          flag: flags.colFlag,
          name: 'Colombia',
        },
        line: '01 800 0915 073',
      },
      {
        key: 'costa-rica',
        country: {
          flag: flags.costFlag,
          name: 'Costa Rica',
        },
        line: '800 666 45 43',
      },
      {
        key: 'ecuador',
        country: {
          flag: flags.ecuFlag,
          name: 'Ecuador',
        },
        line: '1800-66 6486',
      },
      {
        key: 'el-salvador',
        country: {
          flag: flags.salFlag,
          name: 'El Salvador',
        },
        line: '800-7005',
      },
      {
        key: 'guatemala',
        country: {
          flag: flags.guaFlag,
          name: 'Guatemala',
        },
        line: '1-801-00-41252',
      },
      {
        key: 'mexico',
        country: {
          flag: flags.mexFlag,
          name: 'México',
        },
        line: '01 800 112 66 64',
      },
      {
        key: 'nicaragua',
        country: {
          flag: flags.nicFlag,
          name: 'Nicaragua',
        },
        line: '1-800-6664',
      },
      {
        key: 'panama',
        country: {
          flag: flags.panFlag,
          name: 'Panamá',
        },
        line: '800-2985',
      },
      {
        key: 'paraguay',
        country: {
          flag: flags.parFlag,
          name: 'Paraguay',
        },
        line: '0800-11-6664',
      },
      {
        key: 'peru',
        country: {
          flag: flags.perFlag,
          name: 'Perú',
        },
        line: '0800 00 664',
      },
      {
        key: 'republica-dominicana',
        country: {
          flag: flags.repdFlag,
          name: 'Republica Dominicana',
        },
        line: '809-200-0445',
      },
      {
        key: 'uruguay',
        country: {
          flag: flags.uruFlag,
          name: 'Uruguay',
        },
        line: '0800-8521',
      },
    ]
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <Table bordered pagination={false} className="countries mb-4" columns={this.fields} dataSource={this.countries} />
  }
}
