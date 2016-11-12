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

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
      }
    `,
    // TODO: Mark completedCount optional
    user: () => Relay.QL`
      fragment on User {
        id,
        completedCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{changeTodoStatus}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ChangeTodoStatusPayload @relay(pattern: true) {
        todo {
          complete,
        },
        user {
          completedCount,
          todos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        user: this.props.user.id,
      },
    }];
  }
  getVariables() {
    return {
      complete: this.props.complete,
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    const userPayload = {id: this.props.user.id};
    if (this.props.user.completedCount != null) {
      userPayload.completedCount = this.props.complete ?
        this.props.user.completedCount + 1 :
        this.props.user.completedCount - 1;
    }
    return {
      todo: {
        complete: this.props.complete,
        id: this.props.todo.id,
      },
      user: userPayload,
    };
  }
}
