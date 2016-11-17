import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import inlineStyles from 'ui/shared/styles/MaterialUI'


class Pagination extends Component {

  render() {
    const {prev, next, adminPath} = this.props
    return (
      <section>
        {prev && 
          <Link to={`${adminPath}/posts/${prev.id}`} >
            <NavigationChevronLeft color={inlineStyles.iconColor} style={inlineStyles.prevIcon} />
            <div >{prev.title}</div>
          </Link>
        }
        {next &&
          <Link to={`${adminPath}/posts/${next.id}`} >
            <div >{next.title}</div>
            <NavigationChevronRight color={inlineStyles.iconColor} style={inlineStyles.nextIcon} />
          </Link>
        }
      </section>
    )
  }
}

export default Pagination

