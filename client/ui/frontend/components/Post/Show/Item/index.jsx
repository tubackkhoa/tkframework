import React, { PropTypes } from 'react'
import TARGET_TYPES from 'ui/shared/constants/targetTypes'
import Text from 'ui/shared/components/Post/Text'
import Twitter from 'ui/shared/components/Post/Twitter'
import Image from 'ui/shared/components/Post/Image'

const renderComponent = (item) => {  
  switch (item.target_type) {
    case TARGET_TYPES.IMAGE:
      return <Image {...item.image} />
    case TARGET_TYPES.TWITTER:
      return <Twitter {...item.twitter} />
    case TARGET_TYPES.TEXT:
      return <Text {...item.text} />
    default:
      return
  }
}

const Item = ({ item }) => (
  <div>{renderComponent(item)}</div>
)

export default Item
