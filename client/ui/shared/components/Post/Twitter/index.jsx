import React, { PropTypes } from 'react'
import TweetEmbed from './TweetEmbed'


const Twitter = ({ twitter_id }) => (
  <div >
    <TweetEmbed id={twitter_id} />
  </div>
)

export default Twitter

