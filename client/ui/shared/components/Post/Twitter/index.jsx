import React, { PropTypes } from 'react'
import TweetEmbed from './TweetEmbed'


const Twitter = ({ twitterId }) => (
  <div >
    <TweetEmbed id={twitterId} />
  </div>
)

export default Twitter

