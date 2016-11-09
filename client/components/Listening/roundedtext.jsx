import React from 'react'
import { PropTypes} from 'react'

import {green300} from 'material-ui/styles/colors'

import RoundedTextItem from './roundedtext_item'

class RoundedText extends React.Component {

  render() {

    const{items} = this.props    

    return (
      <div className="rounded-text">          
        { items.map((item, index)=> (
          <RoundedTextItem key={index} title={item.title || item} hoverItem={item.hoverItem} /> 
        ))}
      </div>
    )
  }    
}

export default RoundedText