import React, { Component, PropTypes } from 'react'

const widgetJS = '//platform.twitter.com/widgets.js'

class TweetEmbed extends Component {

  // use this method will help to render when props changed
  // if we do not want it to change then use this method for componentDidMount

  setTwitterWidget(id) {
    // offsetHeight is outer, scrollHeight is inner
    this.div.innerHTML = ''
    const renderTweet = () => {      
      window.twttr.widgets.createTweetEmbed(
        id,
        this.div,
        { align: 'center', cards: 'hidden', conversation: 'none' }
      )
    }

    if (window.twttr) {
      renderTweet()
    } else {
      this.appendScript(widgetJS, renderTweet)
    }
  }

  componentDidMount(){
    this.setTwitterWidget(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setTwitterWidget(nextProps.id)
  }

  appendScript(src, callback) {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.onload = () => callback()
    document.body.appendChild(script)
  }

  render() {
    return <div className='twitter-widget' ref={ref => this.div = ref} />
  }
}

export default TweetEmbed
