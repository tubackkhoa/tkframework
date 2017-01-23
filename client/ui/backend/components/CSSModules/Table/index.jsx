import React from 'react'
import './table.css'

export default () => {
  return <div styleName='table'>
    <div styleName='row'>
      <div styleName={'cell' + (Math.random() > 0.5 ? ' yellow' : '')}>A2</div>
      <div styleName={'cell' + (Math.random() > 0.5 ? ' yellow' : '')}>B2</div>
      <div styleName={'cell' + (Math.random() > 0.5 ? ' yellow' : '')}>C2</div>
    </div>
  </div>
}