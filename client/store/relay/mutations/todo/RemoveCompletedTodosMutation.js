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

export default class RemoveCompletedTodosMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Make completedCount, edges, and totalCount optional
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            complete,
            id,
          },
        },
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        completedCount,
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeCompletedTodos}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveCompletedTodosPayload @relay(pattern: true) {
        deletedTodoIds,
        user {
          completedCount,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoIds',
    }];
  }
  getVariables() {
    return {};
  }
  getOptimisticResponse() {
    let deletedTodoIds;
    let newTotalCount;
    if (this.props.todos && this.props.todos.edges) {
      deletedTodoIds = this.props.todos.edges
        .filter(edge => edge.node.complete)
        .map(edge => edge.node.id);
    }
    const {completedCount, totalCount} = this.props.user;
    if (completedCount != null && totalCount != null) {
      newTotalCount = totalCount - completedCount;
    }
    return {
      deletedTodoIds,
      user: {
        completedCount: 0,
        id: this.props.user.id,
        totalCount: newTotalCount,
      },
    };
  }
}
