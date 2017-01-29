import React, {Component} from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

import styles from './styles'

// complied css
// import jss from 'jss'
// const sheet = jss.createStyleSheet(styles)

@injectSheet(styles)
export default class Button extends Component {
  render() {
    const {sheet: {classes}, children, isActive} = this.props
    return (
      <button className={classNames({
        [classes.normal]: true,
        [classes.active]: isActive
      })}>
        <span className={classes.label}>
          {children}
        </span>
      </button>
    )
  }
}