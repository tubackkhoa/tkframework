import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Playlist from 'components/Sound/playlist'
import * as authSelectors from 'store/selectors/auth'
import Relay from 'react-relay'

import AddTodoMutation from 'store/relay/mutations/AddTodoMutation'

import TodoListFooter from 'components/Todo/footer'
import TodoList from 'components/Todo/list'
import TodoTextInput from 'components/Todo/input'

class Todo extends React.Component {

  _handleTextInputSave = (text) => {
    this.props.relay.commitUpdate(
      new AddTodoMutation({text, user: this.props.viewer.user})
    )
  }

  // because using relay, all fragment will be send at one, so we dont have to push even to parent
  render(){  
    const {user, todos} = this.props.viewer
    const hasTodos = user.totalCount > 0
    // if we do not pass viewer then children will not have props viewer to
    // viewer will be collected from fragment or from route
    // fragment will be pass to children
    return (  
      <div>
        <h1>Todo List</h1>
        <h2>second changes {user.totalCount}</h2>
        <TodoTextInput
              autoFocus={true}
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="What needs to be done?"
            />
        <TodoList user={user} status="any" />

        {hasTodos &&
          <TodoListFooter
            todos={todos}
            user={user}
          />
        }
      </div>
    )
  }

}

export default Relay.createContainer(Todo, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id          
          totalCount   
          ${AddTodoMutation.getFragment('user')}  
          ${TodoList.getFragment('user')}  
          ${TodoListFooter.getFragment('user')}    
        }
      }

    `,
  },
});


