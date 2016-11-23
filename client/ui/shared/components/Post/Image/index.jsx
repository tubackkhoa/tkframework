import React, { PropTypes } from 'react'
import ActionProblem from 'material-ui/svg-icons/action/report-problem'

const Image = ({ full_src, caption }) => (
  <figure >
    {full_src 
      ? <img       
        src={full_src.preview || full_src}
        alt={caption} />
      : <span><ActionProblem/> No image</span>
    }
    {caption &&
      <figcaption >{caption}</figcaption>
    }
  </figure>
)

export default Image
