import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Headbar from 'components/Headbar'


class Book extends React.Component{


  render(){    
    const {children} = this.props
    return (
      <div>      
        
          <div className="container-fluid">
            <Headbar/>
          </div>

          <div className="container mb-30">
            {children}
          </div>

      </div>
    )
  }
} 


export default Book