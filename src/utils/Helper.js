// React
import { Fragment } from 'react'

// Librarys
import { Modal } from 'antd'
import { scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import dayjs from './dayjs'
import { isString, isObject, isFunction, isArray, isEmptyArray } from './Validations'

/**
 * Obtener la posición del scroll
 * @param null
 * @returns
 */
export function getScrollPosition() {
  // Obtener scroll de arriba
  const { scrollTop } = document.body || document.documentElement

  // Obtener la altura de la ventana y la altura total del scroll
  const { scrollHeight, clientHeight } = document.documentElement

  // Obtener altura del scroll
  const height = scrollHeight - clientHeight

  // Comprobar en qué lugar de la página está el scroll
  const scrolled = scrollTop / height

  // Convertir a entero la posición del scroll
  const fixedScrolled = (scrolled * 100).toFixed(2)

  return fixedScrolled
}

/**
 * Mover scroll suavemente a una sección de la página
 * @param {options: Object}
 * @returns
 */
export function scrollToSection(options) {
  const currentScrollPosition = getScrollPosition()

  if (currentScrollPosition > 400) return

  const { delay, duration, shortcut } = options

  const scrollConfig = {
    delay: delay || 200,
    duration: duration || 2000,
    smooth: true,
  }

  if (!delay && !duration) {
    scroller.scrollTo(options, scrollConfig)

    return null
  }

  // Realizar scroll hacia una posición de la página
  scroller.scrollTo(shortcut, scrollConfig)
}

/**
 * Obtener tamaño de viewport y comprobar si el ancho es mayor o menor a 'mq'
 * @param {mq: Number}
 * @returns
 */
export function getWindowSize(mq = 1024) {
  let windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
    isLessThanMQ: window.innerWidth < mq,
    isGreaterThanMQ: window.innerWidth > mq,
  }

  return windowSize
}

/**
 * Establecer el índice a una tabla
 * @param {object: Object, i: Number}
 * @returns
 */
export function setIndexToTable({ data, skip, limit }) {
  if (!isArray(data)) return

  return data.map((item, i) => {
    const index = skip === 0 ? i + 1 : limit * skip - (limit - (i + 1))

    return {
      ...item,
      index: index,
    }
  })
}

/**
 * Crear estado para usarlo en diferentes componentes
 * @param {objects: Array, methods: Object}
 * @returns
 */
export function createState({ objects, state }) {
  const result = { seytu: {}, omnilife: {} }

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i]
    const { value, name } = object

    // Si existe un nombre ni valor
    if (!name && !value) {
      // Asignar propiedad "object" a "result"
      Object.assign(result, {
        [object]: state(object),
      })

      continue
    }

    // Asignar propiedades "name" y como valor "state(value)" a "result"
    Object.assign(result, {
      [name]: state(value, object),
    })
  }

  return result
}

/**
 * Crear dispatch para ejecutar distintas funciones
 * @param {objects: Array, methods: Object}
 * @returns
 */
export function createDispatch({ objects, methods }) {
  const dispatch = {}

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i]

    Object.assign(dispatch, {
      [object]: methods(object),
    })
  }

  return dispatch
}

/**
 * Remover espacios en blanco y convertir a minúsculas
 * @param {value: String}
 * @returns
 */
export function removeEmptySpaces(value) {
  if (!value || !isString(value)) return

  return value.replace(/\s+/gim, '').toLowerCase()
}

/**
 * Definir clases a un componente
 * @param {arrClasses: String}
 * @returns
 */
export function classnames(arrClasses) {
  if (!isArray(arrClasses)) return

  return arrClasses.filter((el) => !!el).join(' ')
}

/**
 * Encadenar un objeto sin comillas dobles
 * @param {obj: Object}
 * @returns
 */
export function stringifyWithoutDoubleQuotes(obj) {
  if (!isObject) return

  const objectToStringify = JSON.stringify(obj)

  return objectToStringify.replace(/"([^"]+)":/g, '$1:')
}

/**
 * Remover espacios en blanco y convertir a minúsculas
 * @param {value: String}
 * @returns
 */
export function convertEmptySpacesInHyphens(value) {
  if (!value || !isString(value)) return

  return value.replace(/\s+/gim, '-').toLowerCase()
}

/**
 * Obtener algunos campos del usuario
 * @param {str: String, limit: Number}
 * @returns
 */
export function truncate(str, limit = 100) {
  if (!str) return str

  if (str.length > limit) {
    return str.substring(0, limit) + '...'
  }

  return str
}

/**
 * Formatear fecha
 * @param {date: String}
 * @returns
 */
export function formatDate(date) {
  // Formatear fecha con day.js
  const formattedDate = dayjs.formatDate({
    date: date,
    format: 'DD [de] MMMM [del] YYYY [a las] h:mm a',
  })

  // Ejm: 20 de Diciembre del 2021 a las 2:06 p.m.
  return formattedDate.replace(/m$/gim, '.m.')
}

/**
 * Obtener una fecha en formato ISOString
 * @param {value: Date, symbol: String}
 * @returns Date
 */
export function getISODate({ value, symbol }) {
  // El valor de fecha devuelve algo como 01/01/2000 o 2000-01-01 entonces se splitea cada "symbol" (-|/)
  const splitDate = value.split(symbol)

  // Obtener el año
  const year = Number(splitDate[2])

  // Obtener el mes
  const month = Number(splitDate[1]) - 1

  // Obtener el día
  const day = Number(splitDate[0])

  // Crear fecha válida
  const date = new Date(year, month, day)

  // Devuelve ==> "2001-01-01T050.0.0.Z"
  return '"' + date.toISOString() + '"'
}

/**
 * Retornar mensaje cuando no se han encontrado productos mediante filtros
 * @param {value: Date, symbol: String}
 * @returns Date
 */
export function setExtraFiltersMessage({ stock, maxPrice, minPrice, date, defaultDate, activeCategories }) {
  const extraFiltersMessage = []

  if (stock > 0) {
    extraFiltersMessage.push(`stock: "${stock}"`)
  }

  if (maxPrice > 0) {
    extraFiltersMessage.push(`precio máximo: "${maxPrice}"`)
  }

  if (minPrice > 0) {
    extraFiltersMessage.push(`precio mínimo: "${minPrice}"`)
  }

  if (isString(date)) {
    extraFiltersMessage.push(`fecha de creación: "${defaultDate}"`)
  }

  if (isArray(activeCategories.value) && !isEmptyArray(activeCategories.value)) {
    const matchCategories = activeCategories.productCategories
      .filter((productCategory) => activeCategories.value.find((categoryId) => categoryId === productCategory._id))
      .map((category) => JSON.stringify(category.name))
      .join(', ')

    extraFiltersMessage.push(`categorías activas: (${matchCategories})`)
  }

  // extraFiltersMessage.unshift(",")
  return extraFiltersMessage.join(', ')
}

/**
 * Mostrar modal de confirmación
 * @param { title: String, description: String, confirmButtonTitle: String, confirmButtonIcon: String, onCancel: Function, onSuccess: Function }
 * @returns
 */
export function showConfirmModal(config) {
  const { icon, iconColor, title, description, confirmButtonTitle, confirmButtonIcon, confirmButtonStyle, onCancel, onSuccess } = config

  // Mostrar modal de confirmación
  Modal.confirm({
    title: title,
    icon: <FontAwesomeIcon size="3x" icon={icon} color={iconColor} className="mb-2" />,
    content: description,
    okText: (
      <Fragment>
        <FontAwesomeIcon icon={confirmButtonIcon} />
        <span className="ms-2">{confirmButtonTitle}</span>
      </Fragment>
    ),
    okType: 'danger',
    cancelText: (
      <Fragment>
        <FontAwesomeIcon icon="times" />
        <span className="ms-2">Cancelar</span>
      </Fragment>
    ),
    okButtonProps: {
      className: 'scale-button',
      style: confirmButtonStyle,
    },
    cancelButtonProps: {
      className: 'scale-button',
      style: {
        color: 'var(--bg-gray-2)',
        backgroundColor: 'rgba(0, 0, 0, .075)',
        border: 'none',
      },
    },
    centered: true,
    closable: true,
    confirmLoading: false,
    closeIcon: <FontAwesomeIcon icon="times" color="rgba(0, 0, 0, .5)" />,
    onCancel: onCancel,
    onOk: () => onSuccess(Modal.destroyAll),
    maskStyle: { backgroundColor: 'rgba(0, 0, 0, .75)' },
  })
}

/**
 * Retorna un array de una longitud 'x'
 * @param {total: Number}
 * @returns
 */
export function generateArray(total) {
  return Array.from(Array(total).map((_, i) => i))
}

/**
 * Eliminar elemento de un array
 * @param {data: Array, filter: Object}
 * @returns
 */
export function removeArrayItem(data, filter) {
  if (!isArray(data)) return
  if (!isObject(filter)) return

  const result = []
  const properties = Object.keys(filter)

  for (const property of properties) {
    const newData = data.filter((item) => {
      return item[property] !== filter[property]
    })

    if (!isEmptyArray(newData)) {
      result.push(...newData)
    }
  }

  return result
}

/**
 * Actualizar un elemento de un array
 * @param {data: Array, config: { filter: Object, newData: Object } }
 * @returns {Array}
 */
export function updateArrayItem(data, config) {
  const result = []
  const { filter, newData } = config
  const keys = Object.keys(filter)

  for (let i = 0; i < data.length; i++) {
    const item = data[i]

    if (!item) continue

    if (isObject(item)) {
      const existFilter = keys.every((key) => {
        return JSON.stringify(item[key]) === JSON.stringify(filter[key])
      })

      if (existFilter) {
        if (isFunction(newData)) {
          result[i] = newData(item)
          continue
        }

        result[i] = newData
        continue
      }

      result[i] = item
    }
  }

  return result
}

// Formatear números para mostrarlos como visitas
export function nFormatter(num, digits = 0) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })

  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}
