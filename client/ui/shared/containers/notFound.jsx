import React, {Component} from 'react'
import {Link} from 'react-router'
import injectSheet from 'react-jss'

const styles = {
  errorTitle: {
    color: '#adafb2',
    fontSize: 30,
    fontWeight: 'bold',    
    padding: '20px 0',
  },

  strong: {
    color: '#adafb2',
    fontSize: 60,
    fontWeight: 'bold',
  },

  p: {
    color: '#adafb2',
    fontSize: 20,
    fontWeight: 'bold',
  },

  link: {
    color: '#3c8dbc',
  }
}

@injectSheet(styles)
class NotFound extends Component {

  render () {
    const {classes} = this.props
    return (      
      <article>
        <div className="text-center mt-40">
          <img src="/images/404.png" alt="404 error" />
          <h1 className={classes.errorTitle}>
            <strong className={classes.strong}>404</strong>
            <br /> Page Not Found 
          </h1>
          <p className={classes.p}>We're sorry, the page you were looking for doesn't exist anymore.
            <br/><br/>Goto <Link to='/' className={classes.link}>Home</Link>
          </p>
        </div>        
      </article>
    )
  }
}

export default NotFound