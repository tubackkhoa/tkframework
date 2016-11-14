import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ViewerQueries from 'store/relay/queries/ViewerQueries'

import General from './General'
import Exercises from './General/Exercises'
import Extra from './General/Extra'
import Listening from './Listening'

import App from './Pages/app'
import Book from './Pages/book'
import Index from './Pages/index'
import Post from './Pages/post'
// import Todo from './Pages/todo'
import BookIntroduce from './BookIntroduce'
import Dashboard from './Pages/dashboard'
import NotFound from './Pages/notFound'
import * as authSelectors from 'store/selectors/auth'

// login for check login, may be put in other file
const checkAuth = (store) => {
  return (nextState, replace) => {    
    const loggedIn = authSelectors.isLogged(store.getState())   
    
    // Check if the path isn't dashboard. That way we can apply specific logic to
    // display/render the path we want to
    // if (nextState.location.pathname !== '/dashboard') {
    if(!loggedIn) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      }) 
    }        
  }
}

// must specify queries for relay
export const Routes = (store) => (
  <Route component={App}>         
    <Route path='/' component={Index} queries={ViewerQueries}>
      <Route path='/index/:postID' component={Post} queries={{post: () => Relay.QL`query { node(id: $postID) }`,}} />
    </Route>
    
    <Route onEnter={checkAuth(store)}>
      <Route component={Book}>
        <Route path='/nghe/:bookId' component={Listening} />
        <Route path='/botro/:bookId' component={Extra} />
        <Route path='/baitap/:bookId' component={Exercises} />
        <Route path='/tongquan/:bookId' component={General} />
        <Route path='/gioithieu/:bookId' component={BookIntroduce} />
      </Route>
    </Route>
    
    <Route path='*' component={NotFound} />
  </Route>  
)

