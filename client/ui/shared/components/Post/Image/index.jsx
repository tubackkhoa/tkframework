import React, { PropTypes } from 'react'

const Image = ({ full_src, caption }) => (
  <figure >
    <img       
      src={full_src}
      alt={caption}
    />
    {caption &&
      <figcaption >{caption}</figcaption>
    }
  </figure>
)

export default Image
