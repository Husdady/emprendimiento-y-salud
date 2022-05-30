// React
import { Component } from 'react'

// Librarys
import Image from 'next/image'

// Utils
import { classnames } from '@utils/Helper'

export default class Empty extends Component {
  static defaultProps = {
    width: 400,
    height: 400,
  }

  constructor(props) {
    super(props)
    this.emptyClasses = classnames(['empty-content mt-3 d-flex align-items-center flex-column', this.props.className])

    this.styles = {
      title: {
        fontSize: '1.15em',
        color: 'var(--bg-gray-200)',
        fontFamily: 'IMFellEnglishSC',
        ...this.props.titleStyle,
      },
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className={this.emptyClasses} style={this.props.styles}>
        {/* Imagen */}
        <div className="position-relative">
          <Image
            src={this.props.image}
            blurDataURL={this.props.image}
            width={this.props.width}
            height={this.props.height}
            loading="eager"
            objectFit="cover"
            placeholder="blur"
            alt="empty-image-content"
          />
        </div>

        {/* Título */}
        <span className="title text-center mt-3" style={this.styles.title}>
          {this.props.title}
        </span>
      </div>
    )
  }
}
