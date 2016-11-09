import React, { PropTypes } from 'react'
import AvatarButton from 'components/AvatarButton'


const CommitmentText = ({quote}) => (
  <div className="quote">
    <div className="avatar-picture"/>
    <p>{quote.text || "Default quote"}</p>
    <div className="avatar-wrapper">
      <AvatarButton src={quote.avatar} href="/dashboard" type="small" border="green"></AvatarButton>
    </div>
  </div>
)

export default CommitmentText