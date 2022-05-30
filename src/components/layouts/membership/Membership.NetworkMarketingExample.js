// React
import { Component, Fragment } from 'react'

// Utils
import { isArray } from '@utils/Validations'

// JSON
import marketingExample from '@assets/json/membership/marketing-example.json'

class NetworkMarketingExample extends Component {
  constructor(props) {
    super(props)
    this.renderBranch = this.renderBranch.bind(this)
    this.renderSubBranch = this.renderSubBranch.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar sub ramas
  renderSubBranch(subBranch) {
    if (!isArray(subBranch.subItems)) return

    return <ul className="sub-branchs">{subBranch.subItems.map(this.renderBranch)}</ul>
  }

  // Renderizar ramas
  renderBranch(branch, i) {
    return (
      <Fragment key={i}>
        <li className="branch">
          <span className="content">
            {branch.title && (
              <Fragment>
                <b>{branch.title}</b>&nbsp;&nbsp;
              </Fragment>
            )}
            {branch.presenter && <em>{branch.presenter}</em>}
          </span>

          {/* Sub ramas */}
          {this.renderSubBranch(branch)}
        </li>
      </Fragment>
    )
  }

  // Renderizar contenido
  renderContent() {
    return <ul className="tree">{marketingExample.map(this.renderBranch)}</ul>
  }

  render() {
    return this.renderContent()
  }
}

export default NetworkMarketingExample
