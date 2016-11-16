import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ViewerQueries from 'store/relay/queries/ViewerQueries'

import Home from './shared/containers/Home'
import PostIndex from './frontend/containers/Post/Index'
import App from './shared/containers/App'
import NotFound from './shared/containers/notFound'

import Login from './backend/containers/authors/Login'

import * as authSelectors from 'store/selectors/auth'

// login for check login, may be put in other file
const checkAuth = (store) => {
  return (nextState, replace) => {    
    const loggedIn = authSelectors.isLogged(store.getState())   
    
    // Check if the path isn't dashboard. That way we can apply specific logic to    
    if(!loggedIn) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      }) 
    }        
  }
}

// must specify queries for relay
export const Routes = (store) => (
  <Route path='/' component={App}>         
    <IndexRoute component={Home} queries={ViewerQueries} />    
    <Route path='/posts' component={PostIndex} queries={ViewerQueries} />
    <Route path='/login' component={Login}/>
    <Route onEnter={checkAuth(store)} path='/cms'>
      
    </Route>
    
    <Route path='*' component={NotFound} />
  </Route>  
)

