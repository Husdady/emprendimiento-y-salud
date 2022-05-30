// React
import { Component, Fragment } from 'react'

// Librarys
import Image from 'next/image'
import reactStringReplace from 'react-string-replace'

// Headers
import { AffiliateProgramHeader } from '@headers'

// Utils
import membership from '@utils/membership'

// Información del programa de afiliados
export default class Information extends Component {
  // Setear negrita
  setBold = (str) => {
    return reactStringReplace(str, /\*\*(.*?)\*\*/g, (match, i) => {
      let bold = this.setItalic(match)
      bold = this.setUnderline(bold)

      return <b key={match + i}>{bold}</b>
    })
  }

  // Setear itálica
  setItalic = (str) => {
    return reactStringReplace(str, /\/(.*?)\//g, (match, i) => {
      let italic = this.setBold(match)
      italic = this.setUnderline(italic)

      return <i key={i}>{italic}</i>
    })
  }

  // Setear subrayado
  setUnderline = (str) => {
    return reactStringReplace(str, /\|(.*?)\|/g, (match, i) => {
      let underline = this.setBold(match)
      underline = this.setItalic(underline)

      return <u key={i}>{underline}</u>
    })
  }

  // Crear enlace
  createLink(str) {
    return reactStringReplace(str, /\#(.*?)\#/g, (match, i) => {
      const linkFound = match.split(/\<(.*?)\>/g)
      const link = linkFound[1]
      const text = linkFound[3]

      return (
        <a key={match + i} href={link} target="_blank" rel="noreferrer" style={{ color: 'var(--bg-darkred)' }}>
          <b>{text}</b>
        </a>
      )
    })
  }

  // Setear estilos al texto
  setTextStyle(text) {
    let textWithStyle = text

    textWithStyle = this.createLink(text) // Crear un link
    textWithStyle = this.setBold(textWithStyle) // Dar 'negrita' al texto
    textWithStyle = this.setItalic(textWithStyle) // Dar 'cursiva' al texto
    textWithStyle = this.setUnderline(textWithStyle) // Dar 'línea baja' al texto

    return textWithStyle
  }

  // Renderizar elemento dependiendo de su tipo
  renderElementType = (el, i, totalElements) => {
    // Comprobar si el siguiente elemento es de tipo 'title'
    const isNextElementAnTitle = totalElements[i + 1]?.type === 'title'

    const elementType = {
      // Renderizar componente personalizado
      custom: el.component,

      // Renderizar título
      title: (
        <h2 key={i} className="title" id={el.shortcut}>
          {el.text}
        </h2>
      ),

      // Renderizar imagen
      image: (
        <figure key={i} className="w-100 mb-0" style={el.style}>
          <Image loading="eager" placeholder="blur" src={el.url} alt={el.alt} width={el.width} height={el.height} blurDataURL={el.url} {...el.extraImageProps} />
        </figure>
      ),

      // Renderizar párrafo
      paragraph: (
        <Fragment key={i}>
          {/* Párrafo */}
          <span id={el.shortcut} style={el.style} className="paragraph">
            {this.setTextStyle(el.text)}
          </span>

          {/* Saltos de línea */}
          {!isNextElementAnTitle && (
            <Fragment>
              <br />
              <br />
            </Fragment>
          )}
        </Fragment>
      ),
    }

    return elementType[el.type]
  }

  render() {
    return (
      <Fragment>
        <AffiliateProgramHeader />
        <section className="information">{membership.map(this.renderElementType)}</section>
      </Fragment>
    )
  }
}
