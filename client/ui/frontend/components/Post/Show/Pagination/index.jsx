import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import inlineStyles from 'ui/shared/styles/MaterialUI'


class Pagination extends Component {

  render() {
    const {prev, next, adminPath} = this.props
    return (
      <section className='mt-20'>
        {prev && 
          <Link className='col-xs-6' to={`${adminPath}/posts/${prev.id}`} >
            <NavigationChevronLeft className='col-xs-3' color={inlineStyles.iconColor} style={inlineStyles.prevIcon} />
            <div className='col-xs-9 mt-10'>{prev.title}</div>
          </Link>
        }
        {next &&
          <Link className='col-xs-6' to={`${adminPath}/posts/${next.id}`} >
            <NavigationChevronRight className='col-xs-3 pull-right' color={inlineStyles.iconColor} style={inlineStyles.nextIcon} />
            <div className='col-xs-9 mt-10 pull-right text-right'>{next.title}</div>            
          </Link>
        }
      </section>
    )
  }
}

export default Pagination

