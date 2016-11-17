import React, { PropTypes } from 'react'

const Image = ({ image, caption }) => (
  <figure >
    <img       
      src={image}
      alt={caption}
    />
    {caption &&
      <figcaption >{caption}</figcaption>
    }
  </figure>
)

export default Image
