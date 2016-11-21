// Copyright (c) 2016 Thanh Tu

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.


import Relay from 'react-relay'

export default class AddPostMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }

  // mutation from schema
  getMutation() {
    return Relay.QL`mutation{addPost}`
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddPostPayload @relay(pattern: true) {
        postEdge        
        viewer {          
          posts
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'posts',
      edgeName: 'postEdge', // => to add
      // post{status} => status(unpublish) : 'ignore'
      rangeBehaviors: ({status}) => {
        if (status === 'completed') {
          return 'ignore'
        } else {
          return 'append'
        }
      }
    }]
  }

  getVariables() {
    return {
      title: this.props.title,
    }
  }

  getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      postEdge: {
        node: {          
          title: this.props.title,
        },
      },
      viewer: {
        id: this.props.viewer.id,
      },
    }
  }
}
