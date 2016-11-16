import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

class Footer extends Component {

  render() {
    
    return (      
      <div className="footer row">
        <div className="container">
          <div className="copyright ml-20">
          TKFramework @ 2016
          </div>          
        </div>
      </div>      
    )

  }

}


export default Footer