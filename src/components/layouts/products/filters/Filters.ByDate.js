// React
import { Component } from 'react'

// Components
import { Help } from '@common'

// Librarys
import 'moment/locale/es'
import moment from 'moment'
import { DatePicker } from 'antd'
import dynamic from 'next/dynamic'

// Utils
import { isFunction } from '@utils/Validations'

const locale = dynamic(() => import('antd/es/date-picker/locale/es_ES'), { ssr: false })

export default class ByDate extends Component {
  static defaultProps = {
    defaultValue: '',
  }

  constructor(props) {
    super(props)
    this.splitDate = this.splitDate.bind(this)
    this.defaultDate = this.props.defaultValue ? this.splitDate() : ''
    this.state = {
      date: this.defaultDate,
    }
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.date !== nextState.date
  }

  splitDate() {
    const { defaultValue } = this.props
    const [day, month, year] = defaultValue.split('/')
    const date = new Date(year, month - 1, day)

    return moment(date)
  }

  // Evento 'change' en 'DatePicker'
  onChange(moment, date) {
    this.setState({ date: moment })

    const { onUpdateDate } = this.props

    if (!isFunction(onUpdateDate)) return

    onUpdateDate(date)
  }

  render() {
    return (
      <div id="by-date" className="position-relative">
        {/* Icono de ayuda */}
        <Help title="Establece una cantidad máxima y mínima para filtrar por precios." />

        {/* Subtítulo */}
        <h3 className="subtitle">Filtrar por fecha:</h3>

        {/* Selector de fecha */}
        <DatePicker
          showNow
          locale={locale}
          format="DD/MM/YYYY"
          value={this.state.date}
          style={{ width: '100%' }}
          placeholder="Selecciona una fecha"
          onChange={this.onChange.bind(this)}
          className="creation-product-date"
        />
      </div>
    )
  }
}
