// React
import { Component, Fragment } from 'react'

// Components
import { Button } from '@common'

// Librarys
import Image from 'next/image'
import LazyLoad from 'react-lazyload'

// Utils
import { truncate } from '@utils/Helper'

export default class Testimony extends Component {
  state = {
    height: 407,
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.height !== nextState.height
  }

  // Setear altura por defecto del testimonio
  setDefaultHeight() {
    this.setState({ height: 'auto' })
  }

  render() {
    const { author, testimony, position } = this.props

    return (
      <LazyLoad
        elementType="section"
        className="testimony"
        height={this.state.height}
        onContentVisible={this.setDefaultHeight.bind(this)}
        extraProps={{
          'data-aos': 'fade-up',
          'data-aos-duration': 3000,
          'data-aos-delay': position * 300,
        }}
      >
        <Fragment>
          {/* Imagen del autor del testimonio */}
          <figure className="mb-0 position-relative author-photo">
            <Image
              loading="eager"
              placeholder="blur"
              objectFit="contain"
              layout="responsive"
              title={author.name}
              src={author.photo.url}
              alt={author.short_name}
              blurDataURL={author.photo.url}
              width={author.photo.width || 150}
              height={author.photo.height || 150}
            />
          </figure>

          {/* Testimonio */}
          <p className="author-testimony">{truncate(testimony, 235)}</p>

          {/* Nombre del autor del testimonio */}
          <h3 className="author">- {author.name} -</h3>

          {/* Botón 'Leer más' */}
          <Button icon="book-open" title="Leer más" className="scale read-more" onClick={this.props.onReadMore} />
        </Fragment>
      </LazyLoad>
    )
  }
}
