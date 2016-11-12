/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Relay from 'react-relay';

export default class MarkAllTodosMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark edges and totalCount optional
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            complete
            id
          }
        }
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id
        totalCount
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{markAllTodos}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on MarkAllTodosPayload @relay(pattern: true) {
        changedTodos {
          complete
        }
        user {
          completedCount
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        changedTodos: this.props.todos.edges.map(({node}) => node.id),
        user: this.props.user.id,
      },
    }];
  }
  getVariables() {
    return {
      complete: this.props.complete,
    };
  }
  getOptimisticResponse() {
    const userPayload = {id: this.props.user.id};
    if (this.props.todos && this.props.todos.edges) {
      userPayload.todos = {
        edges: this.props.todos.edges
          .filter(edge => edge.node.complete !== this.props.complete)
          .map(edge => ({
            node: {
              complete: this.props.complete,
              id: edge.node.id,
            },
          })),
      };
    }
    if (this.props.user.totalCount != null) {
      userPayload.completedCount = this.props.complete ?
        this.props.user.totalCount :
        0;
    }
    return {
      user: userPayload,
    };
  }
}
