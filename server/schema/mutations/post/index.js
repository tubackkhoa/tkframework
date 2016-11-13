import getAddPostMutation from './add'
import getUpdatePostMutation from './update'

const getPostMutation = (postType, postEdge) => {
  return {
    addPostMutation   : getAddPostMutation(postEdge),
    updatePostMutation: getUpdatePostMutation(postType),
  }
}

export default getPostMutation