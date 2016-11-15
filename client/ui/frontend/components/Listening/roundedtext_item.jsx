import React from 'react'
import { PropTypes} from 'react'

class RoundedTextItem extends React.Component {

  showHoverItem(e) {
    if(this.refs.hoverItem){
      this.refs.hoverItem.classList.remove('hidden')
      this.refs.item.classList.add('hidden')
    }
  }

  hideHoverItem(e) {
    if(this.refs.hoverItem){
      this.refs.hoverItem.classList.add('hidden')
      this.refs.item.classList.remove('hidden')
    }
  }

  render() {

    const{title, hoverItem} = this.props    

    return (
      <div className="rounded-text-item">          
        {hoverItem && <span onMouseLeave={this.hideHoverItem.bind(this)} 
          ref="hoverItem" className="hidden">{hoverItem}</span>
        }
        <span className="title" onMouseEnter={this.showHoverItem.bind(this)} 
          ref="item">{title}</span>
      </div>
    )
  }    
}

export default RoundedTextItem