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

export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark complete as optional
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
      }
    `,
    // TODO: Mark completedCount and totalCount as optional
    user: () => Relay.QL`
      fragment on User {
        completedCount,
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeTodo}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoPayload @relay(pattern: true) {
        deletedTodoId,
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
      deletedIDFieldName: 'deletedTodoId',
    }];
  }
  getVariables() {
    return {
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    const userPayload = {id: this.props.user.id};
    if (this.props.user.completedCount != null) {
      userPayload.completedCount = this.props.todo.complete === true ?
        this.props.user.completedCount - 1 :
        this.props.user.completedCount;
    }
    if (this.props.user.totalCount != null) {
      userPayload.totalCount = this.props.user.totalCount - 1;
    }
    return {
      deletedTodoId: this.props.todo.id,
      user: userPayload,
    };
  }
}
